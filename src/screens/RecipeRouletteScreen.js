import { React, useEffect, useState } from "react";
import {
  Button,
  Container,
  Heading,
  Hero,
  Columns,
} from "react-bulma-components";
import { Link, Navigate } from "react-router-dom";
import RecipeCard, {
  RecipeSpinnerCard,
} from "../components/RecipeCard/RecipeCard";
import { getRandomRecipes } from "../utils/api";

const RecipeRouletteScreen = (props) => {
  const [recipes, setRecipes] = useState([]);
  const [pinnedRecipes, setPinnedRecipes] = useState([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const { userSettings } = props;

  useEffect(() => {
    const recipes = JSON.parse(sessionStorage.getItem("recipes")) || [];
    const pinnedRecipes =
      JSON.parse(sessionStorage.getItem("pinnedRecipes")) || [];
    setRecipes(recipes);
    setPinnedRecipes(pinnedRecipes);
  }, []);

  if (!userSettings || userSettings.numberOfRecipes === undefined)
    return <Navigate to="/" />;

  const pinRecipe = (recipe) => {
    recipes.splice(recipes.indexOf(recipe), 1);
    const filteredRecipes = pinnedRecipes.filter((r) => r.id !== recipe.id);

    setRecipes(recipes);
    setPinnedRecipes([...filteredRecipes, recipe]);

    setSessionStorage(recipes, [...filteredRecipes, recipe]);
  };

  const unPinRecipe = (recipe) => {
    pinnedRecipes.splice(pinnedRecipes.indexOf(recipe), 1);
    const filteredRecipes = recipes.filter((r) => r.id !== recipe.id);

    setPinnedRecipes(pinnedRecipes);
    setRecipes([...filteredRecipes, recipe]);

    setSessionStorage([...filteredRecipes, recipe], pinnedRecipes);
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

  const setSessionStorage = (recipes, pinnedRecipes) => {
    sessionStorage.setItem("recipes", JSON.stringify(recipes));
    sessionStorage.setItem("pinnedRecipes", JSON.stringify(pinnedRecipes));
  };

  const getRecipes = () => {
    setIsSpinning(true);
    setRecipes([]);
    getRandomRecipes(
      userSettings?.numberOfRecipes - pinnedRecipes.length,
      userSettings
    )
      .then((recipes) => {
        setRecipes(recipes);
        setSessionStorage(recipes, pinnedRecipes);
      })
      .catch((err) => {
        console.error(err);
        // TODO: add error alert to dom
      })
      .finally(() => {
        setIsSpinning(false);
      });
  };

  const hasRecipes =
    (recipes && recipes.length) || (pinnedRecipes && pinnedRecipes.length);

  const makeRecipeCards = (recipe) => {
    return (
      <Columns.Column key={recipe.id} size="one-quarter">
        <RecipeCard recipe={recipe} togglePinRecipe={togglePinRecipe} />
      </Columns.Column>
    );
  };

  const pinnedRecipeCards = pinnedRecipes.map(makeRecipeCards);

  const recipeCards = recipes.map(makeRecipeCards);

  const spinnerCards = Array(
    userSettings?.numberOfRecipes - pinnedRecipes.length
  ).fill(
    <Columns.Column size="one-quarter">
      <RecipeSpinnerCard />
    </Columns.Column>
  );

  return (
    <Hero size="fullheight">
      <Hero.Header textAlign="center">
        <Heading p={3} textSize={1} textTransform="uppercase">
          Meal Plan Roulette
        </Heading>

        <Button color="primary" renderAs={Link} to="/mealplans">
          My Saved Plans
        </Button>
        <Button
          color="primary"
          disabled={isSpinning ? true : false}
          onClick={() => getRecipes()}
        >
          SPIN
        </Button>
        <Button color="primary" renderAs={Link} to="/settings">
          Settings
        </Button>
      </Hero.Header>
      <Hero.Body alignItems="start">
        <Container>
          <Columns justifyContent="center">
            {hasRecipes ? (
              [
                ...pinnedRecipeCards,
                ...(isSpinning ? spinnerCards : recipeCards),
                isSpinning ? null : (
                  <Columns.Column size="full" textAlign="center">
                    <Button color="primary">Save</Button>
                  </Columns.Column>
                ),
              ]
            ) : isSpinning ? (
              spinnerCards
            ) : (
              <Heading>
                Click "Spin" for {userSettings.numberOfRecipes} random recipes
              </Heading>
            )}
          </Columns>
        </Container>
      </Hero.Body>
    </Hero>
  );
};

export default RecipeRouletteScreen;
