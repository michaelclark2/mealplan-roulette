import React from "react";
import {
  Box,
  Button,
  Card,
  Columns,
  Container,
  Heading,
  Hero,
} from "react-bulma-components";
import { useNavigate } from "react-router-dom";

const ConfirmationScreen = (props) => {
  const navigate = useNavigate();
  return (
    <Hero size="fullheight">
      <Hero.Header textAlign="center">
        <Heading p={3} textSize={1} textTransform="uppercase">
          Meal Plan Roulette
        </Heading>
      </Hero.Header>
      <Hero.Body alignItems="start">
        <Container>
          <Columns justifyContent="center">
            <Columns.Column size="three-fifths">
              <Card>
                <Card.Header backgroundColor="primary">
                  <Card.Header.Title justifyContent="center">
                    <Heading>Welcome!</Heading>
                  </Card.Header.Title>
                </Card.Header>
                <Card.Content>
                  <p>Thank you for joining!</p>
                  <p>Please verify your email address to login.</p>
                  <p>Check your inbox for a verification link.</p>
                </Card.Content>
                <Card.Footer>
                  <Card.Footer.Item>
                    <Button color="primary" onClick={() => navigate("/")}>
                      Ok
                    </Button>
                  </Card.Footer.Item>
                </Card.Footer>
              </Card>
            </Columns.Column>
          </Columns>
        </Container>
      </Hero.Body>
    </Hero>
  );
};

export default ConfirmationScreen;
