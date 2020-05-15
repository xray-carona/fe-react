import React from "react";
import logo from '../assets/img/logo.png';
import { Container, Nav, Navbar } from "react-bootstrap";
import Scrollspy from 'react-scrollspy'

const Header = (props) => {
    return (
        <header className="header">
            <Navbar collapseOnSelect fixed="top" expand="lg" bg='headerBg'>
                <Container>
                    <Navbar.Brand href="#home"><img className="logo" alt='something went wrong'
                                                    src={logo}/></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                        <Nav className="mr-auto">
                            <Scrollspy className='links'  items={['banner', 'How-it-Works', 'AboutUs', 'contactUs']}
                                       currentClassName="active"
                            >
                                <Nav.Link href="#banner">Home</Nav.Link>
                                <Nav.Link href="#How-it-Works">How-it-Works</Nav.Link>
                                <Nav.Link href="#AboutUs">About Us</Nav.Link>
                                <Nav.Link href="#contactUs">Contact US</Nav.Link>
                                <Nav.Link href="/riskAssessmentForm" style={{color:"red"}}>Risk Assessment Demo</Nav.Link>
                            </Scrollspy>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;