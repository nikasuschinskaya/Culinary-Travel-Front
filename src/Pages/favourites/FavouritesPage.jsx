import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import CulinaryApi from "../../api";
import styles from "./favourites.module.css";

export const FavouritesPage = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const navigate = useNavigate();
  const shortName = 'fr';

  useEffect(() => {
    const favoriteRecipesData = localStorage.getItem('userFavoriteRecipes');
    if (favoriteRecipesData) {
      setFavoriteRecipes(JSON.parse(favoriteRecipesData));
    }
  }, []);

  const handleRecipeClick = async (recipeName) => {
    try {
      const data  = await CulinaryApi.getRecipeByName(recipeName);
      console.log(data);
      localStorage.setItem('recipeCookingTimeMinutes', data.cookingTimeMinutes);
      localStorage.setItem('recipeNumberOfServings', data.numberOfServings);
      localStorage.setItem('recipeStepsCount', data.steps.length);
      localStorage.setItem('recipeOrderalNumber', data.orderal);
      localStorage.setItem('recipeId', data.id);
      localStorage.setItem('recipePhotoURL', data.photoURL);
      localStorage.setItem('recipeIngredientsCount', data.ingredients.length);

      data.steps.forEach((step, index) => {
        localStorage.setItem(`recipeStep${index + 1}`, JSON.stringify(step));
      });

      data.ingredients.forEach((ingredient, index) => {
        localStorage.setItem(`recipeIngredient${index + 1}`, JSON.stringify(ingredient));
      });

      navigate(`/book/${shortName}/recipe`);

    } catch (error) {
      console.error("Error fetching recipe data:", error);
    }
  };

  return (
    <Container className={styles.pageContainer}>
      <h1 className={styles.title}>Избранные рецепты</h1>
      <div className={styles.recipeButtonsContainer}>
        {favoriteRecipes.map((recipe) => (
          <Button
            key={recipe.name}
            onClick={() => handleRecipeClick(recipe.name)}
            className={styles.recipeButton}
          >
            {recipe.name}
          </Button>
        ))}
      </div>
    </Container>
  );
};
