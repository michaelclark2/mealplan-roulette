import React, { useState } from "react";
import Cognito from "../utils/aws";

const AuthContext = React.createContext({});

const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState("");
  const [userSettings, setUserSettings] = useState({});

  const loadUserSettings = () => {
    setUserSettings(
      JSON.parse(localStorage.getItem("settings")) || {
        numberOfRecipes: 5,
        diets: [],
        intolerances: [],
      }
    );
  };

  const signin = (user) => {
    const { username, password } = user;
    return Cognito.login({ username, password }).then((res) => {
      const { RefreshToken, AccessToken } = res.AuthenticationResult;
      return Cognito.getUser(AccessToken).then((res) => {
        localStorage.setItem("refreshToken", RefreshToken);
        localStorage.setItem("username", res.Username);
        setAccessToken(AccessToken);
        loadUserSettings();
      });
    });
  };

  const signup = (user) => {
    const { username, password } = user;
    return Cognito.signup({ username, password }).then(() => {
      loadUserSettings();
    });
  };

  const signout = () => {
    return Cognito.logout(accessToken).then(() => {
      setAccessToken("");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("username");
    });
  };

  const refresh = (token) => {
    const username = localStorage.getItem("username");
    return Cognito.refreshToken(token, username).then((res) => {
      const { AccessToken } = res.AuthenticationResult;
      setAccessToken(AccessToken);
      loadUserSettings();
    });
  };

  const value = {
    accessToken,
    setAccessToken,
    userSettings,
    setUserSettings,
    loadUserSettings,
    signin,
    signup,
    signout,
    refresh,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => React.useContext(AuthContext);

export default AuthProvider;
