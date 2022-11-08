import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import AuthProvider, { useAuth } from "../providers/AuthProvider";
import ConfirmationScreen from "../screens/ConfirmationScreen";
import LoginScreen from "../screens/LoginScreen";
import MealPlansScreen from "../screens/MealPlansScreen";
import RecipeRouletteScreen from "../screens/RecipeRouletteScreen";
import RegisterScreen from "../screens/RegisterScreen";
import SettingsScreen from "../screens/SettingsScreen";
import "./App.css";

// TODO: https://stackblitz.com/github/remix-run/react-router/tree/main/examples/auth?file=src%2Fauth.ts
// add user settings during registration

const RequireAuth = ({ children }) => {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.accessToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const App = (props) => {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route
              path="/"
              element={
                <RequireAuth>
                  <RecipeRouletteScreen />
                </RequireAuth>
              }
            />
            <Route
              path="/mealplans"
              element={
                <RequireAuth>
                  <MealPlansScreen />
                </RequireAuth>
              }
            />
            <Route
              path="/settings"
              element={
                <RequireAuth>
                  <SettingsScreen />
                </RequireAuth>
              }
            />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/confirm" element={<ConfirmationScreen />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
