import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import AuthProvider, { useAuth } from "../providers/AuthProvider";
import LoginScreen from "../screens/LoginScreen";
import MealPlansScreen from "../screens/MealPlansScreen";
import RecipeRouletteScreen from "../screens/RecipeRouletteScreen";
import SettingsScreen from "../screens/SettingsScreen";
import "./App.css";

// TODO: https://stackblitz.com/github/remix-run/react-router/tree/main/examples/auth?file=src%2Fauth.ts
// add authentication routing, rather than from settings.
// add user settings during registration

const RequireAuth = ({ children }) => {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
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
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
