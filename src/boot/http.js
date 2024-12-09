import { boot } from "quasar/wrappers";

const API_BASE_URL =
  process.env.VUE_APP_API_BASE_URL || "http://157.173.126.39:3000/api/v1";

const config = {
  API_BASE_URL,
  // Add other configurations as needed
};

export default boot(async () => {});

export { config }; // Named export for reuse elsewhere
