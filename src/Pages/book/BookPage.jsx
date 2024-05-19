import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

import { recipeStatus } from "../../config/recipeStatus.config";
import CulinaryApi from "../../api";

import { Button } from "react-bootstrap";
import styles from "./book.module.css";

export const BookPage = () => {
  const [countryData, setCountryData] = useState([]);
  const { shortName } = useParams();
  const { recipes } = useUserContext();

  const fetchCountryData = async () => {
    try {
      const data = await CulinaryApi.fetchCountryByCode(shortName);
      data ? setCountryData(data) : [];
    } catch (error) {
      console.error("Error fetching country data:", error);
    }
  };

  useEffect(() => {
    fetchCountryData();
  }, [shortName]);

  return (
    <div className={styles["book-container"]}>
      <h2>Страна: {countryData ? countryData.name : "Loading..."}</h2>
      <div className={styles["recipe-buttons-container"]}>
        <RecipeButtons countryData={countryData} />
      </div>
    </div>
  );
};

const RecipeButtons = ({ countryData }) => {
  const navigate = useNavigate();
  const { user, setRecipes } = useUserContext();
  const { shortName } = useParams();
  if (!countryData || !countryData.recipes) {
    return null;
  }

  const handleRecipeClick = async (orderalNumber) => {
    const { data } = await CulinaryApi.fetchRecipe(orderalNumber, shortName, user.id);
    if (data) {
      const recipe = {
        recipePointsForCompleting: data.pointsForCompleting,
        recipeCookingTimeMinutes: data.cookingTimeMinutes,
        recipeNumberOfServings: data.numberOfServings,
        recipeStepsCount: data.stepsCount,
        recipeOrderalNum: data.orderalNumber,
        recipeId: data.id,
        recipePhotoURL: data.photoURL,
        recipeHistory: data.history,
      };

      setRecipes(recipe);

      navigate(`/book/${shortName}/${orderalNumber}/puzzle`);
    }
  };

  const sortedRecipes = countryData.recipes.sort((a, b) => a.orderal - b.orderal);

  console.log(sortedRecipes);

  return (
    <>
      {sortedRecipes.map((recipe, index) => (
        <Button
          key={index}
          variant={
            index === 0
              ? "primary"
              : recipe[index - 1]?.status === recipeStatus.FullyCompleted
              ? "primary"
              : "secondary"
          }
          className={styles.button}
          disabled={index === 0 ? false : recipe[index - 1]?.status !== recipeStatus.FullyCompleted}
          onClick={() => handleRecipeClick(recipe.orderal)}
        >
          {`Блюдо №${index + 1}`}
        </Button>
      ))}
    </>
  );
};
