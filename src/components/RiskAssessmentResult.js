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
                  {this.props.assessRiskResponse ? 
                    <div> 
                      <div className="row container">
                        <h1>Patient Score</h1> 
                      </div>
                        <div className="row container">
                            <div className="col-md-4">
                                <h2>Risk : {this.props.assessRiskResponse.patientScore.risk}</h2>
                            </div>
                                <div className="col-md-4">
                                <h2>Score : {this.props.assessRiskResponse.patientScore.score}</h2>
                            </div>
                        </div>
                        
                      <div className="row container">
                        <h1>Symptom Score</h1> 
                      </div>
                        <div className="row container">
                            <div className="col-md-4">
                                <h2>Risk : {this.props.assessRiskResponse.symptomScore.risk}</h2>
                            </div>
                                <div className="col-md-4">
                                <h2>Score : {this.props.assessRiskResponse.symptomScore.score}</h2>
                            </div>
                        </div>
                      {/*<div className="row container">*/}
                      {/*  <h1>Vital Score</h1> */}
                      {/*</div>*/}
                      {/*  <div className="row container">*/}
                      {/*      <div className="col-md-4">*/}
                      {/*          <h2>Risk : {this.props.assessRiskResponse.vitalScore.risk}</h2>*/}
                      {/*      </div>*/}
                      {/*          <div className="col-md-4">*/}
                      {/*          <h2>Score : {this.props.assessRiskResponse.vitalScore.score}</h2>*/}
                      {/*      </div>*/}
                      {/*  </div>  */}
                      <div className="row container">
                        <h1>Overall Score</h1>
                      </div>
                        <div className="row container">
                            <div className="col-md-4">
                                <h2>Risk : {this.props.assessRiskResponse.overAllScore.risk}</h2>
                            </div>
                                <div className="col-md-4">
                                <h2>Score : {this.props.assessRiskResponse.overAllScore.score}</h2>
                            </div>
                        </div>  
                    </div>
                    : null }
            </div>
        );
    }
}
RiskAssessmentResult.propTypes = {}

const mapStateToProps = ({ assessRiskResponse }) => ({ assessRiskResponse });
const mapDispatchToProps = dispatch => bindActionCreators({ clearResults, logout }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(RiskAssessmentResult)