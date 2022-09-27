import { React } from "react";
import { Link } from "react-router-dom";
import {
  Hero,
  Container,
  Button,
  Columns,
  Heading,
} from "react-bulma-components";
import MealPlanCard from "../components/MealPlanCard/MealPlanCard";

const MealPlansScreen = (props) => {
  return (
    <Hero size="fullheight">
      <Hero.Header textAlign="center">
        <Heading p={3} textSize={1} textTransform="uppercase">
          My Meal Plans
        </Heading>

        <Button color="primary" renderAs={Link} to="/roulette">
          Spin
        </Button>
        <Button color="primary" renderAs={Link} to="/settings">
          Settings
        </Button>
      </Hero.Header>
      <Hero.Body alignItems="start">
        <Container>
          <Columns justifyContent="center">
            <Columns.Column>
              {[1, 2, 3].map((x) => (
                <MealPlanCard />
              ))}
            </Columns.Column>
          </Columns>
        </Container>
      </Hero.Body>
    </Hero>
  );
};

export default MealPlansScreen;
