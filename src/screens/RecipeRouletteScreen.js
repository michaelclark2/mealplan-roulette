import { React, useState } from "react";
import {
  Button,
  Container,
  Heading,
  Hero,
  Columns,
} from "react-bulma-components";
import RecipeCard from "../components/RecipeCard/RecipeCard";
import { getRandomRecipes } from "../utils/api";

const RecipeRouletteScreen = (props) => {
  const [recipes, setRecipes] = useState([]);

  const getRecipes = () => {
    getRandomRecipes(7)
      .then((recipes) => setRecipes(recipes))
      .catch((err) => {
        console.error(err);
        // TODO: add error alert to dom
      });
  };

  return (
    <Hero size="fullheight">
      <Hero.Header textAlign="center">
        <Heading p={3} textSize={1} textTransform="uppercase">
          Meal Plan Roulette
        </Heading>
        <Button color="primary" onClick={() => getRecipes()}>
          SPIN
        </Button>
      </Hero.Header>
      <Hero.Body alignItems="start">
        <Container>
          <Columns justifyContent="center">
            {recipes && recipes.length ? (
              recipes.map((recipe) => {
                return (
                  <Columns.Column key={recipe.id} size="one-quarter">
                    <RecipeCard recipe={recipe} />
                  </Columns.Column>
                );
              })
            ) : (
              <Heading>Click "Spin" to start meal planning</Heading>
            )}
          </Columns>
        </Container>
      </Hero.Body>
    </Hero>
  );
};

export default RecipeRouletteScreen;
