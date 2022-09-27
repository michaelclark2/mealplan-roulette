import React from "react";
import { Box, Button, Columns, Heading } from "react-bulma-components";

const MealPlanCard = ({ plan }) => {
  return (
    <Box>
      <Columns className="is-mobile">
        <Columns.Column className="is-narrow">
          <Heading>
            {new Date(plan.createdAt).toLocaleDateString("en-us", {
              weekday: "short",
              month: "numeric",
              day: "numeric",
              year: "numeric",
            })}
          </Heading>
        </Columns.Column>
        <Columns.Column className="is-flex" justifyContent="end">
          <Button color="danger">x</Button>
        </Columns.Column>
      </Columns>
      <ul className="is-flex-desktop is-align-items-center">
        {plan.recipes.map((recipe) => (
          <li className="is-block-desktop m-0">
            <Heading
              renderAs="a"
              href={recipe.sourceUrl}
              target="_blank"
              size={5}
            >
              {recipe.title}
            </Heading>
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default MealPlanCard;
