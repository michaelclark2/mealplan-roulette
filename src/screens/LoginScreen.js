import React, { useEffect, useState } from "react";
import {
  Button,
  Columns,
  Container,
  Heading,
  Hero,
  Form,
  Card,
  Notification,
} from "react-bulma-components";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

const LoginScreen = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken && !auth.accessToken) {
      auth
        .refresh(refreshToken)
        .then(() => {
          navigate("/");
        })
        .catch((err) => {
          console.error(err);
          setError(err);
        });
    }
  }, [auth.accessToken, auth, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    auth
      .signin({ username, password })
      .then(() => {
        setError(null);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => setLoading(false));
  };

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
                  <form onSubmit={handleLogin}>
                    <Card.Header backgroundColor="primary">
                      <Card.Header.Title justifyContent="center">
                        <Heading>Login</Heading>
                      </Card.Header.Title>
                    </Card.Header>
                    <Card.Content>
                      {error ? (
                        <Notification color="danger">
                          {error.message}
                          <Button remove onClick={() => setError(null)} />
                        </Notification>
                      ) : null}
                      <Columns flexDirection="column" alignItems="center">
                        <Columns.Column size="half">
                          <Form.Field>
                            <Form.Label mr={3}>Email</Form.Label>
                            <Form.Control>
                              <Form.Input
                                required
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
                                required
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
                        <Columns flexDirection="column">
                          <Columns.Column>
                            <Button
                              type="submit"
                              color="primary"
                              onClick={handleLogin}
                              disabled={loading}
                            >
                              Login
                            </Button>
                          </Columns.Column>
                          <Columns.Column textSize="7">
                            <Link to="/register">Click here to sign up</Link>
                          </Columns.Column>
                        </Columns>
                      </Card.Footer.Item>
                    </Card.Footer>
                  </form>
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
