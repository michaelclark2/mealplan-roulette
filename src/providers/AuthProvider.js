import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cognito from "../utils/aws";

const AuthContext = React.createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [accessToken, setAccessToken] = useState("");
  const [userSettings, setUserSettings] = useState({});
  const navigate = useNavigate();

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
  }, []);

  const signin = (newUser, callback) => {
    setUser(newUser);
    setUserSettings(
      JSON.parse(localStorage.getItem("settings")) || {
        numberOfRecipes: 5,
        diets: [],
        intolerances: [],
      }
    );
    callback();
  };

  const signout = (callback) => {
    setUser(null);
    callback();
  };

  const value = { user, userSettings, setUserSettings, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => React.useContext(AuthContext);

export default AuthProvider;
