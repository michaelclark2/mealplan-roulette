import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import MealPlansScreen from "../screens/MealPlansScreen";
import RecipeRouletteScreen from "../screens/RecipeRouletteScreen";
import SettingsScreen from "../screens/SettingsScreen";
import HomeScreen from "../screens/HomeScreen";
import "./App.css";

const App = (props) => {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/roulette" element={<RecipeRouletteScreen />} />
          <Route path="/mealplans" element={<MealPlansScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
