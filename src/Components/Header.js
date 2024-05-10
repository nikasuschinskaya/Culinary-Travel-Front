import React, { Component } from 'react';
import { Button, Container, Nav, Navbar, Form } from 'react-bootstrap';
import logo from '../assets/logo.jpg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from '../Pages/Home';
import About from '../Pages/About';
import Contacts from '../Pages/Contacts';
import Register from '../Pages/Register/Register';

export default class Header extends Component {
    render() {
        return (
            <>
                <Navbar collapseOnSelect expand="md" bg='dark' variant='dark'>  {/*fixed='top' */}
                    <Container>
                        <Navbar.Brand href='/'>
                            <img
                                src={logo}
                                height='50'
                                width='50'
                                className='d-inline-block align-top'
                                alt='Logo'
                            /> Culinary Travel
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id='responsive-navbar-nav'>
                            <Nav className='me-auto'>
                                {/* <Nav.Link href='/'> Home </Nav.Link>
                                <Nav.Link href='/about'> About us </Nav.Link>
                                <Nav.Link href='/contacts'> Contacts </Nav.Link> */}
                                {/* <Nav.Link href='/register'> Register </Nav.Link> */}
                            </Nav>
                            <Form className='d-flex'>
                                <Button variant='outline-info'>Войти</Button>
                            </Form>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                <BrowserRouter>
                    <Routes>
                        <Route exact path='/' element={<Register />} />
                        {/* <Route exact path='/' element={<Home />} /> */}
                        {/* <Route path='/about' element={<About />} />
                        <Route path='/contacts' element={<Contacts />} />  */}
                        {/* <Route path='/register' element={<Register />} /> */}
                    </Routes>
                </BrowserRouter>
            </>
        );
    }
}