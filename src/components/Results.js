import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { clearResults, logout } from '../actions';
import Preview from './Preview';
import LungConditions from './LungConditions';
import CTResults from './CTResults';
import HeaderLoggedIn from "../components/HeaderLoggedIn";
import '../styles/App.css';
import { setCookie } from '../util/cookies';

class Results extends Component {

    backToPatientInfo = e => {
        e.preventDefault();
        this.props.clearResults();
        this.props.history.push('patientInfoForm');
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
        this.props.history.push('/patientInfoForm');
    }

    render() {
        var covid_diagnosis = this.props.covid_diagnosis;
        var covid_val = 'undetermined';
        if (covid_diagnosis && covid_diagnosis.includes("Test")) {
            covid_val = 'undetermined';
        }
        if (covid_diagnosis && covid_diagnosis.includes("Positive")) {
            covid_val = 'positive';
        }
        if (covid_diagnosis && covid_diagnosis.includes("Negative")) {
            covid_val = 'negative';
        }
        return (
            <div>
        <HeaderLoggedIn history={this.props.history}></HeaderLoggedIn>
      <div className="row">
        <button className="upload-btn btn-primary text-white back-button" onClick={this.backToPatientInfo}>Back</button>
      </div>  
      <div className="row container results">
        <div class="col-md-12">
        { (this.props.covid_diagnosis && !this.props.loading)?
          <div className="col-lg-12 col-md-12 ">
              <h1>Results for patient #4210</h1>
              <p className="result-warning">System Generated Results not to be consumed without the supervision of Registered
                  Physician</p>
          </div> : null }

      { this.props.model_type == 'xray' ?
        <div className="row">
          <div className="col-md-4">
            <h4 className="w-100 d-block text-center mt-3 mb-3">Input XRay image</h4>
            <Preview file={this.props.xray_image} />
          </div>
          { this.props.annotated_img_url ?
              <div className="col-md-4">
                <h4 className="w-100 d-block text-center mt-3 mb-3">Annotated XRay image</h4>
                <img src={this.props.annotated_img_url} alt={'annotated_img_url'} className="img-thumbnail" /> 
            </div>
            : null }
          { this.props.lung_conditions ?
              <div className="col-md-4">
                <h4 className="w-100 d-block text-center mt-3 mb-3">Disease predictions</h4>
                <LungConditions data={this.props.lung_conditions} />
            </div>
            : null }
        </div> : null }

        { this.props.model_type == 'ct' ?
        <div className="row">
          <div className="col-md-4">
            <h4>Input CT scan</h4>
            <Preview file={this.props.ct_scan_image} />
          </div>
          { this.props.annotated_img_url ?
              <div className="col-md-4">
                <h4>Annotated CT scan</h4>
                <img src={this.props.annotated_img_url} alt={'annotated_img_url'} className="img-thumbnail" /> 
            </div>
            : null }
          { this.props.ct_results ?
              <div className="col-md-4">
                <h4>CT Results</h4>
                <CTResults data={this.props.ct_results} />
            </div>
            : null }
        </div> : null }

        <div className="row mt-4">
                    {this.props.patientInfo ? <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12 d-flex flex-column">
                        <strong className="mt-2">Patient #4210</strong>
                        <strong
                            className="mt-2">{this.props.patientInfo.first_name + ' ' + this.props.patientInfo.last_name}</strong>
                        <strong className="mt-2">{this.props.patientInfo.age} M</strong>
                        <strong className="mt-2">{this.props.patientInfo.temperature} deg Celsius</strong>
                        <strong className="mt-2">Sneezing <span
                            className="text-blue"> {this.props.patientInfo.isSneezing} </span> </strong>
                        <strong className="mt-2">Breathing issues <span
                            className="text-pink">{this.props.patientInfo.isDifficultyInBreathing}</span></strong>
                        <strong className="mt-2">Dry Cough <span
                            className="text-pink">{this.props.patientInfo.isDryCough}</span></strong>
                        <strong className="mt-2">RT/PCR status <span
                            className="text-pink">{this.props.patientInfo.isRtPcrConducted}</span></strong>
                    </div> : null }
                    <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
                        <strong>Diagnosis</strong>
                        <h1 className="mt-5">COVID-19</h1>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
                        <label className="radio-btn ml-3 text-pink mt-5" style={{fontSize: '34px', fontWeight: '700'}}>POSITIVE
                            <input type="radio" name="covid-diagnosis" value="positive" checked={covid_val=='positive'? true:false}/>
                            <span className="checkmark" style={{marginTop: '14px'}}></span>
                        </label>
                        <label className="radio-btn ml-3 text-blue" style={{fontSize: '34px', fontWeight: '700'}}>NEGATIVE
                            <input type="radio" name="covid-diagnosis" value="negative" checked={covid_val=='negative'? true:false}/>
                            <span className="checkmark" style={{marginTop: '14px'}}></span>
                        </label>
                        <label className="radio-btn ml-3 text-yellow" style={{fontSize: '34px', fontWeight: '700'}}>UNDETERMINED
                            <input type="radio" name="covid-diagnosis" value="undetermined" checked={covid_val=='undetermined'? true:false}/>
                            <span className="checkmark" style={{marginTop: '14px'}}></span>
                        </label>
                    </div>
                </div>

          <div className="row justify-content-center">
            <div className="col-xl-7 col-lg-7 col-md-7 col-xs-12 col-sm-12">
                <div className="input-label-up color-p">
                    <label>Investigation Summary</label>
                    <textarea className="form-control" placeholder="Type here to add relevant details"
                              type="text"></textarea>
                </div>
                <div className="input-label-up color-p mt-5">
                    <label>Action Taken</label>
                    <textarea className="form-control" placeholder="Type here to add relevant details"
                              type="text"></textarea>
                </div>
                <div className="d-flex mt-3">
                    <strong>Send for PCR</strong>
                    <label className="radio-btn ml-3">yes
                        <input type="radio" name="radio"/>
                        <span className="checkmark"></span>
                    </label>
                    <label className="radio-btn ml-3">No
                        <input type="radio" name="radio"/>
                        <span className="checkmark"></span>
                    </label>
                </div>
                <div className="d-flex mt-3">
                    <strong>Quarantine</strong>
                    <label className="radio-btn ml-3">yes
                        <input type="radio" name="radio"/>
                        <span className="checkmark"></span>
                    </label>
                    <label className="radio-btn ml-3">No
                        <input type="radio" name="radio"/>
                        <span className="checkmark"></span>
                    </label>
                </div>
                <div className="d-flex mt-3">
                    <strong>Contact Tracing</strong>
                    <label className="radio-btn ml-3">yes
                        <input type="radio" name="radio"/>
                        <span className="checkmark"></span>
                    </label>
                    <label className="radio-btn ml-3">No
                        <input type="radio" name="radio"/>
                        <span className="checkmark"></span>
                    </label>
                </div>
                <div className="mt-5 text-center">
                    <button className="btn btn-secondary"
                            style={{paddingLeft: '50px', paddingRight: '50px',marginRight: '10px'}}>View Report</button>
                    <button className="btn btn-secondary"
                            style={{paddingLeft: '50px', paddingRight: '50px',marginRight: '10px'}}>Submit
                    </button>
                    <button className="btn btn-secondary"
                            style={{paddingLeft: '50px', paddingRight: '50px',marginRight: '10px'}}
                            onClick={this.nextPatient}>Next Patient</button>
                </div>
            </div>
        </div>

        </div>
      </div>
      </div>
        );
    }
}
Results.propTypes = {
    xray_image: PropTypes.object,
    ct_scan_image: PropTypes.object,
    lung_conditions: PropTypes.object,
    aws_s3_image_url: PropTypes.string,
    msg: PropTypes.string,
    type: PropTypes.string,
    covid_diagnosis: PropTypes.string,
    ct_results: PropTypes.string,
    loading: PropTypes.bool
}

const mapStateToProps = ({ xray_image, aws_s3_image_url, msg, type, covid_diagnosis, annotated_img_url, loading, lung_conditions, ct_scan_image, model_type, ct_results, patientInfo }) => ({ xray_image, aws_s3_image_url, msg, type, covid_diagnosis, annotated_img_url, loading, lung_conditions, ct_scan_image, model_type, ct_results, patientInfo });
const mapDispatchToProps = dispatch => bindActionCreators({ clearResults, logout }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Results)