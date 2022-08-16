import { React, useState } from "react";
import { Navbar, Heading } from "react-bulma-components";

const NavBar = (props) => {
  const [active, setActive] = useState(false);

  const toggleActive = () => setActive(!active);
  return (
    <Navbar color="primary">
      <Navbar.Brand>
        <Navbar.Item renderAs="div">
          <Heading>Meal Plan Roulette</Heading>
        </Navbar.Item>
        <Navbar.Burger onClick={toggleActive} />
      </Navbar.Brand>
      <Navbar.Menu className={active ? "is-active" : ""}>
        <Navbar.Container>
          <Navbar.Item onClick={() => setActive(false)}>Home</Navbar.Item>
          <Navbar.Item onClick={() => setActive(false)}>Meal Plans</Navbar.Item>
          <Navbar.Item onClick={() => setActive(false)}>Settings</Navbar.Item>
        </Navbar.Container>
      </Navbar.Menu>
    </Navbar>
  );
};

export default NavBar;
