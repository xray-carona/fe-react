import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setXrayImage, setCTScanImage, uploadImage, response, getMLResponse, setLoading, logout, setPatientInfo, assessRisk } from '../actions';
import Preview from './Preview';
import LungConditions from './LungConditions';
import HeaderLoggedIn from "../components/HeaderLoggedIn";
import { setCookie, checkCookie } from '../util/cookies';
import '../styles/App.css';

import { initializeReactGA } from '../container/App';

class RiskAssessmentForm extends Component {

    componentDidMount() {
        initializeReactGA();
        this.props.response('', '');
        if(!checkCookie()) {
            setCookie('token','demoUser',1);
        }
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
        // console.log(e.currentTarget.name , e.currentTarget.value,typeof(e.currentTarget.value))
        if(e.currentTarget.value=="true" || e.currentTarget.value=="false") {
            patientInfo[e.currentTarget.name] = JSON.parse(e.currentTarget.value); // Using Boolean instead of string
        }
        else{
            patientInfo[e.currentTarget.name] = e.currentTarget.value;
        }
        this.props.setPatientInfo(patientInfo);
    }

    onTextInputChange = (e) => {
        let patientInfo = this.props.patientInfo;
        patientInfo[e.currentTarget.name] = e.currentTarget.value;
        this.props.setPatientInfo(patientInfo);
    }

    onSelected = (e) => {
        console.log(e.target.id);
        let patientInfo = this.props.patientInfo;
        if(patientInfo[e.target.id] && patientInfo[e.target.id]==true) {
            patientInfo[e.target.id] = false;
            e.target.style.color = "rgb(255, 67, 124)";
            e.target.style.backgroundColor = "rgb(255, 255, 255)";
        } else {
            patientInfo[e.target.id] = true;
            e.target.style.color = "rgb(255, 255, 255)";
            e.target.style.backgroundColor = "rgb(255, 67, 124)";
        }
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
                    <div className="col-xl-10 col-lg-10 col-md-10 col-sm-12 col-xs-12">
                        <div className="input-label-up color-p" >
                            <label  >First Name</label>
                            <input  ref="first_name" name="first_name" className="form-control" type="text" onChange={this.onTextInputChange} />
                        </div>
                        <div className="input-label-up color-p">
                            <label>Second Name</label>
                            <input ref="last_name" name="last_name" className="form-control" type="text"  onChange={this.onTextInputChange}/>
                        </div>
                        <div className="patient-risk-assessment">
                            <div className="input-label-up color-p">
                                <label>Age</label>
                                <input className="form-control" ref="age" name="age" placeholder="Enter Age in Numbers" type="text"  onChange={this.onTextInputChange}/>
                            </div>
                            <div>
                                <div><strong>Gender</strong></div>
                                <div className="d-flex mt-3">
                                    <label className="radio-btn">Male
                                        <input type="radio" name="gender" value={"male"} onChange={this.onRadioInputChange}/>
                                            <span className="checkmark"></span>
                                    </label>
                                    <label className="radio-btn ml-3">Female
                                        <input type="radio" name="gender" value={"female"} onChange={this.onRadioInputChange}/>
                                            <span className="checkmark"></span>
                                    </label>
                                    <label className="radio-btn ml-3">Other
                                        <input type="radio" name="gender" value={"other"} onChange={this.onRadioInputChange}/>
                                            <span className="checkmark"></span>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <div><strong>Occupation</strong></div>
                                <div className="d-flex mt-3">
                                    <label className="radio-btn">Police/HealthCare
                                        <input type="radio" name="occupation" value="essential" onChange={this.onRadioInputChange}/>
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="radio-btn ml-3">Delivery Boy
                                        <input type="radio" name="occupation" value="delivery" onChange={this.onRadioInputChange}/>
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="radio-btn ml-3">Indoor Work / Housewife
                                        <input type="radio" name="occupation" value="indoor" onChange={this.onRadioInputChange}/>
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="radio-btn ml-3">Other
                                        <input type="radio" name="occupation" value="other" onChange={this.onRadioInputChange}/>
                                        <span className="checkmark"></span>
                                    </label>
                                </div>
                            </div>
                            <div className="d-flex mt-3"><strong>Medical History</strong></div>
                            <div className="d-flex mt-3">
                                <div className="select-button" id="isDiabetes" onClick={(e) => this.onSelected(e)} style={{color: "rgb(255, 67, 124)", backgroundColor: "rgb(255, 255, 255)", borderColor: "rgb(255, 67, 124)"}}>
                                    Diabetes
                                </div>
                                <div className="select-button" id="isHypertension" onClick={(e) => this.onSelected(e)} style={{color: "rgb(255, 67, 124)", backgroundColor: "rgb(255, 255, 255)", borderColor: "rgb(255, 67, 124)"}}>
                                    Hypertension
                                </div>
                                <div className="select-button" id="isCardiacDisease" onClick={(e) => this.onSelected(e)} style={{color: "rgb(255, 67, 124)", backgroundColor: "rgb(255, 255, 255)", borderColor: "rgb(255, 67, 124)"}}>
                                    Cardio Vascular Disease
                                </div>
                                <div className="select-button" id="isImmunosupression" onClick={(e) => this.onSelected(e)} style={{color: "rgb(255, 67, 124)", backgroundColor: "rgb(255, 255, 255)", borderColor: "rgb(255, 67, 124)"}}>
                                    Immunosupression
                                </div>
                            </div>
                            <div className="d-flex mt-3"><strong>Background information</strong></div>
                            <div className="d-flex mt-3">
                                <div className="select-button" id="isTravelHistory" onClick={(e) => this.onSelected(e)} style={{color: "rgb(255, 67, 124)", backgroundColor: "rgb(255, 255, 255)", borderColor: "rgb(255, 67, 124)"}}>
                                    Travel History from Affected Area (Delhi, Mumbai,Abroad)
                                </div>
                                <div className="select-button" id="isAddressZone" onClick={(e) => this.onSelected(e)} style={{color: "rgb(255, 67, 124)", backgroundColor: "rgb(255, 255, 255)", borderColor: "rgb(255, 67, 124)"}}>
                                    Address in containment zone
                                </div>
                            </div>
                        </div>

                        {/*<div className="mt-4">*/}
                        {/*    <div><strong>Sneezing</strong></div>*/}
                        {/*    <div className="d-flex mt-4">*/}
                        {/*        <label className="radio-btn">Yes*/}
                        {/*            <input type="radio" name="isSneezing" value="true" onChange={this.onRadioInputChange}/>*/}
                        {/*                <span className="checkmark"></span>*/}
                        {/*        </label>*/}
                        {/*        <label className="radio-btn ml-3">No*/}
                        {/*            <input type="radio" name="isSneezing" value="false" onChange={this.onRadioInputChange}/>*/}
                        {/*                <span className="checkmark"></span>*/}
                        {/*        </label>*/}

                        {/*    </div>*/}
                        {/*</div>*/}

                        {/*SYMPTOM RISK ASSESSMENT */}
                        <div className="d-flex mt-3"><strong>Choose symptoms</strong></div>
                        <div className="d-flex mt-3">
                        <div className="symptom_risk_assessment">
                                <div className="select-button" id="isFever" onClick={(e) => this.onSelected(e)} style={{color: "rgb(255, 67, 124)", backgroundColor: "rgb(255, 255, 255)", borderColor: "rgb(255, 67, 124)"}}>
                                    Fever
                                </div>
                                <div className="select-button" id="isDryCough" onClick={(e) => this.onSelected(e)} style={{color: "rgb(255, 67, 124)", backgroundColor: "rgb(255, 255, 255)", borderColor: "rgb(255, 67, 124)"}}>
                                    Dry Cough
                                </div>
                                <div className="select-button" id="isDifficultyInBreathing" onClick={(e) => this.onSelected(e)} style={{color: "rgb(255, 67, 124)", backgroundColor: "rgb(255, 255, 255)", borderColor: "rgb(255, 67, 124)"}}>
                                    Difficulty in Breathing
                                </div>
                                <div className="select-button" id="isSoreThroat" onClick={(e) => this.onSelected(e)} style={{color: "rgb(255, 67, 124)", backgroundColor: "rgb(255, 255, 255)", borderColor: "rgb(255, 67, 124)"}}>
                                    Sore Throat
                                </div>
                                <div className="select-button" id="isFatigue" onClick={(e) => this.onSelected(e)} style={{color: "rgb(255, 67, 124)", backgroundColor: "rgb(255, 255, 255)", borderColor: "rgb(255, 67, 124)"}}>
                                    Fatigue
                                </div>
                                <div className="select-button" id="isBodyAche" onClick={(e) => this.onSelected(e)} style={{color: "rgb(255, 67, 124)", backgroundColor: "rgb(255, 255, 255)", borderColor: "rgb(255, 67, 124)"}}>
                                    Body Ache
                                </div>
                                <div className="select-button" id="isLossOfTasteOrSmell" onClick={(e) => this.onSelected(e)} style={{color: "rgb(255, 67, 124)", backgroundColor: "rgb(255, 255, 255)", borderColor: "rgb(255, 67, 124)"}}>
                                    Loss of Taste or Smell
                                </div>
                                <div className="select-button" id="isDiarrhoea" onClick={(e) => this.onSelected(e)} style={{color: "rgb(255, 67, 124)", backgroundColor: "rgb(255, 255, 255)", borderColor: "rgb(255, 67, 124)"}}>
                                    Diarrhoea
                                </div>
                                <div className="select-button" id="isRunnyNose" onClick={(e) => this.onSelected(e)} style={{color: "rgb(255, 67, 124)", backgroundColor: "rgb(255, 255, 255)", borderColor: "rgb(255, 67, 124)"}}>
                                    Runny Nose
                                </div>
                        </div>
                        </div>
                        <div className="vital-risk-assessment">
                            <div className="input-label-up color-p" style={{display: 'block'  }}>
                                <label>Body Temperature</label>
                                <input className="form-control" placeholder="Enter Temperature in Degree Celsius"
                                       type="text"  onChange={this.onTextInputChange} name="temperature"/>
                            </div>

                            <div className="input-label-up color-p" style={{display: 'none'  }}>
                                <label>Heart Rate</label>
                                <input className="form-control" placeholder="Enter heart rate per minute"
                                       type="text"  onChange={this.onTextInputChange} name="heartRate"/>
                            </div>
                            <div className="input-label-up color-p" style={{display: 'none'  }}>
                                <label>Respiration Rate</label>
                                <input className="form-control" placeholder="Enter Respiration rate per minute"
                                       type="text"  onChange={this.onTextInputChange} name="respirationRate"/>
                            </div>

                            <div className="input-label-up color-p" style={{display: 'none'  }}>
                                <label>Blood pressure</label>
                                <input className="form-control" placeholder="Systolic BP eg.120"
                                       type="text"  onChange={this.onTextInputChange} name="systolicBP"/>
                            </div>
                            <div className="d-flex mt-3"><strong>Vitals</strong></div>
                            <div className="d-flex mt-3">
                            <div className="select-button" id="isOxygen" onClick={(e) => this.onSelected(e)} style={{color: "rgb(255, 67, 124)", backgroundColor: "rgb(255, 255, 255)", borderColor: "rgb(255, 67, 124)"}}>
                                    On Oxygen
                                </div>
                            <div className="select-button" id="isConscious" onClick={(e) => this.onSelected(e)} style={{color: "rgb(255, 67, 124)", backgroundColor: "rgb(255, 255, 255)", borderColor: "rgb(255, 67, 124)"}}>
                                    Conscious
                                </div>
                            </div>
                            
                            {/*TODO Fix this , using modified news2 for covid*/}
                            {/*<div className="input-label-up color-p">*/}
                            {/*    <label>s</label>*/}
                            {/*    <input className="form-control" placeholder="120/80"*/}
                            {/*           type="text"  onChange={this.onTextInputChange} name="spo2_scale1"/>*/}
                            {/*</div>*/}
                            {/*<div className="input-label-up color-p">*/}
                            {/*    <label>Blood pressure</label>*/}
                            {/*    <input className="form-control" placeholder="120/80"*/}
                            {/*           type="text"  onChange={this.onTextInputChange} name="spo2_scale2"/>*/}
                            {/*</div>*/}
                        </div>
                        <div className="mt-4">
                            <div><strong>RT-PCR Conducted</strong></div>
                            <div className="d-flex mt-4">
                                <label className="radio-btn">Yes
                                    <input type="radio" name="isRtPcrConducted" value={true} onChange={this.onRtPcrConductedChange}/>
                                        <span className="checkmark"></span>
                                </label>
                                <label className="radio-btn ml-3">No
                                    <input type="radio" name="isRtPcrConducted" value={false} onChange={this.onRtPcrConductedChange} />
                                        <span className="checkmark"></span>
                                </label>
                            </div>
                        </div>

                        {this.state && this.state.isRtPcrConducted && this.state.isRtPcrConducted == 'true' ?
                        <div className="mt-4">
                            <div><strong>RT-PCR Test result</strong></div>
                            <div className="d-flex mt-4">
                                <label className="radio-btn">Positive
                                    <input type="radio" name="isRtPcrResultPositive" value={true} onChange={this.onRadioInputChange}/>
                                        <span className="checkmark"></span>
                                </label>
                                <label className="radio-btn ml-3">Negative
                                    <input type="radio" name="isRtPcrResultPositive" value={false} onChange={this.onRadioInputChange}/>
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