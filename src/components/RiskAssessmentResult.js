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
                            <div className="col-md-12">
                                <h3>The demographic, travel information, location etc of patient indicate <b>{this.props.assessRiskResponse.patientScore.risk}</b> risk of COVID-19</h3>
                                <p><h4>Major contributing factors</h4>: {this.props.assessRiskResponse.patientScore.contributingFactors.map(f => <div>{f}</div>)}</p>
                            </div>
                        </div>
                        
                        <div className="row container">
                            <div className="col-md-12">
                                <h3>The current symptoms and  medical history indicate <b>{this.props.assessRiskResponse.symptomScore.risk}</b> risk of COVID-19 </h3>
                                <p><h4>Major contributing factors:</h4> {this.props.assessRiskResponse.symptomScore.contributingFactors.map(f => <div>{f}</div>)}</p>
                            </div>
                        </div>
                        <div className="row container">
                            <div className="col-md-12">
                                <h2>Overall Risk : <b>{this.props.assessRiskResponse.overAllScore.risk}</b></h2>
                            </div>
                        </div> 
                        <div className="row container">
                            <div className="col-md-12">
                                <p> </p>
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