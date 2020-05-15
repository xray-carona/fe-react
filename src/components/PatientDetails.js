import React, { Component } from "react";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { clearResults, logout, loadPatients, setCurrentPatient, loadPatientDetails } from '../actions';
import HeaderLoggedIn from "../components/HeaderLoggedIn";
import '../styles/App.css';
import { setCookie } from '../util/cookies';
import Table from 'react-bootstrap/Table';

class PatientDetails extends Component {

    logout = e => {
        e.preventDefault();
        this.props.logout();
        setCookie('token', '');
        this.props.history.push('login');
    }

    backToPatientHistory = e => {
        e.preventDefault();
        this.props.history.push('history');
    }

    componentDidMount() {
        this.props.loadPatientDetails(this.props.currentPatientId)
    }

    render() {
        if(this.props.patientDetails && this.props.patientDetails.data) {
            var info = JSON.stringify(this.props.patientDetails.data[0].patient_info);
        }
        return (
            <div>
            <HeaderLoggedIn history={this.props.history}></HeaderLoggedIn>
                  <div className="row">
                    <button className="upload-btn btn-primary text-white back-button" onClick={this.backToPatientHistory}>Back</button>
                  </div> 
                { this.props.patientDetails ?
                    <div>
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>Patient Id</th>
                              <th>{this.props.patientDetails.data[0].patient_id}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                                <td>Name</td>
                                <td>{this.props.patientDetails.data[0].patient_info.first_name} {this.props.patientDetails.data[0].patient_info.last_name}</td>
                            </tr>
                            <tr>
                                <td>RT/PCR test status</td>
                                <td>{this.props.patientDetails.data[0].patient_info.isRtPcrConducted}</td>
                            </tr>
                            
                            <tr>
                                <td>{this.props.valueToNameMap["isFever"]}</td>
                                <td>{this.props.patientDetails.data[0].patient_info.isFever ? "No" : "Yes"}</td>
                            </tr>
                            <tr>
                                <td>{this.props.valueToNameMap["isOxygen"]}</td>
                                <td>{this.props.patientDetails.data[0].patient_info.isOxygen ? "No" : "Yes"}</td>
                            </tr>
                            <tr>
                                <td>{this.props.valueToNameMap["isFatigue"]}</td>
                                <td>{this.props.patientDetails.data[0].patient_info.isFatigue ? "No" : "Yes"}</td>
                            </tr>
                            <tr>
                                <td>{this.props.valueToNameMap["isBodyAche"]}</td>
                                <td>{this.props.patientDetails.data[0].patient_info.isBodyAche ? "No" : "Yes"}</td>
                            </tr>
                            <tr>
                                <td>{this.props.valueToNameMap["isDiabetes"]}</td>
                                <td>{this.props.patientDetails.data[0].patient_info.isDiabetes ? "No" : "Yes"}</td>
                            </tr>
                            <tr>
                                <td>{this.props.valueToNameMap["isDryCough"]}</td>
                                <td>{this.props.patientDetails.data[0].patient_info.isDryCough ? "No" : "Yes"}</td>
                            </tr>
                            <tr>
                                <td>{this.props.valueToNameMap["occupation"]}</td>
                                <td>{this.props.patientDetails.data[0].patient_info.occupation}</td>
                            </tr>
                            <tr>
                                <td>{this.props.valueToNameMap["isConscious"]}</td>
                                <td>{this.props.patientDetails.data[0].patient_info.isConscious ? "No" : "Yes"}</td>
                            </tr>
                            <tr>
                                <td>{this.props.valueToNameMap["isDiarrhoea"]}</td>
                                <td>{this.props.patientDetails.data[0].patient_info.isDiarrhoea ? "No" : "Yes"}</td>
                            </tr>
                            <tr>
                                <td>{this.props.valueToNameMap["isRunnyNose"]}</td>
                                <td>{this.props.patientDetails.data[0].patient_info.isRunnyNose ? "No" : "Yes"}</td>
                            </tr>
                            <tr>
                                <td>{this.props.valueToNameMap["isSoreThroat"]}</td>
                                <td>{this.props.patientDetails.data[0].patient_info.isSoreThroat ? "No" : "Yes"}</td>
                            </tr>
                            <tr>
                                <td>{this.props.valueToNameMap["isAddressZone"]}</td>
                                <td>{this.props.patientDetails.data[0].patient_info.isAddressZone ? "No" : "Yes"}</td>
                            </tr>
                            <tr>
                                <td>{this.props.valueToNameMap["isHypertension"]}</td>
                                <td>{this.props.patientDetails.data[0].patient_info.isHypertension ? "No" : "Yes"}</td>
                            </tr>
                            <tr>
                                <td>{this.props.valueToNameMap["isCardiacDisease"]}</td>
                                <td>{this.props.patientDetails.data[0].patient_info.isCardiacDisease ? "No" : "Yes"}</td>
                            </tr>
                            <tr>
                                <td>{this.props.valueToNameMap["isImmunosupression"]}</td>
                                <td>{this.props.patientDetails.data[0].patient_info.isImmunosupression ? "No" : "Yes"}</td>
                            </tr>
                            <tr>
                                <td>{this.props.valueToNameMap["isLossOfTasteOrSmell"]}</td>
                                <td>{this.props.patientDetails.data[0].patient_info.isLossOfTasteOrSmell ? "No" : "Yes"}</td>
                            </tr>
                            <tr>
                                <td>{this.props.valueToNameMap["isDifficultyInBreathing"]}</td>
                                <td>{this.props.patientDetails.data[0].patient_info.isDifficultyInBreathing ? "No" : "Yes"}</td>
                            </tr>
                            <tr>
                                <td><b>Risk Status</b></td>
                                <td>{this.props.patientDetails.data[0].output.overAllScore.risk}</td>
                            </tr>
                          </tbody>
                          </Table>
                    </div>
                    : null
                }
            </div>
        );
    }
}

const mapStateToProps = ({ currentPatientId, patientDetails, valueToNameMap }) => ({ currentPatientId, patientDetails, valueToNameMap });
const mapDispatchToProps = dispatch => bindActionCreators({ clearResults, logout, loadPatientDetails}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(PatientDetails)
