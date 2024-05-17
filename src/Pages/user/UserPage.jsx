import { Button } from "react-bootstrap";

import styles from "./user.module.css";
import { Link } from "react-router-dom";

export const UserPage = () => {
    const userName = localStorage.getItem('userName');
    const userOpenedCountriesString = localStorage.getItem('userOpenedCountries');
    const userOpenedCountries = userOpenedCountriesString ? JSON.parse(userOpenedCountriesString) : [];
    
    console.log(userOpenedCountries.length);

    return (
        <div className={styles["user-container"]}>
            <h1>Личный кабинет пользователя {userName}</h1>

            <div className={styles["user-details"]}>
                <p>Открытые страны: {userOpenedCountries.length}</p>
                <p>Пройденные рецепты: {userOpenedCountries.length}</p>
            </div>

            <div className={styles["user-actions"]}>
                <Link to="/countries">
                    <Button variant="primary" className={styles["start-journey-button"]}>
                        {userOpenedCountries.length !== 0 ? (<span> Продолжить </span>) : (<span> Начать </span>)}
                        путешествие
                    </Button>
                </Link>
                <Link to="/favourites">
                    <Button variant="secondary" className={styles["favorites-button"]}> Избранное </Button>
                </Link>
            </div>
        </div>
    );
};
