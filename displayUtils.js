/**
 * Display utilities for the LED matrix
 * Handles pixel generation and display formatting
 */

const CONFIG = require("./config");

class DisplayUtils {
  /**
   * Convert team data to displayable pixel array
   * @param {Array<Object>} table - Array of team standings
   * @returns {Array<Array<number>>} Pixel data for LED matrix
   */
  static getTableBars(table) {
    const points = table.map(team => team.scaledPoints);
    return this.generatePixels(points);
  }

  /**
   * Generate pixels for a range of teams
   * @param {number} index - Center index
   * @param {number} direction - Scroll direction (0 or 1)
   * @param {Array<Object>} table - Team standings
   * @returns {Array<Array<number>>} Pixel data
   */
  static getRangeBars(index, direction, table) {
    const min = index - 3;
    const max = index + 3;
    const adjustedMin = direction ? min - 1 : min;
    const adjustedMax = direction ? max : max + 1;

    const points = [];
    for (let i = adjustedMin; i <= adjustedMax; i++) {
      if (i >= 0 && i < table.length) {
        points.push(table[i].scaledPoints);
      } else {
        points.push(0);
      }
    }
    return this.generatePixels(points);
  }

  /**
   * Generate pixel array from point values
   * @param {Array<number>} points - Array of scaled point values
   * @returns {Array<Array<number>>} RGB pixel data
   */
  static generatePixels(points) {
    const pixels = [];
    const white = CONFIG.DISPLAY.COLOR.WHITE;
    const black = CONFIG.DISPLAY.COLOR.BLACK;

    for (let i = 0; i < CONFIG.DISPLAY.LED_GRID_SIZE; i++) {
      for (let j = 0; j < CONFIG.DISPLAY.LED_GRID_SIZE; j++) {
        pixels.push(j < points[i] ? white : black);
      }
    }
    return pixels;
  }

  /**
   * Format team information for display
   * @param {Object} team - Team data
   * @returns {string} Formatted team info
   */
  static formatTeamLine(team) {
    const goalDiffSign = team.goalsDiff > 0 ? "+" : "";
    return `${team.rank}. ${team.team}: Pts: ${team.points} GD: ${goalDiffSign}${team.goalsDiff}`;
  }

  /**
   * Format match score for display
   * @param {Object} match - Match data
   * @returns {string} Formatted match info
   */
  static formatMatchLine(match) {
    return `${match.fixture.status.elapsed}': ${match.teams.home.name} ${match.goals.home} - ${match.goals.away} ${match.teams.away.name}`;
  }

  /**
   * Format position number for display
   * @param {number} position - Position number (1-indexed)
   * @returns {string} Formatted position
   */
  static formatPosition(position) {
    return ` ${position}.`;
  }

  /**
   * Remove diacritics from string (e.g., ä→a, å→a, ö→o)
   * @param {string} str - String with potential diacritics
   * @returns {string} String without diacritics
   */
  static removeDiacritics(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
}

module.exports = DisplayUtils;
