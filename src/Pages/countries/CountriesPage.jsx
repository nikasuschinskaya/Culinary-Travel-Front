import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useUserContext } from "../../context/UserContext";
import { recipeStatus } from "../../config/recipeStatus.config";
import CulinaryApi from "../../api";

import { Button } from "react-bootstrap";
import styles from "./countries.module.css";

export const CountriesPage = () => {
  const { user } = useUserContext();
  const [countries, setCountries] = useState([]);
  const userOpenedCountriesNames = user.openedCountries?.map((country) => country.shortName);

  const fetchData = async () => {
    const data = await CulinaryApi.fetchCountries();
    data ? setCountries(data) : [];
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles["countries-container"]}>
      <h1>Страны</h1>
      <div className={styles["countries-list"]}>
        {countries.map((country) => {
          const isOpened =
            userOpenedCountriesNames && userOpenedCountriesNames.includes(country.shortName);
          return (
            <div key={country.id} className={styles["country-item"]}>
              <img
                src={country.flagURL}
                alt={`${country.name} flag`}
                className={`${styles["country-flag"]} ${isOpened ? styles["colorful"] : ""}`}
                style={{ width: "30%", height: "auto" }}
              />
              <h3>{country.name}</h3>
              <p>
                Стоимость открытия страны: {country.pointsToOpen}{" "}
                <img src="/images/points.png" height="30" width="30" alt="Points" />
              </p>
              <HandleButton country={country} userOpenedCountriesNames={userOpenedCountriesNames} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const HandleButton = ({ country, userOpenedCountriesNames }) => {
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();
  const isOpened = userOpenedCountriesNames.includes(country.shortName);

  const handleBuyCountry = async (shortName, pointsToOpen) => {
    const { status } = await CulinaryApi.buyCountry(shortName, user.id);
    if (status === 200) {
      const newUserPoints = user.points - pointsToOpen;
      const updatedUser = {
        ...user,
        points: newUserPoints,
        openedCountries: [...user.openedCountries, { shortName }],
      };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } else {
      console.error("Ошибка покупки страны: Статус", status);
    }
  };

  const handleOpenCountryRecipes = async (shortName) => {
    // localStorage.setItem(`recipeStatus1`, recipeStatus.Started); //кринж-кринж-кринж-удалить надо будет и нормальную систему придумать
    navigate(`/book/${shortName}`);
  };

  if (isOpened) {
    return (
      <Button variant="primary" onClick={() => handleOpenCountryRecipes(country.shortName)}>
        Просмотреть рецепты
      </Button>
    );
  } else {
    return (
      <Button
        variant={parseInt(user.points) < country.pointsToOpen ? "secondary" : "primary"}
        onClick={() => handleBuyCountry(country.shortName, country.pointsToOpen)}
        disabled={parseInt(user.points) < country.pointsToOpen}
      >
        Открыть страну
      </Button>
    );
  }
};
