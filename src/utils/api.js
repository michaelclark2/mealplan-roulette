import constants from "./constants";

export const getRandomRecipeUrl = () => {
  const url = new URL("https://api.spoonacular.com/recipes/random");
  url.searchParams.set("apiKey", constants.SPOONACULAR_APIKEY);
  return url.toString();
};
