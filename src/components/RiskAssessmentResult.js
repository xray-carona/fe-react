import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { clearResults, logout } from '../actions';
import HeaderLoggedIn from "../components/HeaderLoggedIn";
import '../styles/App.css';
import { setCookie } from '../util/cookies';

class RiskAssessmentResult extends Component {

    backToPatientInfo = e => {
        e.preventDefault();
        this.props.clearResults();
        this.props.history.push('riskAssessmentForm');
    }

    logout = e => {
        e.preventDefault();
        this.props.logout();
        setCookie('token', '');
        this.props.history.push('login');
    }

    nextPatient = e => {
        e.preventDefault();
        this.props.clearResults();
        this.props.history.push('riskAssessmentForm');
    }

    render() {

        return (
            <div>
                <HeaderLoggedIn history={this.props.history}></HeaderLoggedIn>
                  <div className="row">
                    <button className="upload-btn btn-primary text-white back-button" onClick={this.backToPatientInfo}>Back</button>
                  </div>  
                  <div className="row container results">
                    <h1>{this.props.assessRiskResponse}</h1>  
                  </div>
            </div>
        );
    }
}
RiskAssessmentResult.propTypes = {}

const mapStateToProps = ({assessRiskResponse}) => ({assessRiskResponse});
const mapDispatchToProps = dispatch => bindActionCreators({clearResults, logout }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(RiskAssessmentResult)