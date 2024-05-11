import { useState, useEffect } from "react";
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
            <p>Сумма для покупки: {country.pointsToOpen}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
