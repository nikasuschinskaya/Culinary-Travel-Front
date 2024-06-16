import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CulinaryApi from "../../api";
import styles from "./book.module.css";
import { Button } from "react-bootstrap";
import { recipeStatus } from "../../config/recipeStatus.config";

export const BookPage = () => {
  const { shortName } = useParams();
  const navigate = useNavigate();
  const [countryData, setCountryData] = useState(null);
  const [recipesProgress, setRecipesProgress] = useState([]);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const data = await CulinaryApi.fetchCountryByCode(shortName);
        setCountryData(data);
        const recipesProgressData = JSON.parse(localStorage.getItem('userRecipesProgress')) || [];
        setRecipesProgress(recipesProgressData);
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };
    fetchCountryData();
  }, [shortName]);

  const handleRecipeClick = async (orderalNumber, status) => {
    const userId = localStorage.getItem('userId');

    try {
      const { data } = await CulinaryApi.fetchRecipe(orderalNumber, shortName, userId);

      localStorage.setItem('recipePointsForCompleting', data.pointsForCompleting);
      localStorage.setItem('recipeCookingTimeMinutes', data.cookingTimeMinutes);
      localStorage.setItem('recipeNumberOfServings', data.numberOfServings);
      localStorage.setItem('recipeStepsCount', data.steps.length);
      localStorage.setItem('recipeOrderalNumber', orderalNumber);
      localStorage.setItem('recipeId', data.id);
      localStorage.setItem('recipePhotoURL', data.photoURL);
      localStorage.setItem('recipeHistory', data.history);
      localStorage.setItem('recipeIngredientsCount', data.ingredients.length);

      data.steps.forEach((step, index) => {
        localStorage.setItem(`recipeStep${index + 1}`, JSON.stringify(step));
      });

      data.ingredients.forEach((ingredient, index) => {
        localStorage.setItem(`recipeIngredient${index + 1}`, JSON.stringify(ingredient));
      });
      
    } catch (error) {
      console.error("Error fetching recipe data:", error);
    }

    if (status === recipeStatus.CompletedPuzzle) {
      navigate(`/book/${shortName}/test`);
      return;
    } else if (status === recipeStatus.CompletedTest || status === recipeStatus.FullyCompleted) {
      navigate(`/book/${shortName}/recipe`);
      return;
    }

    navigate(`/book/${shortName}/puzzle`);
  };

  const renderRecipeButtons = () => {
    if (!countryData || !countryData.recipes) {
      return null;
    }

    const sortedRecipes = countryData.recipes.sort((a, b) => a.orderal - b.orderal);

    return sortedRecipes.map((recipe, index) => {
      const recipeProgress = recipesProgress.find(progress => progress.recipeId === recipe.id);
      const status = recipeProgress ? recipeProgress.status : 0;

      const previousRecipeOrderal = index > 0 ? sortedRecipes[index - 1].orderal : null;
      const isPreviousRecipeCompleted = previousRecipeOrderal
        ? recipesProgress.some(progress => progress.recipeId === sortedRecipes[index - 1].id && progress.status === recipeStatus.FullyCompleted)
        : true;

      const buttonText = status === recipeStatus.FullyCompleted ? recipe.name : `Блюдо №${index + 1}`;

      return (
        <Button
          key={recipe.id}
          variant={isPreviousRecipeCompleted ? "primary" : "secondary"}
          className={styles.button}
          disabled={!isPreviousRecipeCompleted}
          onClick={() => handleRecipeClick(recipe.orderal, status)}
        >
          {buttonText}
        </Button>
      );
    });
  };

  return (
    <div className={styles["book-container"]}>
      <h2>Страна: {countryData ? countryData.name : "Loading..."}</h2>
      <div className={styles["recipe-buttons-container"]}>
        {renderRecipeButtons()}
      </div>
    </div>
  );
};