import React, { useState, useEffect } from 'react';
import styles from "./puzzle.module.css";

export const PuzzlePage = () => {
  const [pieces, setPieces] = useState([]);
  const [isShuffled, setIsShuffled] = useState(false);

  useEffect(() => {
    createPuzzlePieces();
  }, []);

  // Функция для создания кусочков пазла из изображения
  const createPuzzlePieces = () => {
    const recipePhotoURL = localStorage.getItem('recipePhotoURL');
    const tempPieces = [];
    for (let i = 0; i < 8; i++) {
      const positionX = (i % 3) * -100;
      const positionY = Math.floor(i / 3) * -100;
      tempPieces.push(
        <div
          key={i}
          className={styles["puzzle-piece"]}
          style={{ backgroundImage: `url(${recipePhotoURL})`, backgroundPosition: `${positionX}% ${positionY}%` }}
          onClick={() => handlePieceClick(i)}
        />
      );
    }
    // Вставляем пустую ячейку в конец массива, чтобы представить пустое место на пазле
    tempPieces.push(<div key="empty" className={styles["empty-piece"]} />);
    setPieces(tempPieces);
    setIsShuffled(false); // Устанавливаем флаг для предотвращения перемешивания повторно
  };

  // Функция для перемешивания кусочков пазла
  const shufflePuzzlePieces = () => {
    const shuffledPieces = pieces.slice().sort(() => Math.random() - 0.5);
    setPieces(shuffledPieces);
    setIsShuffled(true);
  };

  // Функция для обработки клика по кусочку пазла
  const handlePieceClick = (index) => {
    if (!isShuffled) return; // Перед перемешиванием кусочков пазла нельзя их перемещать
    const emptyIndex = pieces.findIndex((piece) => piece.key === 'empty');
    const pieceIndex = index;
    if (isValidMove(emptyIndex, pieceIndex)) {
      const tempPieces = pieces.slice();
      [tempPieces[emptyIndex], tempPieces[pieceIndex]] = [tempPieces[pieceIndex], tempPieces[emptyIndex]];
      setPieces(tempPieces);
    }
  };

  // Функция для проверки возможности перемещения кусочка пазла
  const isValidMove = (emptyIndex, pieceIndex) => {
    const emptyRow = Math.floor(emptyIndex / 3);
    const emptyCol = emptyIndex % 3;
    const pieceRow = Math.floor(pieceIndex / 3);
    const pieceCol = pieceIndex % 3;
    return Math.abs(emptyRow - pieceRow) + Math.abs(emptyCol - pieceCol) === 1;
  };

  // Функция для проверки завершения пазла
  const checkPuzzleCompletion = () => {
    if (!isShuffled) return false; // Пазл не может быть завершен до того, как он будет перемешан
    for (let i = 0; i < pieces.length - 1; i++) {
      if (pieces[i].key !== i.toString()) {
        return false;
      }
    }
    return true;
  };

  return (
    <div className={styles.container}>
      <div className={styles["puzzle-board"]}>
        {/* Отображаем кусочки пазла */}
        {pieces.map((piece, index) => (
          <div
            key={index}
            className={styles["puzzle-piece"]}
            onClick={() => handlePieceClick(index)}
          >
            {piece}
          </div>
        ))}
      </div>
      <button onClick={shufflePuzzlePieces}>Перемешать</button>
      {checkPuzzleCompletion() && <div>Пазл завершен!</div>}
    </div>
  );
};
