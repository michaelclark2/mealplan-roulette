const getUrlWithParams = (baseURL, params) => {
  const url = new URL(`${baseURL}?${new URLSearchParams(params)}`);
  return url.toString();
};

export const getRandomRecipes = (numberOfRecipes, userSettings) => {
  const baseURL =
    "https://00s02wyqn0.execute-api.us-east-1.amazonaws.com/default/random-recipes";
  const params = {
    number: numberOfRecipes,
    diet: userSettings?.diets?.join(",").toString(),
    intolerances: userSettings?.intolerances?.join(",").toString(),
  };
  return new Promise((resolve, reject) => {
    fetch(getUrlWithParams(baseURL, params), {
      method: "POST",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.status, response.statusText);
      })
      .then((results) => resolve(results))
      .catch((err) => reject(err));
  });
};
