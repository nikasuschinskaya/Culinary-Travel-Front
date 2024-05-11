import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import './Home.css';

const Home = () => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('/api/countries/all');
                setCountries(response.data);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchCountries();
    }, []);

    return (
        <div className="home-container">
            <h1>Страны</h1>
            <div className="countries-list">
                {countries.map((country) => (
                    <div key={country.id} className="country-item">
                        <img
                            src={country.flagURL}
                            alt={`${country.name} flag`}
                            className="country-flag"
                            style={{ width: '50%', height: 'auto' }} // Установка нового размера изображений
                        />
                        <h3>{country.name}</h3>
                        <p>Сумма для покупки: {country.pointsToOpen}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
