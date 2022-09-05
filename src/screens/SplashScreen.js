import { React, useContext } from "react";
import { Navigate } from "react-router-dom";
import UserConfigContext from "../context/UserConfig";

const SplashScreen = (props) => {
  // TODO: Redirect to settings if there is no settings saved
  const shouldRedirect = localStorage.getItem("settings") !== null;

  if (shouldRedirect) {
    return <Navigate replace to="/roulette" />;
  }
  return <Navigate replace to="/settings" />;
};

export default SplashScreen;