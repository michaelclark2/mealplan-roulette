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
  const [pinnedRecipes, setPinnedRecipes] = useState([]);

  const pinRecipe = (recipe) => {
    recipes.splice(recipes.indexOf(recipe), 1);

    setRecipes(recipes);
    setPinnedRecipes([
      ...pinnedRecipes.filter((r) => r.id !== recipe.id),
      recipe,
    ]);
  };

  const unPinRecipe = (recipe) => {
    pinnedRecipes.splice(pinnedRecipes.indexOf(recipe), 1);

    setPinnedRecipes(pinnedRecipes);
    setRecipes([...recipes.filter((r) => r.id !== recipe.id), recipe]);
  };

  const togglePinRecipe = (recipeId) => {
    const recipe =
      recipes.find((r) => r.id === recipeId) ||
      pinnedRecipes.find((r) => r.id === recipeId);

    recipe.isPinned = !recipe.isPinned;

    if (recipe.isPinned) {
      pinRecipe(recipe);
    } else {
      unPinRecipe(recipe);
    }
  };

  const getRecipes = () => {
    getRandomRecipes(7 - pinnedRecipes.length)
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
            {(recipes && recipes.length) ||
            (pinnedRecipes && pinnedRecipes.length) ? (
              [...pinnedRecipes, ...recipes].map((recipe) => {
                return (
                  <Columns.Column key={recipe.id} size="one-quarter">
                    <RecipeCard
                      recipe={recipe}
                      togglePinRecipe={togglePinRecipe}
                    />
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
