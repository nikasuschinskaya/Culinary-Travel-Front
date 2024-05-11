import { useLocation } from "react-router-dom";
import { Button, Container, Nav, Navbar, Form } from "react-bootstrap";

export const Header = () => {
  const location = useLocation();

  return (
    <>
      <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" className="w-100">
        {/*fixed='top' */}
        <Container>
          {/* <Navbar.Brand as={Link} to='/'>  */}
          <Navbar.Brand>
            <img
              src="/images/logo.jpg"
              height="40"
              width="40"
              className="d-inline-block align-top"
              alt="Logo"
            />{" "}
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
              {location.pathname === "/" && (
                <Button variant="outline-info" href="/login">
                  {" "}
                  Войти{" "}
                </Button>
              )}
              {/* {location.pathname === '/home' && (

                            )} */}
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
