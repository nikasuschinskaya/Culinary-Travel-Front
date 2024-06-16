import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./user.module.css";

export const UserPage = () => {
    const [completedRecipesCount, setCompletedRecipesCount] = useState(0);

    useEffect(() => {
        const userRecipesProgressString = localStorage.getItem('userRecipesProgress');
        const userRecipesProgress = userRecipesProgressString ? JSON.parse(userRecipesProgressString) : [];
        const completedRecipes = userRecipesProgress.filter(recipe => recipe.status === 3);
        setCompletedRecipesCount(completedRecipes.length);
    }, []);

    const userName = localStorage.getItem('userName');
    const userOpenedCountriesString = localStorage.getItem('userOpenedCountries');
    const userOpenedCountries = userOpenedCountriesString ? JSON.parse(userOpenedCountriesString) : [];

    return (
        <div className={styles["user-container"]}>
            <h1>Личный кабинет пользователя {userName}</h1>

            <div className={styles["user-details"]}>
                <p>Открытые страны: {userOpenedCountries.length}</p>
                <p>Пройденные рецепты: {completedRecipesCount}</p>
            </div>

            <div className={styles["user-actions"]}>
                <Link to="/countries">
                    <Button variant="primary" className={styles["start-journey-button"]}>
                        {userOpenedCountries.length !== 0 ? (<span> Продолжить </span>) : (<span> Начать </span>)}
                        путешествие
                    </Button>
                </Link>
                <Link to="/favourites">
                    <Button variant="primary" className={styles["favorites-button"]}> Избранное </Button>
                </Link>
            </div>
        </div>
    );
};