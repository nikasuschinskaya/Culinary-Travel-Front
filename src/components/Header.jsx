import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Container, Nav, Navbar, Form } from "react-bootstrap";

// import { useUserPoints } from "../hooks/useUserPoints.js"
import { useUserPoints } from "../context/UserPointsContext"

export const Header = () => {
  const location = useLocation();
  const { userPoints } = useUserPoints();
  // const [userPoints] = useUserPoints();
  // const [points, setPoints] = useState(userPoints);

  // useEffect(() => {
  //   setPoints(userPoints); 
  // }, [userPoints]);

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
          <Navbar.Brand className="d-flex align-items-center gap-3">
            <img src="/images/logo.jpg" height="40" width="40" alt="Logo" />
            Culinary Travel
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {/* <Nav.Link href='/'> Home </Nav.Link>
                            <Nav.Link href='/about'> About us </Nav.Link>
                            <Nav.Link href='/contacts'> Contacts </Nav.Link> */}
              {/* <Nav.Link href='/register'> Register </Nav.Link> */}
            </Nav>
            <Form className="d-flex">
              {(location.pathname !== "/" && location.pathname !== "/login") && (
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
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
