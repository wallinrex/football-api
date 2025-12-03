# football-api (Sense HAT Football Display)

**Overview**

This project runs on a Raspberry Pi with a Sense HAT and displays football (soccer) league information on the 8x8 LED matrix. It fetches live fixtures and league standings from the API-Football (api-sports.io) service and provides an interactive UI using the Sense HAT joystick.

**Features**
- **Live scores**: Shows live fixtures for the selected league when available.
- **League standings**: Displays a compact table/graph of standings on the LED matrix.
- **Interactive navigation**: Use the Sense HAT joystick to change leagues and view details.
- **Lightweight**: Minimal dependencies and simple configuration via environment variables.

**Requirements**
- **Hardware**: Raspberry Pi with Sense HAT (or a mocked `sense-hat-led` implementation for development).
- **Node.js**: v14+ recommended.
- 
- **API Key**: A valid API key for API-Football (v3) — set in `FOOTBALL_API_KEY`. Note that this API does not provide live scores or current season tables to users on the free plan, so you need some level of paid plan to actually get returns for the API calls. As such, there is certainly no reason to stick with this API if you can find a better one.

**Quick Start**

- Clone the repository and install dependencies:

```bash
git clone https://github.com/wallinrex/football-api.git
cd football_api
npm install sense-hat-led
```

- Configure your API key (copy and edit the example.env file):

```bash
cp example.env .env
# Edit .env and set FOOTBALL_API_KEY to your API-Football key
```

- Start the app:

```bash
node index.js
```

The app will initialize the `FootballApp` and start cycling through league flags on the Sense HAT. Use the joystick to interact (see Controls).

**Configuration**
- `example.env`: Shows the environment variable the app expects (`FOOTBALL_API_KEY`).
- `config.js`: App constants such as the API host/base URL, display timing, and the list of league IDs and names. Adjust `TABLE.SEASON` if you need standings for a different season.

Environment variables
- `FOOTBALL_API_KEY`: Your API-Football key.

**Controls (Sense HAT joystick)**

- **League selection**
	- `Left` / `Right`: Cycle through available leagues.
	- `Down`: Show current league name as a message.
	- `Up`: Clear the display.
	- `Enter`: Check for live fixtures for the selected league; if live matches exist the app will show them, otherwise it will display the league standings.

- **League table navigation (active when viewing a league table)**
	- `Up` / `Down`: Move the selection cursor through the table rows (the 8-row LED view will scroll as needed).
	- `Enter`: Show a short message with details for the selected team (rank, points and goal difference).
	- `Left`: Exit the table view and return to league selection (resumes idle flag cycle).
	- `Right`: Show the selected team's numeric position as a short message.

Note: While a message or animation is displaying, navigation input is temporarily ignored until the display finishes.

**How it works (high level)**
- `index.js` — entry point; loads environment variables and starts the app.
- `footballApp.js` — main application controller: joystick handlers, display logic, and app lifecycle.
- `footballApiService.js` — wrapper around API calls to fetch live fixtures and standings.
- `standingsProcessor.js` — normalizes and merges standings returned by the API.
- `displayUtils.js`, `Frames.js`, `Joystick.js` — display helpers, animation frames, and joystick abstraction respectively.

**Project Structure**
- `index.js` — Entry point (runs `footballApp`).
- `footballApp.js` — Main app + UI logic.
- `footballApiService.js` — API calls.
- `displayUtils.js` — Helpers for formatting and pixel generation.
- `Frames.js` — Pixel frames and animations.
- `Joystick.js` — Event wrapper for the Sense HAT joystick.
- `standingsProcessor.js` — Process API standings into displayable data.
- `config.js` — Configuration constants.
- `example.env` — Example environment file.

**Development**
- To run on a non-Raspberry Pi machine, either run on a Pi-er or mock the `sense-hat-led` dependency so the code can execute without the actual hardware.
- Edit `config.js` or set environment variables to point at a different season or change display timings.

**Contributing**
- Fork the repo and open a PR with small, focused changes.
- Describe changes in the PR and include screenshots or a short video of the LED output if you add/change visuals.

**License**
- This project is licensed under the **MIT License** — see the `LICENSE` file.

**Attributions**
- This project includes MIT-licensed code from sense-hat-joystick.

**Notes & Troubleshooting**
- If the display remains blank, ensure the Sense HAT is connected, `sense-hat-led` is functional, and `FOOTBALL_API_KEY` is set.
- API errors are logged to the console; ensure your API key is valid and has quota remaining.

---
