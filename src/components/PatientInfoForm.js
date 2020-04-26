import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setXrayImage, setCTScanImage, uploadImage, response, getMLResponse, setLoading, logout, setPatientInfo } from '../actions';
import Preview from './Preview';
import LungConditions from './LungConditions';
import HeaderLoggedIn from "../components/HeaderLoggedIn";
import { setCookie } from '../util/cookies';
import '../styles/App.css';

import { initializeReactGA } from '../container/App';

class PatientInfoForm extends Component {

    componentDidMount() {
        initializeReactGA();
        this.props.response('', '');
    }

    onRtPcrConductedChange = (e) => {
        this.setState({
            isRtPcrConducted: e.currentTarget.value
        });
    }

    Upload_To_AWS_S3_and_Run_ML_Model = e => {
        e.preventDefault();
        this.props.setLoading(true);
        let patientInfo = {};
        for (let field in this.refs) {
            patientInfo[field] = this.refs[field].value;
        }

        patientInfo['gender'] = document.querySelector('input[name="gender"]:checked') ?
            document.querySelector('input[name="gender"]:checked').value :
            'not_selected';
        patientInfo['isSneezing'] = document.querySelector('input[name="isSneezing"]:checked') ?
            document.querySelector('input[name="isSneezing"]:checked').value :
            'not_selected';
        patientInfo['isDifficultyInBreathing'] = document.querySelector('input[name="isDifficultyInBreathing"]:checked') ?
            document.querySelector('input[name="isDifficultyInBreathing"]:checked').value :
            'not_selected';
        patientInfo['isDryCough'] = document.querySelector('input[name="isDryCough"]:checked') ?
            document.querySelector('input[name="isDryCough"]:checked').value :
            'not_selected';
        patientInfo['isRtPcrConducted'] =
            document.querySelector('input[name="isRtPcrConducted"]:checked') ?
            document.querySelector('input[name="isRtPcrConducted"]:checked').value == 'yes' ?
            document.querySelector('input[name="isRtPcrResultPositive"]:checked') ?
            document.querySelector('input[name="isRtPcrResultPositive"]:checked').value == 'yes' ?
            'positive' :
            'negative' :
            'none' // TODO: Make 'isRtPcrResultPositive' field mandatory
            :
            'none' :
            'none'; // TODO: Make 'isRtPcrConducted' field mandatory

        let formImageData = new FormData();
        if (this.props.model_type == 'xray') {
            formImageData.append("photo", this.props.xray_image);
            this.props.uploadImage(formImageData, patientInfo, 'xray');
        } else if (this.props.model_type == 'ct') {
            formImageData.append("photo", this.props.ct_scan_image);
            this.props.uploadImage(formImageData, patientInfo, 'ct');
        }
        this.props.setPatientInfo(patientInfo);
    }
    logout = e => {
        e.preventDefault();
        this.props.logout();
        setCookie('token', '');
        this.props.history.push('login');
    }

    componentDidUpdate(prevProps) {
        if (prevProps.aws_s3_image_url !== this.props.aws_s3_image_url) {
            this.props.setLoading(false);
            this.props.history.push('results');
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
                            <input ref="first_name" className="form-control" type="text"/>
                        </div>
                        <div className="input-label-up color-p">
                            <label>Second Name</label>
                            <input ref="last_name" className="form-control" type="text"/>
                        </div>
                        <div className="input-label-up color-p">
                            <label>Age</label>
                            <input className="form-control" ref="age" placeholder="Enter Age in Numbers" type="text"/>
                        </div>
                        <div>
                            <div><strong>Gender</strong></div>
                            <div className="d-flex mt-3">
                                <label className="radio-btn">Male
                                    <input type="radio" name="gender" value="male"/>
                                        <span className="checkmark"></span>
                                </label>
                                <label className="radio-btn ml-3">Female
                                    <input type="radio" name="gender" value="female"/>
                                        <span className="checkmark"></span>
                                </label>
                                <label className="radio-btn ml-3">Other
                                    <input type="radio" name="gender" value="other"/>
                                        <span className="checkmark"></span>
                                </label>
                            </div>
                        </div>
                        <div className="input-label-up color-p">
                            <label>Body Temperature</label>
                            <input className="form-control" placeholder="Enter Temperature in Degree Celsius"
                                   type="text" ref="temperature"/>
                        </div>

                        <div className="input-label-up color-p">
                            <label>Heart Rate</label>
                            <input className="form-control" placeholder="Enter heart rate"
                                   type="text" ref="heart_rate"/>
                        </div>

                        <div className="input-label-up color-p">
                            <label>Blood pressure</label>
                            <input className="form-control" placeholder="120/80"
                                   type="text" ref="bp"/>
                        </div>

                        <div className="mt-4">
                            <div><strong>Sneezing</strong></div>
                            <div className="d-flex mt-4">
                                <label className="radio-btn">Yes
                                    <input type="radio" name="isSneezing" value="yes"/>
                                        <span className="checkmark"></span>
                                </label>
                                <label className="radio-btn ml-3">No
                                    <input type="radio" name="isSneezing" value="no"/>
                                        <span className="checkmark"></span>
                                </label>

                            </div>
                        </div>

                        <div className="mt-4">
                            <div><strong>Difficulty in Breathing</strong></div>
                            <div className="d-flex mt-4">
                                <label className="radio-btn">Yes
                                    <input type="radio" name="isDifficultyInBreathing" value="yes"/>
                                        <span className="checkmark"></span>
                                </label>
                                <label className="radio-btn ml-3">No
                                    <input type="radio" name="isDifficultyInBreathing" value="no"/>
                                        <span className="checkmark"></span>
                                </label>

                            </div>
                        </div>

                        <div className="mt-4">
                            <div><strong>Dry Cough</strong></div>
                            <div className="d-flex mt-4">
                                <label className="radio-btn">Yes
                                    <input type="radio" name="isDryCough" value="yes" />
                                        <span className="checkmark"></span>
                                </label>
                                <label className="radio-btn ml-3">No
                                    <input type="radio" name="isDryCough" value="no"/>
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
                                    <input type="radio" name="isRtPcrConducted" value="no" onChange={this.onRtPcrConductedChange}/>
                                        <span className="checkmark"></span>
                                </label>
                            </div>
                        </div>

                        {this.state && this.state.isRtPcrConducted && this.state.isRtPcrConducted == 'yes' ?
                        <div className="mt-4">
                            <div><strong>RT-PCR Test result</strong></div>
                            <div className="d-flex mt-4">
                                <label className="radio-btn">Positive
                                    <input type="radio" name="isRtPcrResultPositive" value="yes"/>
                                        <span className="checkmark"></span>
                                </label>
                                <label className="radio-btn ml-3">Negative
                                    <input type="radio" name="isRtPcrResultPositive" value="no"/>
                                        <span className="checkmark"></span>
                                </label>
                            </div>
                        </div>
                        : null }

                        <div className="d-flex align-items-center mt-4">
                            <div className="upload-btn-wrapper mb-2">
                              <button className="upload-btn bg-primary">Upload X-Ray</button>
                              <input name="image" type="file" onChange={ e => {
                                this.props.setXrayImage(e.currentTarget.files[0] )
                              }} />
                            </div>
                            <a href="/xray_sample.jpeg" className="inline" download>Download sample Xray</a>
                            <p className="text-muted ml-3"></p>
                        </div>
                        <div className="col-md-4">
                          <Preview file={this.props.xray_image} />
                        </div>
                        <h3>OR</h3>
                        <div className="mt-4">
                            <div className="upload-btn-wrapper mb-2">
                              <button className="upload-btn bg-primary">Upload CT-Scan</button>
                              <input name="image" type="file" onChange={ e => {
                                this.props.setCTScanImage(e.currentTarget.files[0] )
                              }} />
                            </div>
                            <a href="/ct_sample.jpeg" className="inline" download>Download sample CT scan</a>
                            <p className="text-muted ml-3"></p>
                        </div>
                        <div className="col-md-4">
                          <Preview file={this.props.ct_scan_image} />
                        </div>

                      { (this.props.xray_image || this.props.ct_scan_image) ? <div className="col-md-12">
                      <div className="mt-4 d-flex justify-content-center">
                      <button className="btn bg-warning text-dark mt-3" onClick={this.Upload_To_AWS_S3_and_Run_ML_Model} style={{
                                        paddingRight:'40px',
                                        paddingLeft: '40px'
                                    }}>
                        { this.props.loading ? 'Uploading...' : 'Evaluate' }</button>
                    </div></div> : null }

                    </div>
                </div>
            </div>
        </section>
        </div>
        );
    }
}
PatientInfoForm.propTypes = {
    xray_image: PropTypes.object,
    ct_scan_image: PropTypes.object,
    lung_conditions: PropTypes.object,
    aws_s3_image_url: PropTypes.string,
    msg: PropTypes.string,
    type: PropTypes.string,
    covid_diagnosis: PropTypes.string,
    annotated_img_url: PropTypes.string,
    loading: PropTypes.bool
}

const mapStateToProps = ({ xray_image, aws_s3_image_url, msg, type, covid_diagnosis, annotated_img_url, loading, lung_conditions, ct_scan_image, model_type }) => ({ xray_image, aws_s3_image_url, msg, type, covid_diagnosis, annotated_img_url, loading, lung_conditions, ct_scan_image, model_type });
const mapDispatchToProps = dispatch => bindActionCreators({ setXrayImage, uploadImage, response, getMLResponse, setLoading, logout, setCTScanImage, setPatientInfo }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(PatientInfoForm)