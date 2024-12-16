import { boot } from "quasar/wrappers";

const API_BASE_URL =
  process.env.VUE_APP_API_BASE_URL ||
  "https://tunda.jwtechnologyconsulting.com/api/v1";

const MAPBOX_TOKEN =
  "pk.eyJ1Ijoic3lsdmlhLW1haW5hIiwiYSI6ImNtNHF3eWhxODE1ZDkydHFzamQ5dG81b3MifQ.GWJoPkX0AzH6YLOBjX_wAA";

const config = {
  API_BASE_URL,
  MAPBOX_TOKEN,
};

export default boot(async () => {});

export { config }; // Named export for reuse elsewhere
