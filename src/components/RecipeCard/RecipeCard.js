import React from "react";
import { Box, Image, Heading, Columns } from "react-bulma-components";
import "./RecipeCard.css";

const RecipeCard = ({ recipe }) => {
  return (
    <Box className="RecipeCard">
      <Columns
        desktop={{ display: "inline", gap: 0 }}
        mobile={{ display: "flex", gap: 1 }}
        vCentered={true}
      >
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
