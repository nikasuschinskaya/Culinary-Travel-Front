import { useState, useEffect } from "react";
import CulinaryApi from "../../api";

import "./home.css";

export const HomePage = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const data = CulinaryApi.fetchCountries();
    setCountries(data);
  }, []);

  return (
    <div className={"home-container"}>
      <h1>Страны</h1>
      <div className={"countries-list"}>
        {countries.map((country) => (
          <div key={country.id} className={"country-item"}>
            <img
              src={country.flagURL}
              alt={`${country.name} flag`}
              className={"country-flag"}
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
