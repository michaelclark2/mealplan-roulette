import React from "react";
import { Box, Image, Heading, Columns } from "react-bulma-components";

const RecipeCard = (props) => {
  return (
    <Box>
      <Columns desktop={{ display: "inline" }} mobile={{ display: "flex" }}>
        <Columns.Column>
          <Image src="https://whatsfordinner.net/images/Vegetable-Farfalle-with-Chicken-and-Tomatoes.jpg" />
        </Columns.Column>
        <Columns.Column>
          <Heading
            renderAs="a"
            size="4"
            href="https://whatsfordinner.net/Vegetable-Farfalle-with-Chicken-and-Tomatoes.html"
          >
            Vegetable Farfalle with Chicken and Tomatoes
          </Heading>
        </Columns.Column>
      </Columns>
    </Box>
  );
};

export default RecipeCard;
