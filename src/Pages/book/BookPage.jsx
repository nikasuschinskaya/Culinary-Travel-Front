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

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const data = await CulinaryApi.fetchCountryByCode(shortName);
        setCountryData(data);
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };
    fetchCountryData();
  }, [shortName]);

  const handleRecipeClick = async (orderalNumber) =>  {
    const userId = localStorage.getItem('userId');
    const isCurrentRecipeCompleted = localStorage.getItem(`recipeStatus${orderalNumber}`) === recipeStatus.FullyCompleted.toString();

    if (isCurrentRecipeCompleted) {
      navigate(`/book/${shortName}/recipe`);
      return;
    }

    try {
      const { data } = await CulinaryApi.fetchRecipe(orderalNumber, shortName, userId);

      localStorage.setItem('recipePointsForCompleting', data.pointsForCompleting);
      localStorage.setItem('recipeCookingTimeMinutes', data.cookingTimeMinutes);
      localStorage.setItem('recipeNumberOfServings', data.numberOfServings);
      localStorage.setItem('recipeStepsCount', data.stepsCount);
      localStorage.setItem('recipeOrderalNumber', orderalNumber);
      localStorage.setItem('recipeId', data.id);
      localStorage.setItem('recipePhotoURL', data.photoURL);
      localStorage.setItem('recipeHistory', data.history);

    } catch (error) {
      console.error("Error fetching recipe data:", error);
    }
    navigate(`/book/${shortName}/puzzle`);
  };

  
  const renderRecipeButtons = () => {
    if (!countryData || !countryData.recipes) {
      return null;
    }

    const sortedRecipes = countryData.recipes.sort((a, b) => a.orderal - b.orderal);

    return sortedRecipes.map((recipe, index) => {
      const previousRecipeOrderal = index > 0 ? sortedRecipes[index - 1].orderal : null;
      const isPreviousRecipeCompleted = previousRecipeOrderal
        ? localStorage.getItem(`recipeStatus${previousRecipeOrderal}`) === recipeStatus.FullyCompleted.toString()
        : true;
      const isCurrentRecipeCompleted = localStorage.getItem(`recipeStatus${recipe.orderal}`) === recipeStatus.FullyCompleted.toString();

      return (
        <Button
          key={index}
          variant={isPreviousRecipeCompleted ? "primary" : "secondary"}
          className={styles.button}
          disabled={!isPreviousRecipeCompleted}
          onClick={() => handleRecipeClick(recipe.orderal)}
        >
          {isCurrentRecipeCompleted ? recipe.name : `Блюдо №${index + 1}`}
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