// import { useLocation, useNavigate } from "react-router-dom";
// import { Button, Container, Navbar, Form } from "react-bootstrap";
// import { useUserContext } from "../context/UserContext";
// import styles from "./header.module.css";

// export const Header = () => {
//   const location = useLocation();
//   const { userPoints } = useUserContext();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.setItem("recipeOrderalNumber", "");
//     localStorage.setItem("recipeStepsCount", "");
//     localStorage.setItem("testPointsForCompleting", "");
//     localStorage.setItem("recipePointsForCompleting", "");
//     localStorage.setItem("userPoints", "");
//     localStorage.setItem("recipes", "");
//     localStorage.setItem("user", "");
//     localStorage.setItem("recipeCookingTimeMinutes", "");
//     localStorage.setItem("userName", "");
//     localStorage.setItem("history", "");
//     localStorage.setItem("recipePhotoURL", "");
//     localStorage.setItem("recipeNumberOfServings", "");
//     localStorage.setItem("recipeId", "");
//     localStorage.setItem("userId", "");
//     localStorage.setItem("userOpenedCountries", "");
//     localStorage.setItem("recipeStatus1", "");
//     localStorage.setItem("recipeHistory", "");
//     localStorage.setItem("steps", "");

//     navigate('/login');
//   };

//   return (
//     <>
//       <Navbar
//         collapseOnSelect
//         expand="md"
//         bg="dark"
//         variant="dark"
//         className={`w-100 d-flex align-items-center justify-content-between fixed-top ${styles.navbar}`}
//       >
//         <Container>
//           <Navbar.Brand className={`d-flex align-items-center gap-3 ${styles.brand}`}>
//             <img src="/images/logo.jpg" height="40" width="40" alt="Logo" />
//             Culinary Travel
//           </Navbar.Brand>
//           <Form className="d-flex">
//             {location.pathname !== "/" && location.pathname !== "/login" && (
//               <Navbar.Brand className={styles.userPoints}>
//                 {userPoints}
//                 <img src="/images/points.png" height="35" width="35" alt="Points" />
//               </Navbar.Brand>
//             )}
//             {location.pathname === "/" && (
//               <Button variant="outline-info" href="/login" className={styles.customButton}>
//                 Войти
//               </Button>
//             )}
//             {location.pathname !== "/" && location.pathname !== "/login" && (
//               <Button variant="outline-info" onClick={handleLogout} className={styles.customButton}>
//                 Выйти
//               </Button>
//             )}
//           </Form>
//         </Container>
//       </Navbar>
//     </>
//   );
// };

import { useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Navbar, Form } from "react-bootstrap";

import { useUserContext } from "../context/UserContext";

export const Header = () => {
  const location = useLocation();
  const { userPoints } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem("recipeOrderalNumber", "");
    localStorage.setItem("recipeStepsCount", "");
    localStorage.setItem("testPointsForCompleting", "");
    localStorage.setItem("recipePointsForCompleting", "");
    localStorage.setItem("userPoints", "");
    localStorage.setItem("recipes", "");
    localStorage.setItem("user", "");
    localStorage.setItem("recipeCookingTimeMinutes", "");
    localStorage.setItem("userName", "");
    localStorage.setItem("history", "");
    localStorage.setItem("recipePhotoURL", "");
    localStorage.setItem("recipeNumberOfServings", "");
    localStorage.setItem("recipeId", "");
    localStorage.setItem("userId", "");
    localStorage.setItem("userOpenedCountries", "");
    localStorage.setItem("recipeStatus1", "");
    localStorage.setItem("recipeHistory", "");
    localStorage.setItem("steps", "");

    navigate('/login');
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="md"
        bg="dark"
        variant="dark"
        className="w-100 d-flex align-items-center justify-content-between fixed-top"
      >
        <Container>
          <Navbar.Brand className="d-flex align-items-center gap-3">
            <img src="/images/logo.jpg" height="40" width="40" alt="Logo" />
            Culinary Travel
          </Navbar.Brand>
          <Form className="d-flex">
            {location.pathname !== "/" && location.pathname !== "/login" && (
              <Navbar.Brand>
                {userPoints}
                <img src="/images/points.png" height="35" width="35" alt="Points" />
              </Navbar.Brand>
            )}
            {location.pathname === "/" && (
              <Button variant="outline-info" href="/login">
                Войти
              </Button>
            )}
            {location.pathname !== "/" && location.pathname !== "/login" && (
              <Button variant="outline-info" onClick={handleLogout}>
                Выйти
              </Button>
            )}
          </Form>
        </Container>
      </Navbar>
    </>
  );
};
