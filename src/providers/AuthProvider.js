import React, { useState } from "react";

const AuthContext = React.createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [userSettings, setUserSettings] = useState({});

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
