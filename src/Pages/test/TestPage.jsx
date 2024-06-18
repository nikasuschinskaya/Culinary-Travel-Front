import React, { useState, useEffect } from 'react';
import { Alert, Button, Container } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserContext } from "../../context/UserContext";
import CulinaryApi from "../../api";
import styles from "./test.module.css";
import { recipeStatus } from '../../config/recipeStatus.config';

export const TestPage = () => {
    const { shortName } = useParams();
    const [testData, setTestData] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [results, setResults] = useState({});
    const [showNextButton, setShowNextButton] = useState(false);
    const navigate = useNavigate();
    const { userPoints, setUserPoints } = useUserContext();

    useEffect(() => {
        const fetchTest = async () => {
            const orderalNumber = localStorage.getItem('recipeOrderalNumber');
            const userId = localStorage.getItem('userId');

            const response = await CulinaryApi.fetchRecipeTest(orderalNumber, shortName, userId);
            if (response.status === 200) {
                setTestData(response.data);
                localStorage.setItem('testPointsForCompleting', response.data.pointsForCompleting);
            } else {
                console.log(response.status);
            }
        };

        fetchTest();
    }, [shortName]);

    const handleAnswerSelect = (questionIndex, answerIndex) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionIndex]: answerIndex,
        });
    };

    const handleSubmit = () => {
        const newResults = {};
        testData.questions.forEach((question, index) => {
            const selectedAnswerIndex = selectedAnswers[index];
            const selectedAnswer = question.answerOptions[selectedAnswerIndex];
            newResults[index] = selectedAnswer ? selectedAnswer.isCorrect : false;
            if (selectedAnswer && selectedAnswer.isCorrect) {
                const newUserPoints = parseInt(userPoints) + parseInt(localStorage.getItem('testPointsForCompleting'));
                setUserPoints(newUserPoints);
            }
        });
        setResults(newResults);
        setShowNextButton(true);
    };

    const handleNext = async () => {
        const userId = localStorage.getItem('userId');
        const recipeId = localStorage.getItem('recipeId');

        const response = await CulinaryApi.changeToNextProgress(shortName, userId, recipeId);
        if (response.status === 204) {

            let userRecipesProgress = JSON.parse(localStorage.getItem('userRecipesProgress')) || [];
            const progressIndex = userRecipesProgress.findIndex(progress => progress.recipeId === recipeId);
            userRecipesProgress[progressIndex].status = recipeStatus.CompletedTest;
            localStorage.setItem('userRecipesProgress', JSON.stringify(userRecipesProgress));

            navigate(`/book/${shortName}/history`);
        } else {
            console.log(response.status);
        }
    };

    return (
        <Container className={styles.container}>
            <div>
                {testData ? (
                    <div>
                        <ul>
                            {testData.questions.map((question, questionIndex) => (
                                <li key={questionIndex} className={results[questionIndex] !== undefined ? (results[questionIndex] ? styles.correct : styles.incorrect) : ''}>
                                    <p>{question.title}</p>
                                    <ul>
                                        {question.answerOptions.map((option, answerIndex) => (
                                            <li key={answerIndex} className={styles.answerOption}>
                                                <label>
                                                    <input
                                                        type="radio"
                                                        name={`question-${questionIndex}`}
                                                        value={answerIndex}
                                                        onChange={() => handleAnswerSelect(questionIndex, answerIndex)}
                                                        disabled={results[questionIndex] !== undefined}
                                                    />
                                                    {' '}{option.text}
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                    {results[questionIndex] !== undefined && (
                                        <div className={results[questionIndex] ? styles.correctMessage : styles.incorrectMessage}>
                                            {results[questionIndex] ? 'Правильно!' : 'Не угадали :('}
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                        {!showNextButton && (
                            <Button variant="primary" className={styles.answerButton} onClick={handleSubmit} disabled={Object.keys(results).length === testData.questions.length}>
                                Ответить
                            </Button>
                        )}
                        {showNextButton && (
                            <Button variant="primary" className={styles.nextButton} onClick={handleNext}>
                                Перейти к следующему этапу
                            </Button>
                        )}
                    </div>
                ) : (
                    <Alert variant="info">
                        Загрузка теста...
                    </Alert>
                )}
            </div>
        </Container>
    );
};
