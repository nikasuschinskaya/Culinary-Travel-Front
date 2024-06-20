import { useState, useEffect } from "react";
import CulinaryApi from "../../api";
import { userStatus } from '../../config/userStatus.config';
import { Button, Container, ProgressBar } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./user.module.css";

import starCookProcurerIcon from '/images/starCookProcurer.png';
import starSeniorCookIcon from '/images/starSeniorCook.png';
import starSousChefIcon from '/images/starSousChef.png';
import starChiefIcon from '/images/starChief.png';

export const UserPage = () => {
    const [completedRecipesCount, setCompletedRecipesCount] = useState(0);
    const [recipesCount, setRecipesCount] = useState(0);

    useEffect(() => {
        const userRecipesProgressString = localStorage.getItem('userRecipesProgress');
        const userRecipesProgress = userRecipesProgressString ? JSON.parse(userRecipesProgressString) : [];
        const completedRecipes = userRecipesProgress.filter(recipe => recipe.status === 3);
        setCompletedRecipesCount(completedRecipes.length);
        getRecipesCount();
    }, []);

    const userName = localStorage.getItem('userName');
    const userOpenedCountriesString = localStorage.getItem('userOpenedCountries');
    const userOpenedCountries = userOpenedCountriesString ? JSON.parse(userOpenedCountriesString) : [];

    const getRecipesCount = async () => {
        const data = await CulinaryApi.getRecipesCount();
        setRecipesCount(parseInt(data));
    }

    const calculateProgress = () => {
        return recipesCount ? (completedRecipesCount / recipesCount) * 100 : 0;
    }

    const getUserStatus = () => {
        const progress = calculateProgress();
        if (progress === 100) return userStatus.Chief;
        if (progress >= 75) return userStatus.SousChef;
        if (progress >= 50) return userStatus.SeniorCook;
        return userStatus.CookProcurer;
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case userStatus.Chief:
                return starChiefIcon;
            case userStatus.SousChef:
                return starSousChefIcon;
            case userStatus.SeniorCook:
                return starSeniorCookIcon;
            case userStatus.CookProcurer:
                return starCookProcurerIcon;
            default:
                return null;
        }
    }

    const userStatusLabel = getUserStatus();
    const statusIcon = getStatusIcon(userStatusLabel);

    return (
        <Container className={styles["user-container"]}>
            <h1 className={styles.title}>Личный кабинет пользователя {userName}</h1>

            <div className={styles["user-details"]}>
                <div className={styles["user-rank"]}>
                    Ранг: {userStatusLabel}
                    {statusIcon && <img src={statusIcon} alt={userStatusLabel} className={styles["status-icon"]} />}
                </div>
                <div className={styles["user-details-progress"]}>
                    <p>Открытые страны: {userOpenedCountries.length} / 5 </p>
                    <p>Пройденные рецепты: {completedRecipesCount} / {recipesCount}</p>
                    <ProgressBar now={calculateProgress()} label={`${Math.round(calculateProgress())}%`} className={styles["progress-bar"]} />
                </div>
            </div>

            <div className={styles["user-actions"]}>
                <Link to="/countries">
                    <Button variant="primary" className={styles["start-journey-button"]}>
                        {userOpenedCountries.length !== 0 ? (<span> Продолжить </span>) : (<span> Начать </span>)}
                        путешествие
                    </Button>
                </Link>
                <Link to="/favourites">
                    <Button variant="primary" className={styles["favorites-button"]}> Избранные рецепты </Button>
                </Link>
            </div>
        </Container>
    );
};

