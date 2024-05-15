import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Carousel } from "react-bootstrap";
import { useUserPoints } from "../../context/UserPointsContext";
import CulinaryApi from "../../api";

import styles from "./countries.module.css";


export const CountriesPage = () => {
  const { userPoints, updateUserPoints } = useUserPoints();
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate();


  const fetchData = async () => {
    const data = await CulinaryApi.fetchCountries();
    setCountries(data);
  }
  
  useEffect(() => {
    fetchData();
  }, []);

  const handleBuyCountry = async (shortName, pointsToOpen) => {
    // const response = await CulinaryApi.buyCountry(shortName);
    
    // fetchData();
    const newUserPoints = parseInt(userPoints) - pointsToOpen;
    updateUserPoints(newUserPoints);

    navigate(`/book/${shortName}`);
  };

  return (
    <div className={styles["countries-container"]}>
      <h1>Страны</h1>
      <div className={styles["countries-list"]}>
        {countries.map((country) => (
          <div key={country.id} className={styles["country-item"]}>
            <img
              src={country.flagURL}
              alt={`${country.name} flag`}
              className={styles["country-flag"]}
              style={{ width: "25%", height: "auto" }}
            />
            <h3>{country.name}</h3>
            <p>Стоимость открытия страны: {country.pointsToOpen} <img src="/images/points.png" height="30" width="30" alt="Points" /></p> 
            <Button 
              onClick={() => handleBuyCountry(country.shortName, country.pointsToOpen)}
              disabled={parseInt(userPoints) < country.pointsToOpen}
              >
                Открыть страну
            </Button>
          </div>
        ))}
      </div>
  </div>
  );

  // Попытка сделать карусель, чтобы листать страны
  // return (
  //   <div className={styles["countries-container"]}>
  //     <h1>Страны</h1>
  //     <div className={styles["countries-carousel-wrapper"]}>
  //       <Carousel className={styles["countries-carousel"]} interval={null}>
  //         {countries.map((country) => (
  //           <Carousel.Item key={country.id}>
  //           <img
  //             className={`${styles["country-flag"]} d-block w-100` }
  //             src={country.flagURL}
  //             alt={`${country.name} flag`}
  //             // className={styles["country-flag"]}
  //           />
  //           <Carousel.Caption className={styles["country-item"]}>
  //             <h3>{country.name}</h3>
  //             <p>Стоимость открытия страны: {country.pointsToOpen} <img src="/images/points.png" height="30" width="30" alt="Points" /></p>
  //             <Button
  //               onClick={() => handleBuyCountry(country.shortName, country.pointsToOpen)}
  //               disabled={parseInt(userPoints) < country.pointsToOpen}
  //             >
  //               Открыть страну
  //             </Button>
  //           </Carousel.Caption>
  //         </Carousel.Item>
  //         ))}
  //       </Carousel>
  //     </div>
  //   </div>
  // );

};