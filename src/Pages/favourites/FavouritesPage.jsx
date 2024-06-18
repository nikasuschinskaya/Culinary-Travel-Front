import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Container } from "react-bootstrap";
import CulinaryApi from "../../api";

import styles from "./favourites.module.css";

export const FavouritesPage = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const favoriteRecipesData = localStorage.getItem('userFavoriteRecipes');
    if (favoriteRecipesData) {
      setFavoriteRecipes(JSON.parse(favoriteRecipesData));
    }
  }, []);

  const handleRecipeClick = (recipe) => {
    // navigate(`/book/${recipe.countryShortName}/recipe`);
  };

  return (
    <div className={styles.pageContainer}>
      <Container className={styles.centeredContainer}>
        <h1>Избранные рецепты</h1>
        <div className={styles.recipeButtonsContainer}>
          {favoriteRecipes.map((recipe) => (
             <Button
             key={recipe.name}
             onClick={() => handleRecipeClick(recipe)}
             className={`${styles.recipeButton} ${styles.hoverButton}`}
           >
             {recipe.name}
           </Button>
          ))}
        </div>
      </Container>
    </div>
  );
};