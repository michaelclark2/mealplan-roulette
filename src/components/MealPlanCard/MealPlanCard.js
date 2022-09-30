import React from "react";
import { Box, Button, Columns, Heading, Image } from "react-bulma-components";

const MealPlanRecipeCard = ({ recipe }) => {
  return (
    <Box shadowless>
      <a href={recipe.sourceUrl} target="_blank">
        <Image
          className="mb-2"
          mobile={{ display: "hidden" }}
          src={recipe.image}
        />
      </a>
      <Heading renderAs="a" href={recipe.sourceUrl} target="_blank" size={5}>
        {recipe.title}
      </Heading>
    </Box>
  );
};

const MealPlanCard = ({ plan }) => {
  return (
    <Box>
      <Columns className="is-mobile">
        <Columns.Column className="is-narrow">
          <Heading>
            {new Date(plan.createdAt).toLocaleDateString(
              navigator.languages[0],
              {
                weekday: "short",
                month: "numeric",
                day: "numeric",
                year: "numeric",
              }
            )}
          </Heading>
        </Columns.Column>
        <Columns.Column className="is-flex" justifyContent="end">
          <Button color="danger">x</Button>
        </Columns.Column>
      </Columns>
      <ul className="is-flex-desktop is-align-items-start">
        {plan.recipes.map((recipe) => (
          <li className="is-block-desktop">
            <MealPlanRecipeCard recipe={recipe} />
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default MealPlanCard;
