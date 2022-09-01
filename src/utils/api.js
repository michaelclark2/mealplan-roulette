import constants from "./constants";

const getRandomRecipeUrl = (numberOfRecipes = 1) => {
  const config = {
    number: numberOfRecipes,
    addRecipeInformation: true,
    sort: "random",
    type: "main course,dinner,side dish",
  };
  const params = {
    apiKey: constants.SPOONACULAR_APIKEY,
    ...config,
  };
  const url = new URL(
    `https://api.spoonacular.com/recipes/complexSearch?${new URLSearchParams(
      params
    )}`
  );
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
      .then((results) => resolve(results.results))
      .catch((err) => reject(err));
  });
};
