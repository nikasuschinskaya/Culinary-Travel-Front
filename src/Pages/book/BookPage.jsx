import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import CulinaryApi from "../../api";
import { recipeStatus } from "../../config/recipeStatus.config";

import { Button } from "react-bootstrap";
import styles from "./book.module.css";
import { useUserContext } from "../../context/UserContext";

export const BookPage = () => {
  const [countryData, setCountryData] = useState([]);
  const { shortName } = useParams();
  const navigate = useNavigate();

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
  const { user, setRecipe } = useUserContext();
  if (!countryData || !countryData.recipes) {
    return null;
  }

  const handleRecipeClick = async (orderalNumber) => {
    const isCurrentRecipeCompleted =
      localStorage.getItem(`recipeStatus${orderalNumber}`) ===
      recipeStatus.FullyCompleted.toString();

    if (isCurrentRecipeCompleted) {
      navigate(`/book/${shortName}/recipe`);
      return;
    }

    try {
      const { data } = await CulinaryApi.fetchRecipe(orderalNumber, shortName, user.id);

      const recipes = {
        recipePointsForCompleting: data.pointsForCompleting,
        recipeCookingTimeMinutes: data.cookingTimeMinutes,
        recipeNumberOfServings: data.numberOfServings,
        recipeStepsCount: data.stepsCount,
        recipeOrderalNum: data.orderalNumber,
        recipeId: data.id,
        recipePhotoURL: data.photoURL,
        recipeHistory: data.history,
      };

      setRecipe(recipes);

    } catch (error) {
      console.error("Error fetching recipe data:", error);
    }
    navigate(`/book/${shortName}/puzzle`);
  };

  const sortedRecipes = countryData.recipes.sort((a, b) => a.orderal - b.orderal);

  console.log(sortedRecipes);

  return (
    <>
      {sortedRecipes.map((recipe, index) => (
        <Button
          key={index}
          variant={true ? "primary" : "secondary"}
          className={styles.button}
          disabled={false}
          onClick={() => handleRecipeClick(recipe.orderal)}
        >
          {`Блюдо №${index + 1}`}
        </Button>
      ))}
    </>
  );

  // return sortedRecipes.map((recipe, index) => {
  //   const previousRecipeOrderal = index > 0 ? sortedRecipes[index - 1].orderal : null;

  //   const isPreviousRecipeCompleted = previousRecipeOrderal
  //     ? localStorage.getItem(`recipeStatus${previousRecipeOrderal}`) ===
  //       recipeStatus.FullyCompleted.toString()
  //     : true;

  //   const isCurrentRecipeCompleted =
  //     localStorage.getItem(`recipeStatus${recipe.orderal}`) ===
  //     recipeStatus.FullyCompleted.toString();

  //   return (
  //     <Button
  //       key={index}
  //       variant={isPreviousRecipeCompleted ? "primary" : "secondary"}
  //       className={styles.button}
  //       disabled={!isPreviousRecipeCompleted}
  //       onClick={() => handleRecipeClick(recipe.orderal)}
  //     >
  //       {isCurrentRecipeCompleted ? recipe.name : `Блюдо №${index + 1}`}
  //     </Button>
  //   );
  // });
};
