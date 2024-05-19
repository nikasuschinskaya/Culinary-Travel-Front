import { Link, useNavigate } from "react-router-dom";
import { Button, Container, Nav, Navbar, Form } from "react-bootstrap";

import { useUserContext } from "../context/UserContext";

export const Header = () => {
  const { user, isAuth, setIsAuth, setUser } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuth(false);
    setUser("");
    localStorage.setItem("user", "");
    navigate("/sign-in");
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="md"
        bg="dark"
        variant="dark"
        className="w-100 d-flex align-items-center justify-content-between"
      >
        <Container>
          <Link to={"/"} className="d-flex align-items-center gap-3">
            <img src="/images/logo.jpg" height="40" width="40" alt="Logo" />
            Culinary Travel
          </Link>
          <Form className="d-flex">
            {!isAuth ? (
              <Button variant="outline-info" href="/sign-in">
                Войти
              </Button>
            ) : (
              <>
                <Navbar.Brand className="d-flex align-items-center gap-3">
                  {user.points}
                  <img src="/images/points.png" height="35" width="35" alt="Points" />
                </Navbar.Brand>
                <Button variant="outline-info" onClick={handleLogout}>
                  Выйти
                </Button>
              </>
            )}
          </Form>
        </Container>
      </Navbar>
    </>
  );
};
