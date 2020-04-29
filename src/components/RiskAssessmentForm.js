import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setXrayImage, setCTScanImage, uploadImage, response, getMLResponse, setLoading, logout, setPatientInfo, assessRisk } from '../actions';
import Preview from './Preview';
import LungConditions from './LungConditions';
import HeaderLoggedIn from "../components/HeaderLoggedIn";
import { setCookie } from '../util/cookies';
import '../styles/App.css';

import { initializeReactGA } from '../container/App';

class RiskAssessmentForm extends Component {

    componentDidMount() {
        initializeReactGA();
        this.props.response('', '');
    }

    onRtPcrConductedChange = (e) => {
        let patientInfo = this.props.patientInfo;
        patientInfo[e.currentTarget.name] = e.currentTarget.value;
        this.props.setPatientInfo(patientInfo);

        this.setState({
            isRtPcrConducted: e.currentTarget.value
        });
    }

    onRadioInputChange = (e) => {
        let patientInfo = this.props.patientInfo;
        patientInfo[e.currentTarget.name] = e.currentTarget.value;
        this.props.setPatientInfo(patientInfo);
    }

    onTextInputChange = (e) => {
        let patientInfo = this.props.patientInfo;
        patientInfo[e.currentTarget.name] = e.currentTarget.value;
        this.props.setPatientInfo(patientInfo);
    }

    evaluateRisk = e => {
        e.preventDefault();
        this.props.setLoading(true);
        // call API 
        this.props.assessRisk(this.props.patientInfo);
        // this.props.history.push('riskAssessmentResult');
    }

    logout = e => {
        e.preventDefault();
        this.props.logout();
        setCookie('token', '');
        this.props.history.push('login');
    }

    componentDidUpdate(prevProps) {
        if (prevProps.assessRiskResponse !== this.props.assessRiskResponse) {
            this.props.setLoading(false);
            this.props.history.push('riskAssessmentResult');
        }
    }

    closeAlert = e => {
        e.preventDefault();
        this.props.response('', '');
    }

    render() {
        return (
            <div>
      <HeaderLoggedIn history={this.props.history}></HeaderLoggedIn>
      <section className="patient-info-form form-group pb-5 pt-5">
        
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-xs-12">
                        <div className="input-label-up color-p">
                            <label>First Name</label>
                            <input ref="first_name" name="first_name" className="form-control" type="text" onChange={this.onTextInputChange}/>
                        </div>
                        <div className="input-label-up color-p">
                            <label>Second Name</label>
                            <input ref="last_name" name="last_name" className="form-control" type="text"  onChange={this.onTextInputChange}/>
                        </div>
                        <div className="input-label-up color-p">
                            <label>Age</label>
                            <input className="form-control" ref="age" name="age" placeholder="Enter Age in Numbers" type="text"  onChange={this.onTextInputChange}/>
                        </div>
                        <div>
                            <div><strong>Gender</strong></div>
                            <div className="d-flex mt-3">
                                <label className="radio-btn">Male
                                    <input type="radio" name="gender" value="male" onChange={this.onRadioInputChange}/>
                                        <span className="checkmark"></span>
                                </label>
                                <label className="radio-btn ml-3">Female
                                    <input type="radio" name="gender" value="female" onChange={this.onRadioInputChange}/>
                                        <span className="checkmark"></span>
                                </label>
                                <label className="radio-btn ml-3">Other
                                    <input type="radio" name="gender" value="other" onChange={this.onRadioInputChange}/>
                                        <span className="checkmark"></span>
                                </label>
                            </div>
                        </div>
                        <div className="input-label-up color-p">
                            <label>Body Temperature</label>
                            <input className="form-control" placeholder="Enter Temperature in Degree Celsius"
                                   type="text"  onChange={this.onTextInputChange} name="temperature"/>
                        </div>

                        <div className="input-label-up color-p">
                            <label>Heart Rate</label>
                            <input className="form-control" placeholder="Enter heart rate"
                                   type="text"  onChange={this.onTextInputChange} name="heart_rate"/>
                        </div>

                        <div className="input-label-up color-p">
                            <label>Blood pressure</label>
                            <input className="form-control" placeholder="120/80"
                                   type="text"  onChange={this.onTextInputChange} name="bp"/>
                        </div>

                        <div className="mt-4">
                            <div><strong>Sneezing</strong></div>
                            <div className="d-flex mt-4">
                                <label className="radio-btn">Yes
                                    <input type="radio" name="isSneezing" value="yes" onChange={this.onRadioInputChange}/>
                                        <span className="checkmark"></span>
                                </label>
                                <label className="radio-btn ml-3">No
                                    <input type="radio" name="isSneezing" value="no" onChange={this.onRadioInputChange}/>
                                        <span className="checkmark"></span>
                                </label>

                            </div>
                        </div>

                        <div className="mt-4">
                            <div><strong>Difficulty in Breathing</strong></div>
                            <div className="d-flex mt-4">
                                <label className="radio-btn">Yes
                                    <input type="radio" name="isDifficultyInBreathing" value="yes" onChange={this.onRadioInputChange}/>
                                        <span className="checkmark"></span>
                                </label>
                                <label className="radio-btn ml-3">No
                                    <input type="radio" name="isDifficultyInBreathing" value="no" onChange={this.onRadioInputChange}/>
                                        <span className="checkmark"></span>
                                </label>

                            </div>
                        </div>

                        <div className="mt-4">
                            <div><strong>Dry Cough</strong></div>
                            <div className="d-flex mt-4">
                                <label className="radio-btn">Yes
                                    <input type="radio" name="isDryCough" value="yes" onChange={this.onRadioInputChange}/>
                                        <span className="checkmark"></span>
                                </label>
                                <label className="radio-btn ml-3">No
                                    <input type="radio" name="isDryCough" value="no" onChange={this.onRadioInputChange}/>
                                        <span className="checkmark"></span>
                                </label>

                            </div>
                        </div>

                        <div className="mt-4">
                            <div><strong>RT-PCR Conducted</strong></div>
                            <div className="d-flex mt-4">
                                <label className="radio-btn">Yes
                                    <input type="radio" name="isRtPcrConducted" value="yes" onChange={this.onRtPcrConductedChange}/>
                                        <span className="checkmark"></span>
                                </label>
                                <label className="radio-btn ml-3">No
                                    <input type="radio" name="isRtPcrConducted" value="no" onChange={this.onRtPcrConductedChange} />
                                        <span className="checkmark"></span>
                                </label>
                            </div>
                        </div>

                        {this.state && this.state.isRtPcrConducted && this.state.isRtPcrConducted == 'yes' ?
                        <div className="mt-4">
                            <div><strong>RT-PCR Test result</strong></div>
                            <div className="d-flex mt-4">
                                <label className="radio-btn">Positive
                                    <input type="radio" name="isRtPcrResultPositive" value="yes" onChange={this.onRadioInputChange}/>
                                        <span className="checkmark"></span>
                                </label>
                                <label className="radio-btn ml-3">Negative
                                    <input type="radio" name="isRtPcrResultPositive" value="no" onChange={this.onRadioInputChange}/>
                                        <span className="checkmark"></span>
                                </label>
                            </div>
                        </div>
                        : null }
                    </div>
                </div>
            </div>

            <div className="mt-4 d-flex justify-content-center">
                      <button className="btn bg-warning text-dark mt-3" onClick={this.evaluateRisk} style={{
                                        paddingRight:'40px',
                                        paddingLeft: '40px'
                                    }}>
                        { this.props.loading ? 'Evaluating...' : 'Evaluate Risk' }</button>
             </div>
        </section>
        </div>
        );
    }
}
RiskAssessmentForm.propTypes = {
    msg: PropTypes.string,
    type: PropTypes.string,
    loading: PropTypes.bool
}

const mapStateToProps = ({ xray_image, aws_s3_image_url, msg, type, covid_diagnosis, annotated_img_url, loading, lung_conditions, ct_scan_image, model_type, patientInfo, assessRiskResponse }) => ({ xray_image, aws_s3_image_url, msg, type, covid_diagnosis, annotated_img_url, loading, lung_conditions, ct_scan_image, model_type, patientInfo, assessRiskResponse });
const mapDispatchToProps = dispatch => bindActionCreators({ setXrayImage, uploadImage, response, getMLResponse, setLoading, logout, setCTScanImage, setPatientInfo, assessRisk }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(RiskAssessmentForm)