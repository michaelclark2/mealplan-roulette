import { GetUserCommand } from "@aws-sdk/client-cognito-identity-provider";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cognito from "../utils/aws";

const AuthContext = React.createContext({});

const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState("");
  const [userSettings, setUserSettings] = useState({});

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (error) setError(null);
  }, [error, location.pathname]);

  useEffect(() => {
    const refreshToken = localStorage.getItem("refreshToken");
    const username = localStorage.getItem("username");
    if (refreshToken && accessToken === "") {
      Cognito.refreshToken(refreshToken, username)
        .then((res) => {
          const { AccessToken } = res.AuthenticationResult;
          setAccessToken(AccessToken);
          loadUserSettings();
          navigate("/");
        })
        .catch((err) => {
          console.error(err);
          navigate("/login");
        });
    }
  }, [localStorage.getItem("refreshToken")]);

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
      Cognito.sendCommand(new GetUserCommand({ AccessToken })).then((res) => {
        localStorage.setItem("refreshToken", RefreshToken);
        localStorage.setItem("username", res.Username);
        setAccessToken(AccessToken);
      });
      loadUserSettings();
    });
  };

  const signup = (user) => {
    const { username, password } = user;
    return Cognito.signup({ username, password }).then(() => {
      loadUserSettings();
    });
  };

  const signout = (callback) => {
    callback();
  };

  const value = {
    accessToken,
    userSettings,
    setUserSettings,
    signin,
    signup,
    signout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => React.useContext(AuthContext);

export default AuthProvider;
