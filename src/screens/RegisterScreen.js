import React, { useState } from "react";
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

const RegisterScreen = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();

  const handleSignup = (e) => {
    setLoading(true);
    auth
      .signup({ username, password }, () => {
        navigate("/", { replace: true });
        setError(null);
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
                  <Card.Header backgroundColor="primary">
                    <Card.Header.Title justifyContent="center">
                      <Heading>Sign Up</Heading>
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
                      <Columns flexDirection="column">
                        <Columns.Column>
                          <Button
                            color="primary"
                            onClick={handleSignup}
                            disabled={loading}
                          >
                            Create Account
                          </Button>
                        </Columns.Column>
                        <Columns.Column textSize="7">
                          <Link to="/login">
                            Already have an account? Log in!
                          </Link>
                        </Columns.Column>
                      </Columns>
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

export default RegisterScreen;
