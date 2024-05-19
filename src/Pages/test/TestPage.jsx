import React, { useState, useEffect } from 'react';
import { Alert, Button, Container } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserContext } from "../../context/UserContext";
import CulinaryApi from "../../api";
import styles from "./test.module.css";

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

    const handleAnswerSelect = (questionId, answerId) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionId]: answerId,
        });
    };

    const handleSubmit = () => {
        const newResults = {};
        testData.questions.forEach(question => {
            const selectedAnswerId = selectedAnswers[question.id];
            const selectedAnswer = question.answerOptions.find(option => option.id === selectedAnswerId);
            newResults[question.id] = selectedAnswer ? selectedAnswer.isCorrect : false;
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
                            {testData.questions.map((question, index) => (
                                <li key={index} className={results[question.id] !== undefined ? (results[question.id] ? styles.correct : styles.incorrect) : ''}>
                                    <p>{question.title}</p>
                                    <ul>
                                        {question.answerOptions.map((option, idx) => (
                                            <li key={idx} className={styles.answerOption}>
                                                <label>
                                                    <input
                                                        type="radio"
                                                        name={`question-${question.id}`}
                                                        value={option.id}
                                                        onChange={() => handleAnswerSelect(question.id, option.id)}
                                                        disabled={results[question.id] !== undefined}
                                                    />
                                                    {' '}{option.text}
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                    {results[question.id] !== undefined && (
                                        <div className={results[question.id] ? styles.correctMessage : styles.incorrectMessage}>
                                            {results[question.id] ? 'Правильно!' : 'Не угадали :('}
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
                                Далее
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