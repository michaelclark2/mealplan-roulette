import React from "react";
import { Box, Image, Heading, Columns } from "react-bulma-components";

const RecipeCard = ({ recipe }) => {
  return (
    <Box>
      <Columns desktop={{ display: "inline" }} mobile={{ display: "flex" }}>
        <Columns.Column>
          <Image src={recipe.image} />
        </Columns.Column>
        <Columns.Column>
          <Heading renderAs="a" size="5" href={recipe.sourceUrl}>
            {recipe.title}
          </Heading>
        </Columns.Column>
      </Columns>
    </Box>
  );
};

export default RecipeCard;
