import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { clearResults, logout } from '../actions';
import HeaderLoggedIn from "../components/HeaderLoggedIn";
import '../styles/App.css';
import { setCookie } from '../util/cookies';

class Dashboard extends Component {

    logout = e => {
        e.preventDefault();
        this.props.logout();
        setCookie('token', '');
        this.props.history.push('login');
    }
 
    render() {

        return (
            <div>
                <HeaderLoggedIn history={this.props.history}></HeaderLoggedIn>
                  <div className="row container">
                    <h1 className="">Dashboard</h1>  
                    <Link to="riskAssessmentForm">
                        <h2 className="text-center" style={{marginTop: "50%", marginRight: "20%"}}>Assess COVID-19 Risk</h2>
                    </Link>
                    <Link to="patientInfoForm">
                        <h2 className="text-center" style={{marginTop: "50%", marginLeft: "20%"}}>Analyse XRay/CT scan</h2>
                    </Link>
                  </div>
            </div>
        );
    }
}

Dashboard.propTypes = {}

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = dispatch => bindActionCreators({clearResults, logout }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)