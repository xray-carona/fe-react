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
                            <div className="mt-4">
                                <div><strong>Diabetes</strong></div>
                                <div className="d-flex mt-4">
                                    <label className="radio-btn">Yes
                                        <input type="radio" name="isDiabetes" value={true} onChange={this.onRadioInputChange}/>
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="radio-btn ml-3">No
                                        <input type="radio" name="isDiabetes" value={false} onChange={this.onRadioInputChange}/>
                                        <span className="checkmark"></span>
                                    </label>

                                </div>
                            </div>
                            <div className="mt-4">
                                <div><strong>Hypertension</strong></div>
                                <div className="d-flex mt-4">
                                    <label className="radio-btn">Yes
                                        <input type="radio" name="isHypertension" value={true} onChange={this.onRadioInputChange}/>
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="radio-btn ml-3">No
                                        <input type="radio" name="isHypertension" value={false} onChange={this.onRadioInputChange}/>
                                        <span className="checkmark"></span>
                                    </label>

                                </div>
                            </div>

                            <div className="mt-4">
                                <div><strong>Cardio Vascular Disease</strong></div>
                                <div className="d-flex mt-4">
                                    <label className="radio-btn">Yes
                                        <input type="radio" name="isCardiacDisease" value={true} onChange={this.onRadioInputChange}/>
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="radio-btn ml-3">No
                                        <input type="radio" name="isCardiacDisease" value={false} onChange={this.onRadioInputChange}/>
                                        <span className="checkmark"></span>
                                    </label>

                                </div>
                            </div>
                            <div className="mt-4">
                                <div><strong>Immunosupression</strong></div>
                                <div className="d-flex mt-4">
                                    <label className="radio-btn">Yes
                                        <input type="radio" name="isImmunosupression" value={true} onChange={this.onRadioInputChange}/>
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="radio-btn ml-3">No
                                        <input type="radio" name="isImmunosupression" value={false} onChange={this.onRadioInputChange}/>
                                        <span className="checkmark"></span>
                                    </label>

                                </div>
                            </div>
                            <div className="mt-4">
                                <div><strong>Travel History from Affected Area (Delhi, Mumbai,Abroad)</strong></div>
                                <div className="d-flex mt-4">
                                    <label className="radio-btn">Yes
                                        <input type="radio" name="isTravelHistory" value={true} onChange={this.onRadioInputChange}/>
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="radio-btn ml-3">No
                                        <input type="radio" name="isTravelHistory" value={false} onChange={this.onRadioInputChange}/>
                                        <span className="checkmark"></span>
                                    </label>

                                </div>
                            </div>

                            <div className="mt-4">
                                <div><strong>Address in containment zone</strong></div>
                                <div className="d-flex mt-4">
                                    <label className="radio-btn">Yes
                                        <input type="radio" name="isAddressZone" value={true} onChange={this.onRadioInputChange}/>
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="radio-btn ml-3">No
                                        <input type="radio" name="isAddressZone" value={false} onChange={this.onRadioInputChange}/>
                                        <span className="checkmark"></span>
                                    </label>

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
                        <div className="symptom_risk_assessment">
                            <div className="mt-4">
                                <div><strong>Fever</strong></div>
                                <div className="d-flex mt-4">
                                    <label className="radio-btn">Yes
                                        <input type="radio" name="isFever" value={true} onChange={this.onRadioInputChange}/>
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="radio-btn ml-3">No
                                        <input type="radio" name="isFever" value={false} onChange={this.onRadioInputChange}/>
                                        <span className="checkmark"></span>
                                    </label>

                                </div>
                            </div>


                            <div className="mt-4">
                                <div><strong>Dry Cough</strong></div>
                                <div className="d-flex mt-4">
                                    <label className="radio-btn">Yes
                                        <input type="radio" name="isDryCough" value={true} onChange={this.onRadioInputChange}/>
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="radio-btn ml-3">No
                                        <input type="radio" name="isDryCough" value={false} onChange={this.onRadioInputChange}/>
                                        <span className="checkmark"></span>
                                    </label>

                                </div>
                            </div>

                            <div className="mt-4">
                                <div><strong>Difficulty in Breathing</strong></div>
                                <div className="d-flex mt-4">
                                    <label className="radio-btn">Yes
                                        <input type="radio" name="isDifficultyInBreathing" value={true} onChange={this.onRadioInputChange}/>
                                            <span className="checkmark"></span>
                                    </label>
                                    <label className="radio-btn ml-3">No
                                        <input type="radio" name="isDifficultyInBreathing" value={false} onChange={this.onRadioInputChange}/>
                                            <span className="checkmark"></span>
                                    </label>

                                </div>
                            </div>

                            <div className="mt-4">
                                <div><strong>Sore Throat</strong></div>
                                <div className="d-flex mt-4">
                                    <label className="radio-btn">Yes
                                        <input type="radio" name="isSoreThroat" value={true} onChange={this.onRadioInputChange}/>
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="radio-btn ml-3">No
                                        <input type="radio" name="isSoreThroat" value={false} onChange={this.onRadioInputChange}/>
                                        <span className="checkmark"></span>
                                    </label>

                                </div>
                            </div>

                            <div className="mt-4">
                                <div><strong>Fatigue</strong></div>
                                <div className="d-flex mt-4">
                                    <label className="radio-btn">Yes
                                        <input type="radio" name="isFatigue" value={true} onChange={this.onRadioInputChange}/>
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="radio-btn ml-3">No
                                        <input type="radio" name="isFatigue" value={false} onChange={this.onRadioInputChange}/>
                                        <span className="checkmark"></span>
                                    </label>

                                </div>
                            </div>

                            <div className="mt-4">
                                <div><strong>Body Ache</strong></div>
                                <div className="d-flex mt-4">
                                    <label className="radio-btn">Yes
                                        <input type="radio" name="isBodyAche" value={true} onChange={this.onRadioInputChange}/>
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="radio-btn ml-3">No
                                        <input type="radio" name="isBodyAche" value={false} onChange={this.onRadioInputChange}/>
                                        <span className="checkmark"></span>
                                    </label>

                                </div>
                            </div>

                            <div className="mt-4">
                                <div><strong>Loss of Taste or Smell</strong></div>
                                <div className="d-flex mt-4">
                                    <label className="radio-btn">Yes
                                        <input type="radio" name="isLossOfTasteOrSmell" value={true} onChange={this.onRadioInputChange}/>
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="radio-btn ml-3">No
                                        <input type="radio" name="isLossOfTasteOrSmell" value={false} onChange={this.onRadioInputChange}/>
                                        <span className="checkmark"></span>
                                    </label>

                                </div>
                            </div>

                            <div className="mt-4">
                                <div><strong>Diarrhoea</strong></div>
                                <div className="d-flex mt-4">
                                    <label className="radio-btn">Yes
                                        <input type="radio" name="isDiarrhoea" value={true} onChange={this.onRadioInputChange}/>
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="radio-btn ml-3">No
                                        <input type="radio" name="isDiarrhoea" value={false} onChange={this.onRadioInputChange}/>
                                        <span className="checkmark"></span>
                                    </label>

                                </div>
                            </div>

                            <div className="mt-4">
                                <div><strong>Runny Nose</strong></div>
                                <div className="d-flex mt-4">
                                    <label className="radio-btn">Yes
                                        <input type="radio" name="isRunnyNose" value={true} onChange={this.onRadioInputChange}/>
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="radio-btn ml-3">No
                                        <input type="radio" name="isRunnyNose" value={false} onChange={this.onRadioInputChange}/>
                                        <span className="checkmark"></span>
                                    </label>

                                </div>
                            </div>
                        </div>
                        <div className="vital-risk-assessment">
                            <div className="input-label-up color-p" style={{display: 'none'  }}>
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
                            <div className="mt-4">
                                <div><strong>On Oxygen</strong></div>
                                <div className="d-flex mt-4">
                                    <label className="radio-btn">Yes
                                        <input type="radio" name="isOxygen" value={true} onChange={this.onRadioInputChange}/>
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="radio-btn ml-3">No
                                        <input type="radio" name="isOxygen" value={false} onChange={this.onRadioInputChange} />
                                        <span className="checkmark"></span>
                                    </label>
                                </div>
                            </div>
                            <div className="mt-4">
                                <div><strong>Conscious</strong></div>
                                <div className="d-flex mt-4">
                                    <label className="radio-btn">Yes
                                        <input type="radio" name="isConscious" value={true} onChange={this.onRadioInputChange}/>
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="radio-btn ml-3">No
                                        <input type="radio" name="isConscious" value={false} onChange={this.onRadioInputChange} />
                                        <span className="checkmark"></span>
                                    </label>
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