import React from "react";
import { Box, Image, Icon, Heading, Columns } from "react-bulma-components";
import "./RecipeCard.css";
import { ReactComponent as LockIcon } from "../../assets/icons/lock.svg";

const RecipeCard = ({ recipe, togglePinRecipe }) => {
  return (
    <Box
      className="RecipeCard"
      style={{
        position: "relative",
        border: recipe.isPinned ? "2px solid blue" : "",
      }}
      onClick={() => togglePinRecipe(recipe.id)}
    >
      <Columns
        desktop={{ display: "inline", gap: 0 }}
        mobile={{ display: "flex", gap: 1 }}
        vCentered={true}
      >
        <Columns.Column>
          {recipe.isPinned ? (
            <Icon overlay={true}>
              <LockIcon fill="blue" />
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
            onClick={(e) => e.stopPropagation()}
          >
            {recipe.title}
          </Heading>
        </Columns.Column>
      </Columns>
    </Box>
  );
};

export default RecipeCard;
