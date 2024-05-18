import React, { useState, useEffect } from 'react';
import { Alert, Button, Container } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import CulinaryApi from "../../api";
import styles from "./history.module.css";

export const HistoryPage = () => {
  const { shortName } = useParams();
  const navigate = useNavigate();
  const history = localStorage.getItem('recipeHistory');

  const handleNext = () => {
    navigate(`/book/${shortName}/recipe`);
  };

  return (
    <Container className={styles.container}>
        <h1>ИСТОРИЯ БЛЮДА</h1>
        <p>{history}</p>
        <Button variant="primary" onClick={handleNext}>Изучить рецепт</Button>
    </Container>
  );
};