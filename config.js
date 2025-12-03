/**
 * Configuration constants for the Football API application
 */

const CONFIG = {
  API: {
    KEY: process.env.FOOTBALL_API_KEY,
    HOST: "v3.football.api-sports.io",
    BASE_URL: "https://v3.football.api-sports.io",
  },
  DISPLAY: {
    CHAR_DELAY_MS: 455,
    LED_GRID_SIZE: 8,
    COLOR: {
      WHITE: [255, 255, 255],
      BLACK: [0, 0, 0],
      RED: [255, 0, 0],
      GREEN: [0, 255, 0]
    },
  },
  LEAGUES: {
    COUNT: 14,
    IDS: [
      39, 78, 61,
      140, 135, 113,
      88, 119, 172,
      144, 94, 290,
      128, 253
    ],
    NAMES: [
      "England", "Germany", "France",
      "Spain", "Italy", "Sweden",
      "Netherlands", "Denmark", "Bulgaria",
      "Belgium", "Portugal", "Iran",
      "Argentina", "USA"
    ],
  },
  TABLE: {
    SEASON: 2025,
    MAX_DISPLAY_ROWS: 8,
    SCALING_FACTOR: 7,
  },
};

module.exports = CONFIG;
