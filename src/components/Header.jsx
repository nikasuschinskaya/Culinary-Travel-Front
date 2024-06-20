import { useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Navbar, Form, Nav } from "react-bootstrap";
import { useUserContext } from "../context/UserContext";
import styles from "./header.module.css";

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

  const isLoginOrHomePage = location.pathname === "/" || location.pathname === "/login";

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="md"
        className={`w-100 d-flex align-items-center justify-content-between fixed-top ${styles.navbar}`}
      >
        <Container>
          {isLoginOrHomePage ? (
            <Navbar.Brand className={`d-flex align-items-center gap-3 ${styles.brand}`}>
              <img src="/images/logo.jpg" height="40" width="40" alt="Logo" />
              Culinary Travel
            </Navbar.Brand>
          ) : (
            <>
              <Navbar.Brand href='/user' className={`d-flex align-items-center gap-3 ${styles.brand}`}>
                <img src="/images/logo.jpg" height="40" width="40" alt="Logo" />
                Culinary Travel
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id='responsive-navbar-nav'>
                <Nav className='me-auto'>
                  <Nav.Link href='/countries' className={styles.navlink}> Страны </Nav.Link>
                  <Nav.Link href='/favourites' className={styles.navlink}> Избранное </Nav.Link>
                </Nav>
                <Form className='d-flex'>
                  <Navbar.Brand className={styles.userPoints}>
                    {userPoints}
                    <img src="/images/points.png" height="35" width="35" alt="Points" />
                  </Navbar.Brand>
                  <Button variant="outline-info" onClick={handleLogout} className={styles.customButton}>
                    Выйти
                  </Button>
                </Form>
              </Navbar.Collapse>
            </>
          )}
          <Form className="d-flex">
            {location.pathname === "/" && (
              <Button variant="outline-info" href="/login" className={styles.customButton}>
                Войти
              </Button>
            )}
            {location.pathname === "/login" && (
              <Button variant="outline-info" href="/" className={styles.customButton}>
                Регистрация
              </Button>
            )}
          </Form>
        </Container>
      </Navbar>
    </>
  );
};