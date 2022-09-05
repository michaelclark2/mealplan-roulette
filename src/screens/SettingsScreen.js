import { React, useEffect, useState } from "react";
import {
  Button,
  Columns,
  Heading,
  Hero,
  Container,
  Box,
  Form,
} from "react-bulma-components";
import { useNavigate } from "react-router-dom";

const SettingsScreen = (props) => {
  const [numberOfRecipes, setNumberOfRecipes] = useState(4);
  const [diets, setDiets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userSettings = JSON.parse(localStorage.getItem("settings"));
    setNumberOfRecipes(userSettings?.numberOfRecipes);
  }, []);

  const handleDietChange = (e) => {
    const value = e.target.name;
    console.log(value);
  };

  const handleFormSave = (e) => {
    localStorage.setItem(
      "settings",
      JSON.stringify({ numberOfRecipes, diets })
    );
    props.setUserSettings({ numberOfRecipes, diets });
    navigate("/");
  };

  return (
    <Hero size="fullheight">
      <Hero.Header textAlign="center">
        <Heading p={3} textSize={1} textTransform="uppercase">
          Settings
        </Heading>
        <Button onClick={handleFormSave}>Save</Button>
      </Hero.Header>
      <Hero.Body alignItems="start">
        <Container>
          <Columns justifyContent="center">
            <Columns.Column size="three-fifths">
              <Box backgroundColor="primary">
                <Form.Field className="is-horizontal">
                  <Form.Label mr="4">Number of Recipes in Meal Plan</Form.Label>
                  <Form.Control>
                    <Form.Input
                      type="number"
                      value={numberOfRecipes}
                      max="7"
                      onChange={(e) => setNumberOfRecipes(e.target.value * 1)}
                    />
                  </Form.Control>
                </Form.Field>
              </Box>
            </Columns.Column>
            <Columns.Column size="three-fifths">
              <Box backgroundColor="primary">
                <Form.Field onChange={handleDietChange}>
                  <Form.Label>Dietary Restrictions or Allergies</Form.Label>
                  <Form.Control>
                    <Form.Checkbox name="vegan" m="1">
                      Vegan
                    </Form.Checkbox>
                    <Form.Checkbox name="vegetarian" m="1">
                      Vegetarian
                    </Form.Checkbox>
                    <Form.Checkbox m="1">Gluten Free</Form.Checkbox>
                    <Form.Checkbox m="1">Peanut</Form.Checkbox>
                  </Form.Control>
                </Form.Field>
              </Box>
            </Columns.Column>
          </Columns>
        </Container>
      </Hero.Body>
    </Hero>
  );
};

export default SettingsScreen;
