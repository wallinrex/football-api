/**
 * API service module for football data
 * Handles HTTP requests to the football API
 */

const CONFIG = require("./config");

class FootballApiService {
  constructor() {
    this.baseUrl = CONFIG.API.BASE_URL;
    this.headers = this.createHeaders();
  }

  /**
   * Create request headers with API credentials
   * @returns {Headers} Configured headers
   */
  createHeaders() {
    const headers = new Headers();
    headers.append("x-rapidapi-key", CONFIG.API.KEY);
    headers.append("x-rapidapi-host", CONFIG.API.HOST);
    return headers;
  }

  /**
   * Get request options for fetch
   * @returns {Object} Request options
   */
  getRequestOptions() {
    return {
      method: "GET",
      headers: this.headers,
      redirect: "follow",
    };
  }

  /**
   * Fetch live fixtures for a league
   * @param {number} leagueId - The league ID
   * @returns {Promise<Object>} API response data
   */
  async getLiveFixtures(leagueId) {
    try {
      const url = `${this.baseUrl}/fixtures?league=${leagueId}&live=all`;
      const response = await fetch(url, this.getRequestOptions());
      
      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error("Error fetching live fixtures:", error);
      throw error;
    }
  }

  /**
   * Fetch league standings
   * @param {number} leagueId - The league ID
   * @param {number} season - The season year
   * @returns {Promise<Object>} API response data
   */
  async getStandings(leagueId, season = CONFIG.TABLE.SEASON) {
    try {
      const url = `${this.baseUrl}/standings?league=${leagueId}&season=${season}`;
      const response = await fetch(url, this.getRequestOptions());
      
      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error("Error fetching standings:", error);
      throw error;
    }
  }
}

module.exports = FootballApiService;
