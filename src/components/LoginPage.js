import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { loginUserAction } from '../actions/authenticationActions';
import { setCookie } from '../util/cookies';

import { initializeReactGA } from '../container/App';

class LoginPage extends Component {

  onHandleLogin = (event) => {
    event.preventDefault();

    let email = event.target.email.value;
    let password = event.target.password.value;

    const data = {
      email, password
    };

    this.props.dispatch(loginUserAction(data));
  }

  componentDidMount() {
    initializeReactGA();
    document.title = 'RayEye Login';
  }

  render() {
    let isSuccess, message;
    console.log(console.log.response);
    if (this.props.response && this.props.response.hasOwnProperty('response')) {
      isSuccess = this.props.response.response.success;
      message = this.props.response.response.message;
      
      if (isSuccess) {
        console.log('success');
        setCookie('token', this.props.response.response.token, 1);
      }
    }

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/patientInfoForm"}>RayEye</Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to='/login'>Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to='/register'>Sign up</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="auth-wrapper">
          <h3>Login</h3>
          {!isSuccess ? <div>{message}</div> : <Redirect to='patientInfoForm' />}
          <form onSubmit={this.onHandleLogin}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" className="form-control" name="email" id="email" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" name="password" id="password" />
            </div>
            <div>
              <button type="submit" className="btn btn-primary btn-block">Login</button>
            </div>
          </form>
          Don't have account? <Link to='register'>Register here</Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (response) => ({response});

export default connect(mapStateToProps)(LoginPage);