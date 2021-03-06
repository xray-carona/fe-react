import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { loginUserAction, registerUserAction } from '../actions/authenticationActions';
import { setCookie } from '../util/cookies';
import icon1 from '../assets/img/icon-1-li.png';
import icon2 from '../assets/img/icon-2-li.png'
import icon3 from '../assets/img/icon-3-li.png'
import carousel_1 from '../assets/img/carousel/carousel_1.png'
import carousel_2 from '../assets/img/carousel/carousel_2.png'
import carousel_3 from '../assets/img/carousel/carousel_3.png'
import carousel_4 from '../assets/img/carousel/carousel_4.png'
import carousel_5 from '../assets/img/carousel/carousel_5.png'
import google_icon from '../assets/img/google-icon.png';
import video from '../assets/r1ObefKq_close chat issue 4 (1).mp4';
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Header from "../components/Header";
import Carousel from 'react-bootstrap/Carousel'
import { initializeReactGA } from '../container/App';

class LoginPage extends Component {

    onHandleLogin = (event) => {
        event.preventDefault();

        let email = event.target.email.value;
        let password = event.target.password.value;

        const data = {
            email,
            password
        };

        this.props.dispatch(loginUserAction(data));
  }

    onHandleRegistration = (event) => {
        event.preventDefault();

        let name = event.target.name.value;
        let org = event.target.org.value;
        let email = event.target.email.value;
        let password = event.target.password.value;

        const data = {
            name,
            org,
            email,
            password
        };

        this.props.dispatch(registerUserAction(data));
    }

    componentDidMount() {
        initializeReactGA();
        document.title = 'RayEye Login';
    }

    render() {

        let isSuccess, message;
        // console.log(this.props.response);
        if (this.props.response && this.props.response.response) {
            isSuccess = this.props.response.response.success;
            if(!isSuccess && this.props.response.response.errors) message = this.props.response.response.errors.message  ;

            if (isSuccess) {
                console.log('success');
                // console.log(this.props.response.response)
                setCookie('token', this.props.response.response.token, 1);
                setCookie('userId', this.props.response.response.userId);
            }
        }
        return (
            <React.Fragment>
                <section className="banner" id='banner'>
                    <Header></Header>
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-8 col-lg-8 col-sm-12 col-md-6 col-xs-12">
                                <div className="d-flex flex-column h-100">
                                    <div className="text-container">
                                        <h1>Use the power of Artificial <br/>Intelligence to fight COVID-19</h1>
                                    </div>
                                    <div className="row icon-count">
                                        <div
                                            className="col-xl-4 col-lg-4 col-sm-4 col-md-4 col-xs-4 d-flex flex-column align-items-center">
                                            <img alt='nothing' src={icon1}/>
                                            <h1>5</h1>
                                            <strong className="text-center">Doctors Reached</strong>
                                        </div>
                                        <div
                                            className="col-xl-4 col-lg-4 col-sm-4 col-md-4 col-xs-4 d-flex flex-column align-items-center">
                                            <img alt='nothing' src={icon2}/>
                                            <h1>0</h1>
                                            <strong className="text-center">Hospitals Reached</strong>
                                        </div>
                                        <div
                                            className="col-xl-4 col-lg-4 col-sm-4 col-md-4 col-xs-4 d-flex flex-column align-items-center">
                                            <img alt='nothing' src={icon3}/>
                                            <h1>0</h1>
                                            <strong className="text-center">Test conducted</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-sm-12 col-md-6 col-xs-12">
                                <div className="card mt-5">
                                    <div className="card-body">
                                        <p className="title">Start by logging into your account</p>


                                        <div className="">
                                            <Tabs defaultActiveKey="login" id="uncontrolled-tab-example">
                                                <Tab eventKey="login" title="Login">
                                                    {!isSuccess ? <div>{message}</div> : <Redirect to='dashboard' />}
                                                    <form onSubmit={this.onHandleLogin}>
                                                        <div className="input-label-up mt-4">
                                                            <label htmlFor='email'>e-mail</label>
                                                            <input className="form-control" type="text" name='email'
                                                                   id='email'/>
                                                        </div>

                                                        <div className="input-label-up">
                                                            <label htmlFor='password'>Password</label>
                                                            <input className="form-control" type="password"
                                                                   name='password' id='password'/>
                                                        </div>

                                                        <div className="d-flex justify-content-center mt-2">
                                                            <button className="btn btn-primary" type='submit' style={{
                                                                paddingRight: '50px',
                                                                paddingLeft: '50px'
                                                            }}>
                                                                Login
                                                            </button>
                                                        </div>

                                                        {/* <div className="card-footer-banner">
                                                            <a href="#noid">Forgot Your Password?</a>
                                                            <button className="btn btn-outline-primary mt-3"
                                                                    type='button'>
                                                                <img alt='nothing' className="icon-img-btn" src={google_icon}/>Login
                                                                With Google
                                                            </button>
                                                        </div> */}
                                                    </form>
                                                </Tab>
                                                <Tab eventKey="signup" title="Signup">
                                                    <form onSubmit={this.onHandleRegistration}>
                                                        <div className="input-label-up mt-4">
                                                            <label htmlFor='name'>UserName</label>
                                                            <input className="form-control" type="text" name='name'
                                                                   id='name'/>
                                                        </div>

                                                        <div className="input-label-up">
                                                            <label htmlFor='name'>Organisation</label>
                                                            <input className="form-control" type="text" name='org'
                                                                   id='org'/>
                                                        </div>

                                                        <div className="input-label-up mt-4">
                                                            <label id='SignUpEmail'>e-mail</label>
                                                            <input className="form-control" type="text" name='email'
                                                                   id='SignUpEmail'/>
                                                        </div>

                                                        <div className="input-label-up">
                                                            <label htmlFor='SignUpPassword'>Password</label>
                                                            <input className="form-control" type="password"
                                                                   name='password' id='SignUpPassword'/>
                                                        </div>

                                                        {(this.props.response && this.props.response.signup_response && this.props.response.signup_response.email) ? 
                                                        <div className="signup_message_failure">
                                                          {this.props.response.signup_response.email}
                                                        </div>
                                                        : null}
                                                        {(this.props.response && this.props.response.signup_response && this.props.response.signup_response.success) ? 
                                                        <div className="signup_message_success">
                                                          <b>Account created successfully! Please login.</b>
                                                        </div>
                                                        : null}

                                                        {(this.props.response && this.props.response.signup_response && !this.props.response.signup_response.success) ? 
                                                          <div className="signup_message_failure">
                                                          <b>Account creation failed! Please try again.</b>
                                                        </div>
                                                        : null
                                                        }
                                                        
                                                        <div className="d-flex justify-content-center mt-2">
                                                            <button className="btn btn-primary" type='submit' style={{
                                                                paddingRight: '50px',
                                                                paddingLeft: '50px'
                                                            }}>
                                                                Signup
                                                            </button>
                                                        </div>

                                                        {/*<div className="card-footer-banner">
                                                            <a href="#noid">Forgot Your Password?</a>
                                                            <button className="btn btn-outline-primary mt-3"
                                                                    type='button'>
                                                                <img alt='nothing' className="icon-img-btn" src={google_icon}/>Signup
                                                                With Google
                                                            </button>
                                                        </div>*/}
                                                    </form>
                                                </Tab>
                                            </Tabs>
                                            {/*<div className="tab-content">*/}
                                            {/*    <div id="login" className="tab-pane active">*/}
                                            {/*        <form onSubmit={this.onHandleLogin}>*/}
                                            {/*            <div className="input-label-up mt-4">*/}
                                            {/*                <label>UserName</label>*/}
                                            {/*                <input className="form-control" type="text" name='email' id='email'/>*/}
                                            {/*            </div>*/}

                                            {/*            <div className="input-label-up">*/}
                                            {/*                <label>Password</label>*/}
                                            {/*                <input className="form-control" type="password" name='password' id='password'/>*/}
                                            {/*            </div>*/}

                                            {/*            <div className="d-flex justify-content-center mt-2">*/}
                                            {/*                <button className="btn btn-primary" type='submit' style={{*/}
                                            {/*                    paddingRight: '50px',*/}
                                            {/*                    paddingLeft: '50px'*/}
                                            {/*                }}>*/}
                                            {/*                    Login*/}
                                            {/*                </button>*/}
                                            {/*            </div>*/}

                                            {/*            <div className="card-footer-banner">*/}
                                            {/*                <a href="#">Forgot Your Password?</a>*/}
                                            {/*                <button className="btn btn-outline-primary mt-3"*/}
                                            {/*                        type='button'>*/}
                                            {/*                    <img alt='nothing className="icon-img-btn" src={google_icon}/>Login*/}
                                            {/*                    With Google*/}
                                            {/*                </button>*/}
                                            {/*            </div>*/}
                                            {/*        </form>*/}
                                            {/*    </div>*/}
                                            {/*    <div id="signUp" className=" tab-pane fade">*/}


                                            {/*    </div>*/}

                                            {/*</div>*/}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="banner" id="How-it-Works">
                    <div className="container">
                        <h1 className="text-center mt-5">How it Works?</h1>

                        <div
                                className="col-xl-12 col-md-12 col-lg-12 col-sm-12 col-xs-12 d-flex flex-column align-items-center mt-5">
                                <button className="btn btn-primary" style={{display:"none"}}>
                                    Request A Demo
                                </button>
                                <div className="text-center mt-4">
                                    <strong className="small-line">
                                        <h3><a href="/research">Read Our Research</a></h3>
                                    </strong>
                                </div>
                                <button className="btn btn-primary mt-4" onClick={()=> window.open("https://github.com/xray-carona", "_blank")}>
                                    <i className="fa fa-github" style={{
                                        fontSize: '24px',
                                        marginRight: '10px'
                                    }}></i>View on GitHub
                                </button>

                            </div>

                        <div className="row mt-5 justify-content-center">
                            <div className="col-xl-7 col-md-7 col-lg-7 col-sm-12 col-xs-12">
                                <video width="100%" height="" controls style={{display:"none"}}>
                                    <source src={video} type="video/mp4" />
                                </video>
                            </div>

                            <div className="col-xl-7 col-md-7 col-lg-7 col-sm-12 col-xs-12">
                              <Carousel interval={3000}>
                                <Carousel.Item>
                                  <img
                                    className="d-block w-100"
                                    src={carousel_1}
                                    alt="First slide"
                                  />
                                </Carousel.Item>
                                <Carousel.Item>
                                  <img
                                    className="d-block w-100"
                                    src={carousel_2}
                                    alt="Third slide"
                                  />

                                </Carousel.Item>
                                <Carousel.Item>
                                  <img
                                    className="d-block w-100"
                                    src={carousel_3}
                                    alt="Third slide"
                                  />
                                </Carousel.Item>
                                <Carousel.Item>
                                  <img
                                    className="d-block w-100"
                                    src={carousel_4}
                                    alt="Fourth slide"
                                  />
                                </Carousel.Item>
                                <Carousel.Item>
                                  <img
                                    className="d-block w-100"
                                    src={carousel_5}
                                    alt="Fifth slide"
                                  />
                                </Carousel.Item>
                              </Carousel>
                            </div>


                            
                        </div>

                        

                        
                    </div>

                </section>


                <section id="AboutUs" className="banner">
                    <div className="container">
                        <h1 className="mt-5 text-center">
                            About Us
                        </h1>
                        <div className="row mt-5 justify-content-center">
                            <div className="col-xl-7 col-md-7 col-lg-7 col-sm-12 col-xs-12">
                                <p className="text-center">
                                    We are a group of volunteers working on this application to support fight against COVID-19
                                </p>
                            </div>
                        </div>
                    </div>
                </section>


                <section id="contactUs" className="banner">
                    <h1 className="mt-5 text-center"> Contact Us</h1>
                    <div className="container mt-5">
                        <div className="row justify-content-around contact">
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 d-flex">
                                <i className="fa fa-envelope-o"></i>
                                <div>
                                    <p style={{
                                        margin: '0'
                                    }
                                    }>info@rayeye.in</p>
                                    <p></p>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 d-flex">
                                <i className="fa fa-phone"></i>
                                <div>
                                    <p style={{
                                        margin: '0'
                                    }
                                    }>+91-7753838089</p>
                                    <p></p>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 d-flex">
                                <i className="fa fa-map-marker"></i>
                                <p style={{
                                    width: '70%'
                                }}>
                                    Bangalore, India
                                </p>
                            </div>
                        </div>

                        {/* <div className="row justify-content-center">
                            <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-xs-12 ">
                                <div className="input-label-up mt-4">
                                    <label>FullName</label>
                                    <input className="form-control" type="text"/>
                                </div>

                                <div className="input-label-up">
                                    <label>E-mail</label>
                                    <input className="form-control" type="text"/>
                                </div>

                                <div className="input-label-up">
                                    <label>Message</label>
                                    <textarea className="form-control" type="text"> </textarea>
                                </div>
                                <div className="text-center">
                                    <button className="btn btn-primary disabled" style={{
                                        padding: '5px 50px'
                                    }}>
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div> */}
                    </div>

                </section>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (response, signup_response) => ({ response, signup_response });

export default connect(mapStateToProps)(LoginPage);