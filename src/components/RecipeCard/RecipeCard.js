import React from "react";
import { Box, Image, Icon, Heading, Columns } from "react-bulma-components";
import ClipLoader from "react-spinners/ClipLoader";
import "./RecipeCard.css";
import { ReactComponent as LockIcon } from "../../assets/icons/lock.svg";

const RecipeCard = ({ recipe, togglePinRecipe }) => {
  return (
    <Box
      className="RecipeCard"
      style={{
        position: "relative",
        border: recipe.isPinned ? "2px solid #209CEE" : "",
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
              <LockIcon fill="#209CEE" />
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

export const RecipeSpinnerCard = (props) => {
  return (
    <Box
      className="RecipeCard is-flex is-align-items-center is-justify-content-center"
      style={{
        position: "relative",
      }}
    >
      <Columns>
        <Columns.Column
          style={{ minHeight: "100px" }}
          mobile={{ display: "hidden" }}
        ></Columns.Column>
        <Columns.Column size="full" textAlign="center">
          <ClipLoader loading={true} size={100} />
        </Columns.Column>
        <Columns.Column
          style={{ minHeight: "100px" }}
          mobile={{ display: "hidden" }}
        ></Columns.Column>
      </Columns>
    </Box>
  );
};

export default RecipeCard;
