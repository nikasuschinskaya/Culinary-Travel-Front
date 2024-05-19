import { Link } from "react-router-dom";

import { useUserContext } from "../../context/UserContext";

import { Button } from "react-bootstrap";
import styles from "./user.module.css";

export const UserPage = () => {
  const { user } = useUserContext();
  const userOpenedCountries = user.openedCountries.length;

  return (
    <div className={styles["user-container"]}>
      <h1>Личный кабинет пользователя {user.name}</h1>

      <div className={styles["user-details"]}>
        <p>Открытые страны: {userOpenedCountries}</p>
        <p>Пройденные рецепты: {userOpenedCountries}</p>
      </div>

      <div className={styles["user-actions"]}>
        <Link to="/countries">
          <Button variant="primary" className={styles["start-journey-button"]}>
            {userOpenedCountries !== 0 ? <span> Продолжить </span> : <span> Начать </span>}
            путешествие
          </Button>
        </Link>
        <Link to="/favourites">
          <Button variant="secondary" className={styles["favorites-button"]}>
            Избранное
          </Button>
        </Link>
      </div>
    </div>
  );
};
