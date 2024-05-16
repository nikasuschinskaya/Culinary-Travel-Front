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
    const photoURL = 'https://lh3.googleusercontent.com/pw/AP1GczN1yJD5dfe4h-XCncRd8i-d2eR3K5NQY-M6S7i72CNGcGV1B8AaFadsGtPnX-wnKtLP5PXXOraN_hiHYBrPpc8E5mtV0PDN3GHfonqLsh5B_VUUEuDdiJ_7R2eBmSIMyEoyS5K-qEpfM7NKXsMN4rtn=w1340-h854-s-no-gm?authuser=0';
    localStorage.setItem('recipePhotoURL', photoURL);
    // try {
    //   const { data } = await CulinaryApi.fetchRecipe(orderalNumber, shortName, userId);
    //   localStorage.setItem('recipePhotoURL', data.photoURL);
    // } catch (error) {
    //   console.error("Error fetching recipe data:", error);
    // }
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