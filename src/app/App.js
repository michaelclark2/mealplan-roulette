import { Button } from "react-bulma-components";
import NavBar from "../components/NavBar/NavBar";
import "./App.css";

const App = (props) => {
  return (
    <div className="App">
      <NavBar />
      <Button color="primary">Bulma</Button>
    </div>
  );
};

export default App;
