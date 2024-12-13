import { boot } from "quasar/wrappers";

const API_BASE_URL =
  process.env.VUE_APP_API_BASE_URL ||
  "https://tunda.jwtechnologyconsulting.com/api/v1";

const config = {
  API_BASE_URL,
  // Add other configurations as needed
};

export default boot(async () => {});

export { config }; // Named export for reuse elsewhere
