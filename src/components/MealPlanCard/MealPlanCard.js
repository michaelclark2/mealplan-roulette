import React from "react";
import {
  Box,
  Button,
  Columns,
  Container,
  Heading,
} from "react-bulma-components";

const MealPlanCard = (props) => {
  const mealPlan = { createdAt: Date.now(), recipes: [1, 2, 3, 4] };
  return (
    <Box>
      <Container className="content">
        <Columns className="is-mobile">
          <Columns.Column className="is-narrow">
            <Heading>
              {new Date(mealPlan.createdAt).toLocaleDateString("en-us", {
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
        <ul>
          {mealPlan.recipes.map((x) => (
            <li>
              <Heading
                renderAs="a"
                href="https://google.com"
                target="_blank"
                size={5}
              >
                Chicken Fajitas
              </Heading>
            </li>
          ))}
        </ul>
      </Container>
    </Box>
  );
};

export default MealPlanCard;
