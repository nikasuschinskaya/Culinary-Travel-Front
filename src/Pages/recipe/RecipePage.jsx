import React, { useState, useEffect } from 'react';
import { Alert, Button, Col, Container, Nav, Row, Tab } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import CulinaryApi from "../../api";
import styles from "./recipe.module.css";

export const RecipePage = () => {
  const { shortName } = useParams();
  const [recipeStepData, setRecipeStepData] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeStepData = async () => {
      const recipeOrderalNumber = localStorage.getItem('recipeOrderalNumber');
      const userId = localStorage.getItem('userId');
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
                      <img src={step.gifURL} alt="Иллюстрация" />
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
        </div>
      )}
    </Container>
  );
};

// import React, { useState, useEffect } from 'react';
// import { Alert, Button, Col, Container, Nav, Row, Tab } from 'react-bootstrap';
// import { useParams, useNavigate } from 'react-router-dom';
// import CulinaryApi from "../../api";
// import styles from "./recipe.module.css";

// export const RecipePage = () => {
//   const { shortName } = useParams();
//   const [recipeStepData, setRecipeStepData] = useState([]);
//   const [currentStep, setCurrentStep] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchRecipeStepData = async () => {
//       const recipeOrderalNumber = localStorage.getItem('recipeOrderalNumber');
//       const userId = localStorage.getItem('userId');
//       const recipeStepsCount = parseInt(localStorage.getItem('recipeStepsCount'));

//       const newRecipeSteps = [];
//       for (let i = 0; i < recipeStepsCount; i++) {
//         const response = await CulinaryApi.fetchRecipeStep(recipeOrderalNumber, i + 1, shortName, userId); // Запрашиваем данные для каждого шага
//         if (response.status === 200) {
//           newRecipeSteps.push(response.data); // Добавляем данные шага в массив
//         } else {
//           setError(response.message); // В случае ошибки выводим сообщение
//           setLoading(false);
//           return;
//         }
//       }

//       setRecipeStepData(newRecipeSteps); // Устанавливаем полученные данные
//       setLoading(false);
//     };

//     fetchRecipeStepData();
//   }, [shortName]);

//   const handleNextStep = () => {
//     setCurrentStep(currentStep + 1);
//   };

//   return (
//     <Container className={styles.container}>
//       {loading ? (
//         <Alert variant="info">
//           Загрузка шага рецепта...
//         </Alert>
//       ) : error ? (
//         <Alert variant="danger">
//           {error}
//         </Alert>
//       ) : (
//         <div>
//           <Tab.Container defaultActiveKey={`step-${currentStep}`}>
//             <Row>
//               <Col>
//                 <Nav variant="tabs">
//                   {recipeStepData.map((step, index) => (
//                     <Nav.Item key={index}>
//                       <Nav.Link eventKey={`step-${index}`}>Шаг {index + 1}</Nav.Link>
//                     </Nav.Item>
//                   ))}
//                 </Nav>
//               </Col>
//             </Row>
//             <Row>
//               <Col>
//                 <Tab.Content>
//                   {recipeStepData.map((step, index) => (
//                     <Tab.Pane key={index} eventKey={`step-${index}`}>
//                       <h2>{step.title}</h2> {/* Предположим, что шаг содержит свойство title */}
//                       {/* <ul> 
//                         {step.ingredients.map((ingredient, idx) => (
//                           <li key={idx}>{ingredient}</li>
//                         ))}
//                       </ul> */}
//                       <img src={step.gifURL} alt="Иллюстрация" />
//                     </Tab.Pane>
//                   ))}
//                 </Tab.Content>
//               </Col>
//             </Row>
//           </Tab.Container>
//           {currentStep < recipeStepData.length - 1 && (
//             <Button variant="primary" onClick={handleNextStep}>Следующий шаг</Button>
//           )}
//         </div>
//       )}
//     </Container>
//   );
// };