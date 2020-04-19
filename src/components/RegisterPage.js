import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { registerUserAction } from '../actions/authenticationActions';

import { initializeReactGA } from '../container/App';

class RegisterPage extends Component {
  onHandleRegistration = (event) => {
    event.preventDefault();

    let name = event.target.name.value;
    let email = event.target.email.value;
    let password = event.target.password.value;

    const data = {
      name, email, password
    };

    this.props.dispatch(registerUserAction(data));
  }

  componentDidMount() {
    initializeReactGA();
    document.title = 'RayEye Sign Up';
  }

  render() {
    let message, isSuccess;

    if (this.props.response.register && this.props.response.register.hasOwnProperty('response')) {
      isSuccess = this.props.response.register.response.success;
      message = this.props.response.register.response.message;
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
          <h3>Register</h3>
          {!isSuccess ? <div>{message}</div> : <Redirect to='login' />}
          <form onSubmit={this.onHandleRegistration}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text"  className="form-control" name="name" id="name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" className="form-control" name="email" id="email" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" name="password" id="password" />
            </div>
            <div>
              <button type="submit" className="btn btn-primary btn-block">Register</button>
            </div>
          </form>
          Already have account? <Link to='login'>Login here</Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (response) => ({
  response
});

export default connect(mapStateToProps)(RegisterPage);
