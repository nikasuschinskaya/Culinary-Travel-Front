import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useUserContext } from "../../context/UserContext";
import CulinaryApi from "../../api";

import { Button } from "react-bootstrap";
import styles from "./countries.module.css";
import { recipeStatus } from "../../config/recipeStatus.config";

export const CountriesPage = () => {
  const { userPoints, setUserPoints } = useUserContext();
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate();

  const userOpenedCountriesString = localStorage.getItem('userOpenedCountries');
  const userOpenedCountries = userOpenedCountriesString ? JSON.parse(userOpenedCountriesString) : [];
  const userOpenedCountriesNames = userOpenedCountries.map(country => country.shortName);

  const fetchData = async () => {
    const data = await CulinaryApi.fetchCountries();
    setCountries(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleBuyCountry = async (shortName, pointsToOpen) => {
    const userId = localStorage.getItem('userId');
    console.log(userId);
    const { status } = await CulinaryApi.buyCountry(shortName, userId.toString());
    if (status === 200) {
        const newUserPoints = parseInt(userPoints) - pointsToOpen;
        setUserPoints(newUserPoints);
        localStorage.setItem('userOpenedCountries', JSON.stringify([...userOpenedCountries, { shortName }]));
    } 
    else {
        console.error("Ошибка покупки страны: Статус", status);
    }
  };

  const handleOpenCountryRecipes = async (shortName) => {
    localStorage.setItem(`recipeStatus1`, recipeStatus.Started); //кринж-кринж-кринж-удалить надо будет и нормальную систему придумать
    navigate(`/book/${shortName}`);
  };

  const renderButton = (country) => {

    const isOpened = userOpenedCountriesNames && userOpenedCountriesNames.includes(country.shortName);

    if (isOpened) {
      return (
        <Button 
          variant="primary"
          onClick={() => handleOpenCountryRecipes(country.shortName)}>
          Просмотреть рецепты
        </Button>
      );
    } else {
      return (
        <Button
          variant={parseInt(userPoints) < country.pointsToOpen ? "secondary" : "primary"}
          onClick={() => handleBuyCountry(country.shortName, country.pointsToOpen)}
          disabled={parseInt(userPoints) < country.pointsToOpen}>
          Открыть страну
        </Button>
      );
    }
  };

  return (
    <div className={styles["countries-container"]}>
      <h1>Страны</h1>
      <div className={styles["countries-list"]}>
        {countries.map((country) => {
          const isOpened = userOpenedCountriesNames && userOpenedCountriesNames.includes(country.shortName);
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
              {renderButton(country)}
            </div>
          );
        })}
      </div>
    </div>
  );
};