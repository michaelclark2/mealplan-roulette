import React, { useState } from "react";
import {
  Box,
  Image,
  Icon,
  Button,
  Heading,
  Columns,
} from "react-bulma-components";
import "./RecipeCard.css";

const RecipeCard = ({ recipe, togglePinRecipe }) => {
  return (
    <Box
      className="RecipeCard"
      style={{ position: "relative" }}
      onClick={() => togglePinRecipe(recipe.id)}
    >
      <Columns
        desktop={{ display: "inline", gap: 0 }}
        mobile={{ display: "flex", gap: 1 }}
        vCentered={true}
      >
        <Columns.Column>
          {recipe.isPinned ? (
            <Icon overlay={true} backgroundColor="primary">
              X
            </Icon>
          ) : (
            ""
          )}
          <Image src={recipe.image} />
        </Columns.Column>
        <Columns.Column>
          <Heading
            renderAs="a"
            size="5"
            href={recipe.sourceUrl}
            target="_blank"
          >
            {recipe.title}
          </Heading>
        </Columns.Column>
      </Columns>
    </Box>
  );
};

export default RecipeCard;
