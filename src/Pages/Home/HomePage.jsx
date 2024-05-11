import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import CulinaryApi from "../../api";

import styles from "./home.module.css";

export const HomePage = () => {
  const [countries, setCountries] = useState([]);

  const fetchData = async () => {
    const data = await CulinaryApi.fetchCountries();
    setCountries(data);
  }
  
  useEffect(() => {
    fetchData();
  }, []);

  const handleBuyCountry = async (shortName, pointsToOpen) => {
    // const response = await CulinaryApi.buyCountry(shortName);
    
    fetchData();
    // localStorage.getItem('userPoints') -= pointsToOpen;
  };

  return (
    <div className={styles["home-container"]}>
      <h1>Страны</h1>
      <div className={styles["countries-list"]}>
        {countries.map((country) => (
          <div key={country.id} className={styles["country-item"]}>
            <img
              src={country.flagURL}
              alt={`${country.name} flag`}
              className={styles["country-flag"]}
              style={{ width: "50%", height: "auto" }}
            />
            <h3>{country.name}</h3>
            <p>Стоимость открытия страны: {country.pointsToOpen} <img src="/images/points.png" height="30" width="30" alt="Points" /></p> 
            <Button 
              onClick={() => handleBuyCountry(country.shortName, country.pointsToOpen)}
              disabled={localStorage.getItem('userPoints') < country.pointsToOpen}
              >
                Открыть страну
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
