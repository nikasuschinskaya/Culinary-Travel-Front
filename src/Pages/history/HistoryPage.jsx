import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import styles from "./history.module.css";

export const HistoryPage = () => {
  const { shortName } = useParams();
  const navigate = useNavigate();
  const history = localStorage.getItem('recipeHistory');
  const recipePhotoURL = localStorage.getItem('recipePhotoURL');

  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const speedOfPrint = 50;

  useEffect(() => {
    if (currentIndex < history.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText((prev) => prev + history[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speedOfPrint); 
      return () => clearTimeout(timeoutId);
    }
  }, [currentIndex, history]);

  const handleNext = () => {
    navigate(`/book/${shortName}/recipe`);
  };

  const handleSkip = () => {
    setDisplayedText(history);
    setCurrentIndex(history.length);
  };

  return (
    <Container className={styles.container}>
      <h1 className={styles.title}>ИСТОРИЯ БЛЮДА</h1>
      <Row>
        <Col md={6} className={styles["original-image"]}>
          <img
            src={recipePhotoURL}
            alt="Original"
            className={styles["original-photo"]}
          />
          <Button onClick={handleSkip} className={styles.skipButton}>Пропустить анимацию текста</Button>
        </Col>
        <Col md={6} className={styles.historyText}>
          <p className={styles.text} lang="ru">{displayedText}</p>
          {currentIndex === history.length && (
            <Button onClick={handleNext} className={styles.nextButton}>Изучить рецепт</Button>
          )}
        </Col>
      </Row>
    </Container>
  );
};