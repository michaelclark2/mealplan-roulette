import constants from "./constants";

const getRandomRecipeUrl = (numberOfRecipes = 1) => {
  const url = new URL("https://api.spoonacular.com/recipes/random");
  url.searchParams.set("apiKey", constants.SPOONACULAR_APIKEY);
  url.searchParams.set("number", numberOfRecipes);
  url.searchParams.set("tags", "dinner");
  return url.toString();
};

export const getRandomRecipes = (numberOfRecipes) => {
  return new Promise((resolve, reject) => {
    fetch(getRandomRecipeUrl(numberOfRecipes))
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.status, response.statusText);
      })
      .then((results) => resolve(results.recipes))
      .catch((err) => reject(err));
  });
};
