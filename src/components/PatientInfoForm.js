import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setXrayImage, setCTScanImage, uploadImage, response , getMLResponse, setLoading, logout} from '../actions';
import Preview from './Preview';
import LungConditions from './LungConditions';
import { setCookie } from '../util/cookies';
import '../styles/App.css';

class PatientInfoForm extends Component {

  componentDidMount(){
    this.props.response('','');
  }

  Upload_To_AWS_S3_and_Run_ML_Model = e => {
    e.preventDefault();
    this.props.setLoading(true);
    let patientInfo = {};
    for (let field in this.refs) {
      patientInfo[field] = this.refs[field].value;
    }

    patientInfo['gender'] = document.querySelector('input[name="gender"]:checked') ?
        document.querySelector('input[name="gender"]:checked').value
        : 'not_selected';
    patientInfo['isSneezing'] = document.querySelector('input[name="isSneezing"]:checked') ?
        document.querySelector('input[name="isSneezing"]:checked').value
        : 'not_selected';
    patientInfo['isDifficultyInBreathing'] = document.querySelector('input[name="isDifficultyInBreathing"]:checked') ?
        document.querySelector('input[name="isDifficultyInBreathing"]:checked').value
        : 'not_selected';
    patientInfo['isDryCough'] = document.querySelector('input[name="isDryCough"]:checked') ?
        document.querySelector('input[name="isDryCough"]:checked').value
        : 'not_selected';
    patientInfo['isRtPcrConducted'] = document.querySelector('input[name="isRtPcrConducted"]:checked') ?
        document.querySelector('input[name="isRtPcrConducted"]:checked').value
        : 'not_selected';

    let formImageData = new FormData();
    if(this.props.model_type == 'xray') {
      formImageData.append("photo", this.props.xray_image);
      this.props.uploadImage(formImageData, patientInfo, 'xray');
    }else if(this.props.model_type == 'ct') {
      formImageData.append("photo", this.props.ct_scan_image);
      this.props.uploadImage(formImageData, patientInfo, 'ct');
    }
  }
  logout = e => {
    e.preventDefault();
    this.props.logout();
    setCookie('token', '');
    this.props.history.push('login');
  }

  componentDidUpdate(prevProps) {
    if( prevProps.aws_s3_image_url !== this.props.aws_s3_image_url ) {
        this.props.setLoading(false);
        this.props.history.push('results');
    }
  }

  closeAlert = e => {
    e.preventDefault();
    this.props.response('','');
  }

  render() {
    return (
      <section className="patient-info-form form-group pb-5 pt-5">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/patientInfoForm"}><div className="text-white">New Patient</div></Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to='/patientInfoForm'><div className="text-white">Home</div></Link>
                </li>
                <li className="nav-item">
                  <button className="btn-secondary" onClick= { e => this.logout(e)} style={{marginTop:'10%'}}><div className="text-white">Logout</div></button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
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
                                    <input type="radio" name="isDryCough" value="yes"/>
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
                                    <input type="radio" name="isRtPcrConducted" value="yes"/>
                                        <span className="checkmark"></span>
                                </label>
                                <label className="radio-btn ml-3">No
                                    <input type="radio" name="isRtPcrConducted" value="no"/>
                                        <span className="checkmark"></span>
                                </label>

                            </div>
                        </div>

                        <div className="d-flex align-items-center mt-4">
                            <div className="upload-btn-wrapper mb-2">
                              <button className="upload-btn bg-primary">Upload X-Ray</button>
                              <input name="image" type="file" onChange={ e => {
                                this.props.setXrayImage(e.currentTarget.files[0] )
                              }} />
                            </div>
                            <p className="text-muted ml-3"></p>
                        </div>
                        <div className="col-md-4">
                          <Preview file={this.props.xray_image} />
                        </div>
                        <div className="mt-4">
                            <div className="upload-btn-wrapper mb-2">
                              <button className="upload-btn bg-primary">Upload CT-Scan</button>
                              <input name="image" type="file" onChange={ e => {
                                this.props.setCTScanImage(e.currentTarget.files[0] )
                              }} />
                            </div>
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
    covid_diagnosis : PropTypes.string,
    annotated_img_url: PropTypes.string,
    loading: PropTypes.bool
}

const mapStateToProps = ({xray_image, aws_s3_image_url,msg,type, covid_diagnosis, annotated_img_url, loading, lung_conditions, ct_scan_image, model_type}) => ({xray_image, aws_s3_image_url,msg,type, covid_diagnosis, annotated_img_url, loading, lung_conditions, ct_scan_image, model_type});
const mapDispatchToProps = dispatch => bindActionCreators( { setXrayImage, uploadImage, response, getMLResponse, setLoading, logout, setCTScanImage }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(PatientInfoForm)