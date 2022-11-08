import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cognito from "../utils/aws";

const AuthContext = React.createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
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
    if (refreshToken) {
      Cognito.refreshToken(refreshToken)
        .then((res) => {
          const { AccessToken } = res.AuthenticationResult;
          setAccessToken(AccessToken);
          navigate("/");
        })
        .catch((err) => {
          navigate("/login", { replace: true });
        });
    }
  });

  const signin = (user, callback) => {
    const { username, password } = user;
    Cognito.login({ username, password })
      .then((res) => {
        const { RefreshToken, AccessToken } = res.AuthenticationResult;
        localStorage.setItem("refreshToken", RefreshToken);
        setAccessToken(AccessToken);
        setUserSettings(
          JSON.parse(localStorage.getItem("settings")) || {
            numberOfRecipes: 5,
            diets: [],
            intolerances: [],
          }
        );
        callback();
      })
      .catch((err) => {
        setError(err);
        console.error(err);
      });
  };

  const signup = (user, callback) => {
    const { username, password } = user;
    Cognito.signup({ username, password })
      .then((res) => {
        callback();
      })
      .catch((err) => {
        setError(err);
        console.error(err);
      });
  };

  const signout = (callback) => {
    setUser(null);
    callback();
  };

  const value = {
    user,
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
