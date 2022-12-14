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
import { useAuth } from "../providers/AuthProvider";

const SPOONACULAR_DIET_CHOICES = [
  ["vegetarian", "Vegetarian"],
  ["vegan", "Vegan"],
  ["gluten-free", "Gluten Free"],
  ["pescatarian", "Pescatarian"],
  ["ketogenic", "Ketogenic"],
  ["whole30", "Whole30"],
  ["paleo", "Paleo"],
];

const SPOONACULAR_ALLERGY_CHOICES = [
  ["dairy", "Dairy"],
  ["egg", "Egg"],
  ["gluten", "Gluten"],
  ["grain", "Grain"],
  ["peanut", "Peanut"],
  ["tree nut", "Tree Nut"],
  ["seafood", "Seafood"],
  ["shellfish", "Shellfish"],
  ["sesame", "Sesame"],
  ["soy", "Soy"],
  ["sulfite", "Sulfite"],
  ["wheat", "Wheat"],
];

const SettingsScreen = (props) => {
  const [numberOfRecipes, setNumberOfRecipes] = useState(3);
  const [diets, setDiets] = useState([]);
  const [intolerances, setIntolerances] = useState([]);
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    if (auth.userSettings != null) {
      const { userSettings } = auth;
      setNumberOfRecipes(userSettings?.numberOfRecipes);
      setDiets(userSettings?.diets);
      setIntolerances(userSettings?.intolerances);
    }
  }, [auth]);

  const handleDietChange = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setDiets([...diets.filter((d) => d !== value), value]);
    } else {
      setDiets([...diets.filter((d) => d !== value)]);
    }
  };

  const handleAllergyChange = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setIntolerances([...intolerances.filter((d) => d !== value), value]);
    } else {
      setIntolerances([...intolerances.filter((d) => d !== value)]);
    }
  };

  const handleFormSave = (e) => {
    localStorage.setItem(
      "settings",
      JSON.stringify({
        numberOfRecipes,
        diets,
        intolerances,
      })
    );
    auth.setUserSettings({ numberOfRecipes, diets, intolerances });
    navigate("/");
  };

  return (
    <Hero size="fullheight">
      <Hero.Header textAlign="center">
        <Heading p={3} textSize={1} textTransform="uppercase">
          Settings
        </Heading>
        <Button color="primary" onClick={handleFormSave}>
          Save
        </Button>
        <Button color="primary" onClick={() => navigate("/")}>
          Cancel
        </Button>
      </Hero.Header>
      <Hero.Body alignItems="start">
        <Container>
          <Columns justifyContent="center">
            <Columns.Column size="three-fifths">
              <Box>
                <Form.Field align="center" size="medium" horizontal>
                  <Form.Label>
                    <Form.Field.Label>Number of Recipes</Form.Field.Label>
                  </Form.Label>
                  <Form.Field.Body>
                    <Form.Control>
                      <Form.Input
                        type="number"
                        value={numberOfRecipes}
                        min="0"
                        max="7"
                        onChange={(e) => setNumberOfRecipes(e.target.value * 1)}
                      />
                    </Form.Control>
                  </Form.Field.Body>
                </Form.Field>
              </Box>
            </Columns.Column>
            <Columns.Column size="three-fifths">
              <Box>
                <Form.Field size="medium">
                  <Form.Label>Diet Filters</Form.Label>
                  <Form.Control>
                    {SPOONACULAR_DIET_CHOICES.map((choice) => {
                      return (
                        <Form.Checkbox
                          checked={diets.includes(choice[0])}
                          value={choice[0]}
                          m="1"
                          onChange={handleDietChange}
                        >
                          {choice[1]}
                        </Form.Checkbox>
                      );
                    })}
                  </Form.Control>
                </Form.Field>
              </Box>
            </Columns.Column>
            <Columns.Column size="three-fifths">
              <Box>
                <Form.Field size="medium">
                  <Form.Label>Allergy Filters</Form.Label>
                  <Form.Control>
                    {SPOONACULAR_ALLERGY_CHOICES.map((choice) => (
                      <Form.Checkbox
                        checked={intolerances.includes(choice[0])}
                        m="1"
                        value={choice[0]}
                        onChange={handleAllergyChange}
                      >
                        {choice[1]}
                      </Form.Checkbox>
                    ))}
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
