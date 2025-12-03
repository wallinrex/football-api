/**
 * Table data processor
 * Transforms raw API standings data into usable format
 */

const CONFIG = require("./config");

class StandingsProcessor {
  /**
   * Process raw standings data from API
   * @param {Array<Object>} standings - Raw standings array from API
   * @returns {Array<Object>} Processed standings
   */
  static process(standings) {
    // Accept either a single standings array or an array-of-arrays (split tables)
    let raw = standings;
    if (Array.isArray(standings) && standings.length > 0 && Array.isArray(standings[0])) {
      raw = this.mergeStandingsSets(standings);
    }

    const processed = this.transformStandings(raw);
    this.scalePoints(processed);
    return processed;
  }

  /**
   * Merge multiple standings arrays (e.g. two halves) into a single combined table.
   * @param {Array<Array<Object>>} standingsSets - Array of standings arrays
   * @returns {Array<Object>} Merged standings array
   */
  static mergeStandingsSets(standingsSets) {
    const teamMap = new Map();

    standingsSets.forEach((set) => {
      if (!Array.isArray(set)) return;
      set.forEach((entry) => {
        if (!entry || !entry.team) return;
        const teamKey = (entry.team.id !== undefined && entry.team.id !== null) ? entry.team.id : entry.team.name;

        if (!teamMap.has(teamKey)) {
          teamMap.set(teamKey, {
            team: entry.team,
            points: Number(entry.points) || 0,
            goalsDiff: Number(entry.goalsDiff) || 0,
            form: entry.form || "",
          });
        } else {
          const existing = teamMap.get(teamKey);
          existing.points = (existing.points || 0) + (Number(entry.points) || 0);
          existing.goalsDiff = (existing.goalsDiff || 0) + (Number(entry.goalsDiff) || 0);
          if (entry.form && entry.form.length) existing.form = entry.form;
        }
      });
    });

    const merged = Array.from(teamMap.values());
    merged.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      return (b.goalsDiff || 0) - (a.goalsDiff || 0);
    });

    return merged;
  }

  /**
   * Transform standings into display format
   * @param {Array<Object>} standings - Raw standings
   * @returns {Array<Object>} Transformed standings
   */
  static transformStandings(standings) {
    return standings.map((entry, index) => ({
      rank: index + 1,
      team: entry.team.name,
      points: entry.points,
      goalsDiff: entry.goalsDiff,
      form: entry.form,
      scaledPoints: 0,
    }));
  }

  /**
   * Scale point values to LED display range (0-7)
   * @param {Array<Object>} standings - Standings to scale
   */
  static scalePoints(standings) {
    if (standings.length === 0) return;

    const maxPoints = standings[0].points;
    const minPoints = standings[standings.length - 1].points;
    const pointRange = maxPoints - minPoints || 1; // Avoid division by zero
    const scaleFactor = CONFIG.TABLE.SCALING_FACTOR / pointRange;

    standings.forEach((entry) => {
      const pointDiff = entry.points - minPoints;
      entry.scaledPoints = 1 + Math.round(pointDiff * scaleFactor);
    });
  }

  /**
   * Validate standings data
   * @param {Array<Object>} standings - Standings to validate
   * @returns {boolean} Whether data is valid
   */
  static isValid(standings) {
    return Array.isArray(standings) && standings.length > 0;
  }
}

module.exports = StandingsProcessor;
