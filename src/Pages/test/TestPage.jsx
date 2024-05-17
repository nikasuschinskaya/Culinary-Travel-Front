// import React, { useState, useEffect } from 'react';
// import { Alert, Button, Container } from 'react-bootstrap';
// import { useParams, useNavigate } from 'react-router-dom';
// import CulinaryApi from "../../api";
// import styles from "./test.module.css";

// export const TestPage = () => {
//     const { shortName } = useParams();
//     const [testData, setTestData] = useState(null);
//     const navigate = useNavigate();
  
//     useEffect(() => {
//       const fetchTest = async () => {
//         const orderalNumber = localStorage.getItem('recipeOrderalNumber');
//         const userId = localStorage.getItem('userId');
  
//         const response = await CulinaryApi.fetchRecipeTest(orderalNumber, shortName, userId);
//         if (response.status === 200) {
//           setTestData(response.data);
//         } else {
//           console.log(response.status);
//         }
//       };
  
//       fetchTest();
//     }, []);

//     return (
//         <Container className={styles.container}>
//             <div> 
//                 {testData ? (
//                 <div>
//                     <h2>{testData.questions.map(q => q.title)}</h2>
//                     <p>{testData.description}</p>
//                 </div>
//                 ) : (
//                     <Alert variant="info">
//                         Загрузка теста...
//                     </Alert>
//                 )}
//             </div>
//         </Container>
//     );
// };


import React, { useState, useEffect } from 'react';
import { Alert, Button, Container } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import CulinaryApi from "../../api";
import styles from "./test.module.css";

export const TestPage = () => {
    const { shortName } = useParams();
    const [testData, setTestData] = useState(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchTest = async () => {
        const orderalNumber = localStorage.getItem('recipeOrderalNumber');
        const userId = localStorage.getItem('userId');
  
        const response = await CulinaryApi.fetchRecipeTest(orderalNumber, shortName, userId);
        if (response.status === 200) {
          setTestData(response.data);
        } else {
          console.log(response.status);
        }
      };
  
      fetchTest();
    }, []);

    return (
        <Container className={styles.container}>
            <div> 
                {testData ? (
                <div>
                    <h2>{testData.title}</h2>
                    {/* <p>{testData.description}</p> */}
                    {/* Отображение списка вопросов */}
                    <ul>
                        {testData.questions.map((question, index) => (
                            <li key={index}>{question.title}</li>
                        ))}
                    </ul>
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
