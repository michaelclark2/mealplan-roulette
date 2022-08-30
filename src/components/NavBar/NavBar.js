import { React, useState } from "react";
import { Navbar, Heading } from "react-bulma-components";
import { Link } from "react-router-dom";

const NavBar = (props) => {
  const [active, setActive] = useState(false);

  const toggleActive = () => setActive(!active);

  const activeClassName = active ? "is-active" : "";

  return (
    <Navbar color="primary">
      <Navbar.Brand>
        <Navbar.Item renderAs="div">
          <Heading>Meal Plan Roulette</Heading>
        </Navbar.Item>
        <Navbar.Burger className={activeClassName} onClick={toggleActive} />
      </Navbar.Brand>
      <Navbar.Menu className={activeClassName}>
        <Navbar.Container>
          <Navbar.Item renderAs={Link} to="/" onClick={() => setActive(false)}>
            Home
          </Navbar.Item>
          <Navbar.Item
            renderAs={Link}
            to="/mealplans"
            onClick={() => setActive(false)}
          >
            Meal Plans
          </Navbar.Item>
          <Navbar.Item
            renderAs={Link}
            to="/settings"
            onClick={() => setActive(false)}
          >
            Settings
          </Navbar.Item>
        </Navbar.Container>
      </Navbar.Menu>
    </Navbar>
  );
};

export default NavBar;
