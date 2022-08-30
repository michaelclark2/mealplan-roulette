import { React, useState } from "react";
import {
  Button,
  Container,
  Heading,
  Hero,
  Columns,
} from "react-bulma-components";
import RecipeCard from "../components/RecipeCard/RecipeCard";
import { getRandomRecipeUrl } from "../utils/api";

const RecipeRouletteScreen = (props) => {
  console.log(getRandomRecipeUrl());

  return (
    <Hero size="fullheight">
      <Hero.Header textAlign="center">
        <Heading p={3} textSize={1} textTransform="uppercase">
          Meal Plan Roulette
        </Heading>
        <Button color="primary">SPIN</Button>
      </Hero.Header>
      <Hero.Body alignItems="start">
        <Container>
          <Columns justifyContent="center">
            {[1, 2, 3, 4, 5, 6, 7].map((recipe) => {
              return (
                <Columns.Column size="one-quarter">
                  <RecipeCard />
                </Columns.Column>
              );
            })}
          </Columns>
        </Container>
      </Hero.Body>
    </Hero>
  );
};

export default RecipeRouletteScreen;
