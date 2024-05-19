import React, { useState, useEffect } from 'react';
import { Alert, Button, Col, Container, Nav, Row, Tab } from 'react-bootstrap';
import { useParams, useNavigate  } from 'react-router-dom';
import { useUserContext } from "../../context/UserContext";
import CulinaryApi from "../../api";
import styles from "./recipe.module.css";
import ingredientIcon from '/images/toggle.png';
import { recipeStatus } from '../../config/recipeStatus.config';

export const RecipePage = () => {
  const { shortName } = useParams();
  const navigate = useNavigate();
  const { userPoints, setUserPoints } = useUserContext();
  const [recipeStepData, setRecipeStepData] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showIngredients, setShowIngredients] = useState(true);
  const userId = localStorage.getItem('userId');
  const recipeOrderalNumber = localStorage.getItem('recipeOrderalNumber');

  useEffect(() => {
    const fetchRecipeStepData = async () => {
      const recipeStepsCount = parseInt(localStorage.getItem('recipeStepsCount'));

      const newRecipeSteps = [];
      for (let i = 0; i < recipeStepsCount; i++) {
        const response = await CulinaryApi.fetchRecipeStep(recipeOrderalNumber, i + 1, shortName, userId);
        if (response.status === 200) {
          newRecipeSteps.push(response.data);
        } else {
          setError(response.message);
          setLoading(false);
          return;
        }
      }

      setRecipeStepData(newRecipeSteps);
      setLoading(false);
    };

    fetchRecipeStepData();
  }, [shortName]);

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const toggleIngredients = () => {
    setShowIngredients((prevShow) => !prevShow);
  };

  const handleCompleteRecipe = async () => {
    const moneyForCompleteRecipe = parseInt(localStorage.getItem('recipePointsForCompleting'));

    const newUserPoints = parseInt(userPoints) + moneyForCompleteRecipe;
    setUserPoints(newUserPoints);

    const recipeId = localStorage.getItem('recipeId');

    const response = await CulinaryApi.changeToNextProgress(shortName, userId, recipeId);
    if (response.status === 204) {
      localStorage.setItem(`recipeStatus${recipeOrderalNumber}`, recipeStatus.FullyCompleted);
      navigate(`/book/${shortName}`);
    } else {
      console.log(response.status);
    } 
  };

  const getIngredients = () => {
    const ingredients = [];
    recipeStepData.forEach(step => {
      step.ingredientRecipeSteps.forEach(ingredientStep => {
        ingredients.push({
          name: ingredientStep.ingredient.name,
          photoURL: ingredientStep.ingredient.photoURL,
          unit: ingredientStep.ingredientUnit.name,
          value: ingredientStep.value
        });
      });
    });
    return ingredients;
  };

  const ingredients = getIngredients();

  return (
    <Container className={styles.container}>
      {loading ? (
        <Alert variant="info">Загрузка шага рецепта...</Alert>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <div>
          <Tab.Container activeKey={`step-${currentStep}`}>
            <Row>
              <Col>
                <Nav variant="tabs">
                  {recipeStepData.map((step, index) => (
                    <Nav.Item key={index}>
                      <Nav.Link
                        eventKey={`step-${index}`}
                        onClick={() => setCurrentStep(index)}
                        disabled={index > currentStep}
                      >
                        Шаг {index + 1}
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>
              </Col>
            </Row>
            <Row>
              <Col>
                <Tab.Content>
                  {recipeStepData.map((step, index) => (
                    <Tab.Pane key={index} eventKey={`step-${index}`}>
                      <h2>{step.title}</h2>
                      <img src={step.gifURL} alt="Иллюстрация" className={styles.stepImage} />
                      <div className={styles.ingredients}>
                        {step.ingredientRecipeSteps.map((ingredientStep, idx) => (
                          <div key={idx} className={styles.ingredient}>
                            <img src={ingredientStep.ingredient.photoURL} alt={ingredientStep.ingredient.name} className={styles.ingredientImage} />
                            <p>{ingredientStep.ingredient.name}</p>
                            <p>{ingredientStep.value} {ingredientStep.ingredientUnit.name}</p>
                          </div>
                        ))}
                      </div>
                    </Tab.Pane>
                  ))}
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
          {currentStep < recipeStepData.length - 1 && (
            <Button variant="primary" onClick={handleNextStep} className="mt-3">
              Следующий шаг
            </Button>
          )}
          {currentStep === recipeStepData.length - 1 && (
            <Button variant="success" onClick={handleCompleteRecipe} className="mt-3">
              Завершить изучение рецепта
            </Button>
          )}
        </div>
      )}
      <div className={styles.ingredientToggle} onClick={toggleIngredients}>
        <img src={ingredientIcon} alt="Ингредиенты" className={styles.ingredientIcon} />
      </div>
      {showIngredients && (
        <div className={styles.ingredientList}>
          <p>Время приготовления: { parseInt(localStorage.getItem('recipeCookingTimeMinutes')) } мин</p>
          <p>Количество порций: { parseInt(localStorage.getItem('recipeNumberOfServings')) }</p>
          <h4>Ингредиенты:</h4>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="d-flex align-items-center mb-2">
              <img src={ingredient.photoURL} alt={ingredient.name} className={`${styles.ingredientImage} me-2`} />
              <div>
                <p>{ingredient.name} - {ingredient.value} {ingredient.unit}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
};
