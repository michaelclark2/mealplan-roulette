import React from "react";
import { Button, Heading, Hero } from "react-bulma-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

const LoginScreen = (props) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  return (
    <Hero size="fullheight">
      <Hero.Header textAlign="center">
        <Heading p={3} textSize={1} textTransform="uppercase">
          Login
        </Heading>
        <Hero.Body>
          <Button
            onClick={() =>
              auth.signin({ user: {} }, () => navigate(from, { replace: true }))
            }
          >
            Login
          </Button>
        </Hero.Body>
      </Hero.Header>
    </Hero>
  );
};

export default LoginScreen;
