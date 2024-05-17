import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CulinaryApi from "../../api";
import styles from "./book.module.css";
import { Button } from "react-bootstrap";

export const BookPage = () => {
  const { shortName } = useParams();
  const navigate = useNavigate();
  const [countryData, setCountryData] = useState(null);
  const [firstRecipeClicked, setFirstRecipeClicked] = useState(false);

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
    setFirstRecipeClicked(true);
    try {
      const { data } = await CulinaryApi.fetchRecipe(orderalNumber, shortName, userId);
      localStorage.setItem('recipeOrderalNumber', orderalNumber)
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

    return sortedRecipes.map((recipe, index) => (
      <Button
        key={index}
        variant={!firstRecipeClicked && index !== 0 ? "secondary" : "primary"}
        className={styles.button}
        disabled={!firstRecipeClicked && index !== 0}
        onClick={() => handleRecipeClick(recipe.orderal)}
      >
        {`Блюдо №${index + 1} ${recipe.name}`}
      </Button>
    ));
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