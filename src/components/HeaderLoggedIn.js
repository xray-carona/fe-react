import React, { Component } from 'react';
import logo from '../assets/img/logo.png';
import { Container, Nav, Navbar } from "react-bootstrap";
import { logout } from '../actions';
import { connect } from 'react-redux';
import { setCookie } from '../util/cookies';
import { bindActionCreators } from 'redux';

class HeaderLoggedIn extends Component {
    logout = e => {
        e.preventDefault();
        this.props.logout();
        setCookie('token', '');
        this.props.history.push('login');
    }

    render() {
        return (
            <header className="header">
                <Navbar collapseOnSelect fixed="top" expand="lg" bg='headerBg'>
                    <Container>
                        <Navbar.Brand href="javascript:void(0)"><img className="logo" alt='something went wrong'
                                                        src={logo}/></Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                            <Nav className="mr-auto">
                                    <Nav.Link href="/dashboard">New Patient</Nav.Link>
                                    <Nav.Link href={"/dashboard"}>Home</Nav.Link>
                                    <Nav.Link href="/logout" onClick= { e => this.logout(e)}>Logout</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(HeaderLoggedIn);