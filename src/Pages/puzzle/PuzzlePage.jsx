import React, { useState, useEffect } from 'react';
import { Alert, Button, Container } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import CulinaryApi from "../../api";
import styles from "./puzzle.module.css";

export const PuzzlePage = () => {
  const { shortName } = useParams();
  const [pieces, setPieces] = useState([]);
  const [isShuffled, setIsShuffled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    createAndShufflePuzzlePieces();
  }, []);

  const createAndShufflePuzzlePieces = () => {
    const recipePhotoURL = localStorage.getItem('recipePhotoURL');
    const tempPieces = [];
    const pieceSize = 100; // Размер каждого кусочка в процентах

    for (let i = 0; i < 9; i++) {
      const positionX = (i % 3) * -pieceSize;
      const positionY = Math.floor(i / 3) * -pieceSize;
      tempPieces.push({
        id: i,
        style: { backgroundImage: `url(${recipePhotoURL})`, backgroundPosition: `${positionX}% ${positionY}%` }
      });
    }

    const shuffledPieces = tempPieces.slice().sort(() => Math.random() - 0.5);
    setPieces(shuffledPieces);
    setIsShuffled(true);
  };

  const handlePieceClick = (index) => {
    if (!isShuffled) return;
    const selectedPieceIndex = pieces.findIndex(piece => piece.selected);
    if (selectedPieceIndex === -1) {
      const newPieces = pieces.map((piece, i) => i === index ? { ...piece, selected: true } : piece);
      setPieces(newPieces);
    } else {
      const newPieces = pieces.map((piece, i) => {
        if (i === selectedPieceIndex) return pieces[index];
        if (i === index) return pieces[selectedPieceIndex];
        return piece;
      });
      setPieces(newPieces.map(piece => ({ ...piece, selected: false })));
    }
  };

  const checkPuzzleCompletion = () => {
    for (let i = 0; i < pieces.length; i++) {
      if (pieces[i].id !== i) {
        return false;
      }
    }
    return true;
  };

  const handleNextClick = async () => {
    const userId = localStorage.getItem('userId');
    const recipeId = localStorage.getItem('recipeId');

    const response = await CulinaryApi.changeToNextProgress(shortName, userId, recipeId);
    if (response.status === 204) {
      navigate(`/book/${shortName}/test`);
    } else {
      console.log(response.status);
    }
  };

  return (
    <Container className={styles.container}>
      <div className={styles["puzzle-board"]}>
        {pieces.map((piece, index) => (
          <div
            key={index}
            className={`${styles["puzzle-piece"]} ${piece.selected ? styles["selected"] : ""}`}
            style={piece.style}
            onClick={() => handlePieceClick(index)}
          />
        ))}
      </div>
      {checkPuzzleCompletion() && (
        <div>
          <Alert variant="success" className={styles.successAlert}>
            <Alert.Heading>Пазл завершен!</Alert.Heading>
          </Alert>
          <Button variant="primary" className={styles.nextButton} onClick={handleNextClick}>Далее</Button>
        </div>
      )}
    </Container>
  );
};
