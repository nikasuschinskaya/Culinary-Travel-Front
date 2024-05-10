import React, { Component } from 'react';
import { Container, Nav, Tab, Col, Row } from 'react-bootstrap';

export default class About extends Component {
    render() {
        return (
            <Container>
                <Tab.Container id='ledt-tabs-example' defaultActiveKey='first'>
                    <Row>
                        <Col sm={3}>
                            <Nav variant='pills' className='flex-column mt-2'>
                                <Nav.Item>
                                    <Nav.Link eventKey='first'>Design</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey='second'>Team</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey='third'>Programming</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey='fourth'>Frameworks</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey='fifth'>Libraries</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content className='mt-3'>
                                <Tab.Pane eventKey='first'>
                                    <img src='https://images.pexels.com/photos/1796716/pexels-photo-1796716.jpeg' height='500' width='500'/>
                                    <p>jdsnnsjvdjkvdnjvdnjvskdnjvsdnjvdnvjsd
                                        vnjdvnsvjndnjvdjvsnjkdnjvdnjvdsnnjvsdvnsd
                                        vdnkksvksdklvkvdsisdvhsihfdvvdsdidnvdvd
                                        dsvjiosvddsjisvdjivdsjivdsijvdsjiivdsjivd
                                        vdknvdsvdvjdsjvdsjvidjvdsjijivdsjisvdjvjds
                                    </p>
                                </Tab.Pane>
                                <Tab.Pane eventKey='second'>
                                    <img src='https://images.pexels.com/photos/208701/pexels-photo-208701.jpeg' height='500' width='500' />
                                    <p>Hiiiiiiiiiiiiiiiiiiiiiiiiiiiii
                                        iiiiiiiiiiiiiiiiiiiiiiiiiiiii
                                        iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
                                        iiiiiiiiiiiiiiiiiiiiiiiiiiiii
                                    </p>
                                </Tab.Pane>
                                <Tab.Pane eventKey='third'>
                                    <img src='https://images.pexels.com/photos/1386444/pexels-photo-1386444.jpeg' height='500' width='500'/>
                                    <p>Hiiiiiiiiiiiiiiiiiiiiiiiiiiiii
                                        iiiiiiiiiiiiiiiiiiiiiiiiiiiii
                                        iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
                                        iiiiiiiiiiiiiiiiiiiiiiiiiiiii
                                    </p>
                                </Tab.Pane>
                                <Tab.Pane eventKey='fourth'>
                                    <img src='https://images.pexels.com/photos/1796715/pexels-photo-1796715.jpeg' height='500' width='500'/>
                                    <p>Hiiiiiiiiiiiiiiiiiiiiiiiiiiiii
                                        iiiiiiiiiiiiiiiiiiiiiiiiiiiii
                                        iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
                                        iiiiiiiiiiiiiiiiiiiiiiiiiiiii
                                    </p>
                                </Tab.Pane>
                                <Tab.Pane eventKey='fifth'>
                                    <img src='https://lh3.googleusercontent.com/pw/AP1GczNs1wMIxnDHgjN2q_jxyQH46esTDgIYabC7b8s35s9k5SJF6PJqSfK7qZUcqEuvmLkfNekbkLVhH79so01bkCFadey5Tk6DOtlirFmHB4eAYep5eMkbPTA89nQ54TkC6xlL6O4ueNJctuQHMS0BIsRd=w670-h810-s-no-gm?authuser=0' height='500' width='500'/>
                                    <p>Hiiiiiiiiiiiiiiiiiiiiiiiiiiiii
                                        iiiiiiiiiiiiiiiiiiiiiiiiiiiii
                                        iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
                                        iiiiiiiiiiiiiiiiiiiiiiiiiiiii
                                    </p>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Container>
        );
    }
}