/**
 * Main application controller
 * Orchestrates league selection and display modes
 */

const sense = require("sense-hat-led");
const CONFIG = require("./config");
const Joystick = require("./Joystick");
const Frames = require("./Frames");
const FootballApiService = require("./footballApiService");
const DisplayUtils = require("./displayUtils");
const StandingsProcessor = require("./standingsProcessor");

class FootballApp {
  constructor() {
    this.joystick = new Joystick();
    this.frames = new Frames();
    this.apiService = new FootballApiService();

    this.leagueChoice = 0;
    this.isTableViewActive = false;
    this.tableHandlers = null;
    this.isMessageDisplaying = false;
    this.idleInterval = null;
    this.inactivityTimeout = null;
    this.isIdleActive = false;
    this.isLeagueNavActive = false;

    // Bind league navigation methods for proper event listener removal
    this.boundPreviousLeague = this.previousLeague.bind(this);
    this.boundNextLeague = this.nextLeague.bind(this);
    this.boundShowLeagueName = this.showLeagueName.bind(this);
    this.boundShowLeagueStandings = this.showLeagueStandings.bind(this);
    this.boundShowLeagueOrLive = this.showLeagueOrLive.bind(this);
    this.boundOnUserInput = this.onUserInput.bind(this);

    this.setupLeagueNavigation();
    this.startDisplay();
    this.startIdleLoop();
  }

  /**
   * Setup initial joystick listeners for league selection
   */
  setupLeagueNavigation() {
    if (this.isLeagueNavActive) return;

    this.joystick.on("left", this.boundPreviousLeague);
    this.joystick.on("right", this.boundNextLeague);
    this.joystick.on("down", this.boundShowLeagueName);
    this.joystick.on("enter", this.boundShowLeagueOrLive);

    // Also listen for input generically to manage idle state
    this.joystick.on("left", this.boundOnUserInput);
    this.joystick.on("right", this.boundOnUserInput);
    this.joystick.on("down", this.boundOnUserInput);
    this.joystick.on("enter", this.boundOnUserInput);

    this.isLeagueNavActive = true;
  }

  /**
   * Remove league selection listeners to block input during transitions/messages
   */
  removeLeagueNavigation() {
    if (!this.isLeagueNavActive) return;

    this.joystick.off("left", this.boundPreviousLeague);
    this.joystick.off("right", this.boundNextLeague);
    this.joystick.off("down", this.boundShowLeagueName);
    this.joystick.off("enter", this.boundShowLeagueOrLive);
    this.joystick.off("down", this.boundShowLeagueName);
    this.joystick.off("enter", this.boundShowLeagueOrLive);

    this.joystick.off("left", this.boundOnUserInput);
    this.joystick.off("right", this.boundOnUserInput);
    this.joystick.off("down", this.boundOnUserInput);
    this.joystick.off("enter", this.boundOnUserInput);

    this.isLeagueNavActive = false;
  }

  /**
   * Initialize display with current league flag
   */
  startDisplay() {
    try {
      sense.setPixels(this.frames.flags[this.leagueChoice]);
    } catch (error) {
      console.error("Error initializing display:", error);
    }
  }

  /**
   * Move to previous league
   */
  previousLeague() {
    if (this.isMessageDisplaying) return;
    this.leagueChoice = (this.leagueChoice - 1 + CONFIG.LEAGUES.COUNT) % CONFIG.LEAGUES.COUNT;
    this.updateDisplay();
  }

  /**
   * Move to next league
   */
  nextLeague() {
    if (this.isMessageDisplaying) return;
    this.leagueChoice = (this.leagueChoice + 1) % CONFIG.LEAGUES.COUNT;
    this.updateDisplay();
  }

  /**
   * Display current league name
   */
  async showLeagueName() {
    const leagueName = CONFIG.LEAGUES.NAMES[this.leagueChoice];
    await this.showMessageAsync([leagueName], [CONFIG.DISPLAY.COLOR.WHITE]);
    this.updateDisplay();
  }

  /**
   * Show league standings/table
   */
  async showLeagueStandings() {
    if (this.isTableViewActive || this.isMessageDisplaying) return;

    try {
      const leagueId = CONFIG.LEAGUES.IDS[this.leagueChoice];
      const apiResponse = await this.apiService.getStandings(leagueId);
      const leagueResp = apiResponse && apiResponse.response && apiResponse.response[0] && apiResponse.response[0].league;
      const standingsSets = (leagueResp && leagueResp.standings) ? leagueResp.standings : [];

      // Delegate merging of split tables to StandingsProcessor. If the API
      // returned multiple sets (split tables), pass the array-of-arrays so
      // the processor can merge and sort them. Otherwise pass the single
      // standings array.
      const standingsInput = (Array.isArray(standingsSets) && standingsSets.length > 1)
        ? standingsSets
        : (Array.isArray(standingsSets) ? standingsSets[0] || [] : []);

      const standings = StandingsProcessor.process(standingsInput);

      await this.enterTableView(standings);
    } catch (error) {
      console.error("Error fetching standings:", error);
      // Restore flag display on error instead of blank screen
      this.updateDisplay();
    }
  }

  /**
   * When a league is selected, check for live fixtures first. If none, show standings.
   */
  async showLeagueOrLive() {
    if (this.isTableViewActive || this.isMessageDisplaying) return;

    // Prevent further league navigation/input while we process live/standings
    this.removeLeagueNavigation();

    try {
      const leagueId = CONFIG.LEAGUES.IDS[this.leagueChoice];
      const liveResp = await this.apiService.getLiveFixtures(leagueId);

      const hasLive = liveResp && Array.isArray(liveResp.response) && liveResp.response.length > 0;

      if (hasLive) {
        // There are live fixtures. Display each live match using formatMatchLine.
        const matches = liveResp.response;
        if (matches && matches.length) {
          // Header
          await this.showMessageAsync(["Live:"], [CONFIG.DISPLAY.COLOR.GREEN]);

          // Show each match line sequentially
          for (let i = 0; i < matches.length; i++) {
            try {
              const line = DisplayUtils.formatMatchLine(matches[i]);
              await this.showMessageAsync([line], [CONFIG.DISPLAY.COLOR.WHITE]);
            } catch (err) {
              console.error("Error displaying match line:", err);
            }
          }
          // After all live scores, show a short ball animation then the league table
          try {
            await this.showBallAnimation(200);
          } catch (animErr) {
            console.error('Error running ball animation:', animErr);
          }
          await this.showLeagueStandings();
        }
        return;
      }

      // No live fixtures — notify user then show animation then standings
      await this.showMessageAsync(["No Live Matches"], [CONFIG.DISPLAY.COLOR.RED]);
      try {
        await this.showBallAnimation(200);
      } catch (animErr) {
        console.error('Error running ball animation:', animErr);
      }
      await this.showLeagueStandings();
    } catch (error) {
      console.error("Error checking live fixtures:", error);
      
      // Check if this is a network error (fetch failed due to no connection)
      const isNetworkError = error instanceof TypeError && 
                            (error.message.includes('fetch') || 
                             error.message.includes('network') ||
                             error.message.includes('Failed to fetch'));
      
      if (isNetworkError) {
        // Network connection error - show appropriate message and return to league selection
        await this.showMessageAsync(["No Network Connection"], [CONFIG.DISPLAY.COLOR.RED]);
        try {
          await this.showBallAnimation(200);
        } catch (animErr) {
          console.error('Error running ball animation after error:', animErr);
        }
        // Return to league selection - display current flag
        this.updateDisplay();
      } else {
        // Other error - fallback to standings (with animation)
        await this.showMessageAsync(["No Live Matches"], [CONFIG.DISPLAY.COLOR.RED]);
        try {
          await this.showBallAnimation(200);
        } catch (animErr) {
          console.error('Error running ball animation after error:', animErr);
        }
        await this.showLeagueStandings();
      }
    } finally {
      // If we did not transition into table view (e.g., early return), restore nav
      if (!this.isTableViewActive) {
        this.setupLeagueNavigation();
      }
    }
  }

  /**
   * Play ball animation frames from Frames.ballFrames with given delay per frame
   * @param {number} msPerFrame - milliseconds to display each frame
   */
  showBallAnimation(msPerFrame = 200) {
    return new Promise((resolve) => {
      // Guard: ensure frames are present
      if (!this.frames || !Array.isArray(this.frames.ballFrames) || this.frames.ballFrames.length === 0) {
        return resolve();
      }

      this.isMessageDisplaying = true;

      let idx = 0;
      const frames = this.frames.ballFrames;

      const next = () => {
        if (idx >= frames.length) {
          this.isMessageDisplaying = false;
          return resolve();
        }

        try {
          sense.setPixels(frames[idx]);
        } catch (err) {
          console.error('Error setting ball frame pixels:', err);
        }

        idx++;
        setTimeout(next, msPerFrame);
      };

      next();
    });
  }

  /**
   * Update display with current league flag
   */
  updateDisplay() {
    try {
      sense.setPixels(this.frames.flags[this.leagueChoice]);
    } catch (error) {
      console.error("Error updating display:", error);
    }
  }

  /**
   * Start the idle loop cycling through flags every 5 seconds
   */
  startIdleLoop() {
    if (this.isIdleActive) return;
    this.isIdleActive = true;
    // Immediately show current flag, then start cycling
    this.updateDisplay();
    this.idleInterval = setInterval(() => {
      if (this.isTableViewActive || this.isMessageDisplaying) return;
      this.leagueChoice = (this.leagueChoice + 1) % CONFIG.LEAGUES.COUNT;
      this.updateDisplay();
    }, 5000);
  }

  /**
   * Stop the idle loop if active
   */
  stopIdleLoop() {
    if (this.idleInterval) clearInterval(this.idleInterval);
    this.idleInterval = null;
    this.isIdleActive = false;
  }

  /**
   * Handle any user input: stop idle loop and (re)start inactivity timer
   */
  onUserInput() {
    // Ignore input entirely while a message/animation is showing (e.g., "No Live Matches")
    if (this.isMessageDisplaying) return;
    // Any user input should stop idle loop
    this.stopIdleLoop();
    // Reset inactivity timer to resume idle loop after 60s of no input
    if (this.inactivityTimeout) clearTimeout(this.inactivityTimeout);
    this.inactivityTimeout = setTimeout(() => {
      // Resume idle loop after inactivity. If currently in table view,
      // exit table view so flags can be displayed, unless a message is scrolling.
      if (!this.isMessageDisplaying) {
        if (this.isTableViewActive) {
          try {
            this.exitTableView();
          } catch (err) {
            console.error('Error exiting table view on inactivity:', err);
          }
        }
        this.startIdleLoop();
      } else {

        // If a message is currently displaying, wait for it to finish then resume idle.
        // Use a short-polling watcher to avoid losing the event; cap the wait to 30s.
        if (this._inactivityWatcher) clearInterval(this._inactivityWatcher);
        const maxRetries = 30; // 30s max wait
        let tries = 0;
        this._inactivityWatcher = setInterval(() => {
          tries++;
          if (!this.isMessageDisplaying) {
            clearInterval(this._inactivityWatcher);
            this._inactivityWatcher = null;
            if (this.isTableViewActive) {
              try {
                this.exitTableView();
              } catch (err) {
                console.error('Error exiting table view after message finish:', err);
              }
            }
            this.startIdleLoop();
            return;
          }
          if (tries >= maxRetries) {
            clearInterval(this._inactivityWatcher);
            this._inactivityWatcher = null;
            if (this.isTableViewActive) {
              try {
                this.exitTableView();
              } catch (err) {
                console.error('Error exiting table view after watcher timeout:', err);
              }
            }
            this.startIdleLoop();
          }
        }, 1000);
      }
    }, 60000);
  }

  /**
   * Show a message on the LED matrix with optional colors for different parts
   * @param {string|Array<string>} message - Message to display (string or array of message parts)
   * @param {Array<Array<number>>} colors - Optional colors array matching message parts
   * @param {number} scrollSpeed - Scroll speed (0.05 = fast, 0.1 = normal)
   * @returns {Promise<void>}
   */
  showMessageAsync(message, colors, scrollSpeed = 0.07) {
    return new Promise((resolve) => {
      this.isMessageDisplaying = true;

      // Handle array of message parts with different colors
      if (Array.isArray(message)) {
        let totalDuration = 0;
        const parts = [];

        // Calculate timing for each part
        for (let i = 0; i < message.length; i++) {
          const text = DisplayUtils.removeDiacritics(message[i]);
          const color = (colors && colors[i]) ? colors[i] : CONFIG.DISPLAY.COLOR.WHITE;
          const duration = text.length * CONFIG.DISPLAY.CHAR_DELAY_MS;
          parts.push({ text, color, duration });
          totalDuration += duration;
        }

        // Display each part sequentially
        let currentTime = 0;
        parts.forEach((part) => {
          setTimeout(() => {
            sense.showMessage(part.text, scrollSpeed, part.color);
          }, currentTime);
          currentTime += part.duration;
        });

        setTimeout(() => {
          this.isMessageDisplaying = false;
          resolve();
        }, totalDuration);
      } else {
        // Single message string
        const normalizedMessage = DisplayUtils.removeDiacritics(message);
        const color = (colors && colors[0]) ? colors[0] : CONFIG.DISPLAY.COLOR.WHITE;
        sense.showMessage(normalizedMessage, scrollSpeed, color);
        const duration = normalizedMessage.length * CONFIG.DISPLAY.CHAR_DELAY_MS;
        setTimeout(() => {
          this.isMessageDisplaying = false;
          resolve();
        }, duration);
      }
    });
  }

  /**
   * Enter table view mode with standings
   * @param {Array<Object>} standings - Processed standings
   */
  async enterTableView(standings) {
    if (!StandingsProcessor.isValid(standings)) {
      console.warn("Invalid standings data");
      return;
    }

    this.isTableViewActive = true;
    let selectedTeam = 0;

    // Remove league navigation listeners to avoid conflicts while in table view
    this.removeLeagueNavigation();

    // Create table navigation handlers
    const handleUp = () => {
      if (this.isMessageDisplaying) return;
      selectedTeam = this.selectPreviousTeam(selectedTeam, standings);
    };

    const handleDown = () => {
      if (this.isMessageDisplaying) return;
      selectedTeam = this.selectNextTeam(selectedTeam, standings);
    };

    const handleEnter = async () => {
      if (this.isMessageDisplaying) return;
      const team = standings[selectedTeam];
      const goalDiffSign = team.goalsDiff > 0 ? "+" : "";
      const goalDiffColor = team.goalsDiff >= 0 ? CONFIG.DISPLAY.COLOR.GREEN : CONFIG.DISPLAY.COLOR.RED;

      const messageParts = [
        `${team.rank}. ${team.team}: Pts: ${team.points} GD: `,
        `${goalDiffSign}${team.goalsDiff}`
      ];
      const colors = [CONFIG.DISPLAY.COLOR.WHITE, goalDiffColor];

      await this.showMessageAsync(messageParts, colors);
      this.displayTableView(standings);
      sense.setPixel(0, 0, 255, 0, 0);
      selectedTeam = 0;
    };

    const handleLeft = () => {
      if (this.isMessageDisplaying) return;
      // user-initiated exit
      this.exitTableView(standings, true);
    };

    const handleRight = () => {
      if (this.isMessageDisplaying) return;
      this.showTeamPosition(selectedTeam, standings);
    };

    // Setup table navigation
    this.joystick.on("up", handleUp);
    this.joystick.on("down", handleDown);
    this.joystick.on("enter", handleEnter);
    this.joystick.on("left", handleLeft);
    this.joystick.on("right", handleRight);

    this.tableHandlers = { handleUp, handleDown, handleEnter, handleLeft, handleRight };

    // Display initial view
    this.displayTableView(standings);
    sense.setPixel(0, 0, 255, 0, 0);
  }

  /**
   * Display table bars
   * @param {Array<Object>} standings - Standings to display
   */
  displayTableView(standings) {
    try {
      const pixels = DisplayUtils.getTableBars(standings);
      sense.setPixels(pixels);
    } catch (error) {
      console.error("Error displaying table:", error);
    }
  }

  /**
   * Select previous team in standings
   * @param {number} selected - Current selection index
   * @param {Array<Object>} standings - Standings data
   * @returns {number} New selection index
   */
  selectPreviousTeam(selected, standings) {
    if (selected <= 0) return selected;

    if (selected >= 1 && selected <= 3) {
      sense.setPixel(0, selected, 255, 255, 255);
      selected--;
      sense.setPixel(0, selected, 255, 0, 0);
    } else if (selected >= 4 && selected <= standings.length - 5) {
      selected--;
      const pixels = DisplayUtils.getRangeBars(selected, 0, standings);
      sense.setPixels(pixels);
      sense.setPixel(0, 3, 255, 0, 0);
    } else if (selected > standings.length - 5) {
      sense.setPixel(0, selected - standings.length + 8, 255, 255, 255);
      selected--;
      sense.setPixel(0, selected - standings.length + 8, 255, 0, 0);
    }
    return selected;
  }

  /**
   * Select next team in standings
   * @param {number} selected - Current selection index
   * @param {Array<Object>} standings - Standings data
   * @returns {number} New selection index
   */
  selectNextTeam(selected, standings) {
    if (selected >= standings.length - 1) return selected;

    if (selected < 4) {
      sense.setPixel(0, selected, 255, 255, 255);
      selected++;
      sense.setPixel(0, selected, 255, 0, 0);
    } else if (selected >= 4 && selected <= standings.length - 5) {
      selected++;
      const pixels = DisplayUtils.getRangeBars(selected, 1, standings);
      sense.setPixels(pixels);
      sense.setPixel(0, 4, 255, 0, 0);
    } else if (selected > standings.length - 5) {
      sense.setPixel(0, selected - standings.length + 8, 255, 255, 255);
      selected++;
      sense.setPixel(0, selected - standings.length + 8, 255, 0, 0);
    }
    return selected;
  }

  /**
   * Show team position
   * @param {number} selected - Team index
   * @param {Array<Object>} standings - Standings data
   */
  async showTeamPosition(selected, standings) {
    const position = selected + 1;
    const positionStr = DisplayUtils.formatPosition(position);
    await this.showMessageAsync([positionStr], [CONFIG.DISPLAY.COLOR.WHITE]);
    this.displayTableView(standings);
    sense.setPixel(0, 0, 255, 0, 0);
  }

  /**
   * Exit table view and return to league selection
   * @param {Array<Object>} standings - Standings data (unused but kept for consistency)
   */
  exitTableView(standings, userInitiated = false) {
    if (!this.isTableViewActive) return;

    // Remove table listeners
    if (this.tableHandlers) {
      this.joystick.off("up", this.tableHandlers.handleUp);
      this.joystick.off("down", this.tableHandlers.handleDown);
      this.joystick.off("enter", this.tableHandlers.handleEnter);
      this.joystick.off("left", this.tableHandlers.handleLeft);
      this.joystick.off("right", this.tableHandlers.handleRight);
    }

    // Restore league navigation
    this.setupLeagueNavigation();

    this.isTableViewActive = false;
    sense.clear();
    this.updateDisplay();
    // Only trigger generic user-input handling when the exit was user-initiated
    if (userInitiated) this.onUserInput();
  }
}

// Initialize and run the application
const app = new FootballApp();

// Graceful shutdown
process.on("SIGINT", () => {
  sense.clear();
  process.exit(0);
});

module.exports = FootballApp;
