const AuthSession = {
  isTokenValid: () => {
    let dateTime = Math.floor(Date.now() / 1000);
    const storedData = localStorage.getItem("userData");

    if (!storedData) {
      localStorage.clear();
      return false;
    }

    const dataStore = JSON.parse(storedData);

    if (!dataStore) {
      localStorage.clear();
      return false;
    }

    let expDate = parseInt(dataStore.expires_in) + parseInt(dataStore.time);
    return dateTime < expDate;
  },

  saveSession: (response) => {
    localStorage.setItem("tokenDataAuth", response?.results?.token);
    localStorage.setItem("userIsLoggedIn", true);
    localStorage.setItem("userData", JSON.stringify(response?.results));
    localStorage.setItem("userId", response?.results?.id);
  },

  getLocation: () => {
    return localStorage.getItem("Location");
  },

  getToken: () => {
    return localStorage.getItem("tokenDataAuth");
  },

  saveToken: (token) => {
    localStorage.setItem("tokenDataAuth", token);
  },
  getClientId: () => {
    return localStorage.getItem("userId");
  },
  saveUser: (response) => {
    localStorage.setItem("userId", response.results.id);
  },
  isLoggedIn: () => {
    return localStorage.getItem("userIsLoggedIn");
  },

  getCountry: () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      return userData.country;
    } else {
      return null;
    }
  },

  logOut: () => {
    localStorage.clear();
  },
};

export default AuthSession;
