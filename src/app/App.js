import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MealPlansScreen from "../screens/MealPlansScreen";
import RecipeRouletteScreen from "../screens/RecipeRouletteScreen";
import SettingsScreen from "../screens/SettingsScreen";
import SplashScreen from "../screens/SplashScreen";
import "./App.css";

const App = (props) => {
  const [userSettings, setUserSettings] = useState({});

  useEffect(() => {
    const userSettings = JSON.parse(localStorage.getItem("settings"));
    if (userSettings === null) return;
    setUserSettings(userSettings);
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route
            path="/roulette"
            element={<RecipeRouletteScreen userSettings={userSettings} />}
          />
          <Route
            path="/mealplans"
            element={<MealPlansScreen userSettings={userSettings} />}
          />
          <Route
            path="/settings"
            element={<SettingsScreen setUserSettings={setUserSettings} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
