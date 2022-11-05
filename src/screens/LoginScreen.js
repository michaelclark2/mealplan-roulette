import React, { useState } from "react";
import {
  Box,
  Button,
  Columns,
  Container,
  Heading,
  Hero,
  Form,
  Card,
} from "react-bulma-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

const LoginScreen = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  return (
    <Hero size="fullheight">
      <Hero.Header textAlign="center">
        <Heading p={3} textSize={1} textTransform="uppercase">
          Meal Plan Roulette
        </Heading>
        <Hero.Body alignItems="start">
          <Container>
            <Columns justifyContent="center">
              <Columns.Column size="three-fifths">
                <Card>
                  <Card.Header backgroundColor="primary">
                    <Card.Header.Title justifyContent="center">
                      <Heading>Login</Heading>
                    </Card.Header.Title>
                  </Card.Header>
                  <Card.Content>
                    <Columns flexDirection="column" alignItems="center">
                      <Columns.Column size="half">
                        <Form.Field>
                          <Form.Label mr={3}>Email</Form.Label>
                          <Form.Control>
                            <Form.Input
                              type="email"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                            />
                          </Form.Control>
                        </Form.Field>
                      </Columns.Column>
                      <Columns.Column size="half">
                        <Form.Field>
                          <Form.Label mr={3}>Password</Form.Label>
                          <Form.Control>
                            <Form.Input
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </Form.Control>
                        </Form.Field>
                      </Columns.Column>
                    </Columns>
                  </Card.Content>
                  <Card.Footer>
                    <Card.Footer.Item>
                      <Button
                        color="primary"
                        onClick={() =>
                          auth.signin({ user: { username, password } }, () =>
                            navigate(from, { replace: true })
                          )
                        }
                      >
                        Login
                      </Button>
                    </Card.Footer.Item>
                  </Card.Footer>
                </Card>
              </Columns.Column>
            </Columns>
          </Container>
        </Hero.Body>
      </Hero.Header>
    </Hero>
  );
};

export default LoginScreen;
