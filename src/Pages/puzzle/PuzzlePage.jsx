import React, { useState, useEffect } from "react";
import { Alert, Button, Container, Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import CulinaryApi from "../../api";
import styles from "./puzzle.module.css";

export const PuzzlePage = () => {
  const { shortName, id } = useParams();
  const { user, recipes, setUser } = useUserContext();
  const [pieces, setPieces] = useState([]);
  const [isShuffled, setIsShuffled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    createAndShufflePuzzlePieces();
  }, []);

  console.log(recipes);

  const createAndShufflePuzzlePieces = () => {
    const recipePhotoURL = recipes[id - 1]?.recipePhotoURL;
    const tempPieces = [];
    const pieceSize = 100;
    const puzzleSize = 300;

    for (let i = 0; i < 9; i++) {
      const positionX = (i % 3) * pieceSize;
      const positionY = Math.floor(i / 3) * pieceSize;
      tempPieces.push({
        id: i,
        style: {
          backgroundImage: `url(${recipePhotoURL})`,
          backgroundSize: `${puzzleSize}px ${puzzleSize}px`,
          backgroundPosition: `-${positionX}px -${positionY}px`,
          width: `${pieceSize}px`,
          height: `${pieceSize}px`,
        },
      });
    }

    const shuffledPieces = tempPieces.slice().sort(() => Math.random() - 0.5);
    setPieces(shuffledPieces);
    setIsShuffled(true);
  };

  const handlePieceClick = (index) => {
    if (!isShuffled) return;
    const selectedPieceIndex = pieces.findIndex((piece) => piece.selected);
    if (selectedPieceIndex === -1) {
      const newPieces = pieces.map((piece, i) =>
        i === index ? { ...piece, selected: true } : piece
      );
      setPieces(newPieces);
    } else {
      const newPieces = pieces.map((piece, i) => {
        if (i === selectedPieceIndex) return pieces[index];
        if (i === index) return pieces[selectedPieceIndex];
        return piece;
      });
      setPieces(newPieces.map((piece) => ({ ...piece, selected: false })));
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
    const moneyForCompletePuzzle = 10;
    const newUserPoints = user.points + moneyForCompletePuzzle;
    const updatedUser = {
      ...user,
      points: newUserPoints,
      openedCountries: [...user.openedCountries, { shortName }],
    };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    const response = await CulinaryApi.changeToNextProgress(
      shortName,
      user.id,
      recipes[id - 1].recipeId
    );
    if (response.status === 204) {
      navigate(`/book/${shortName}/${id}/test`);
    } else {
      console.log(response.status);
    }

  };
  console.log(user);

  return (
    <Container className={styles.container}>
      <Row>
        <Col md={6}>
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
        </Col>
        <Col md={6}>
          <div className={styles["original-image"]}>
            <img
              src={recipes[id - 1]?.recipePhotoURL}
              alt="Original"
              className={styles["original-photo"]}
            />
          </div>
        </Col>
      </Row>
      {checkPuzzleCompletion() && (
        <div>
          <Alert variant="success" className={styles.successAlert}>
            <Alert.Heading>Пазл завершен!</Alert.Heading>
          </Alert>
          <Button variant="primary" className={styles.nextButton} onClick={handleNextClick}>
            Далее
          </Button>
        </div>
      )}
    </Container>
  );
};
