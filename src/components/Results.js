import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Preview from './Preview';
import '../styles/App.css';
import {setCookie} from '../util/cookies';
import downloadIcon from '../assets/img/downo.png';
import LungConditions from "./LungConditions";
import {clearResults, logout} from "../actions";
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

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

    render() {
        console.log(this.props);
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                    <div className="container">
                        <Link className="navbar-brand" to={"/patientInfoForm"}>
                            <div className="text-white">New Patient</div>
                        </Link>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to='/patientInfoForm'>
                                        <div className="text-white">Home</div>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <button className="btn-secondary" onClick={e => this.logout(e)}
                                            style={{marginTop: '10%'}}>
                                        <div className="text-white">Logout</div>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="row">
                    <button className="upload-btn btn-primary text-white back-button"
                            onClick={this.backToPatientInfo}>Back
                    </button>
                </div>
                <div className="row">
                    {(this.props.covid_diagnosis && !this.props.loading) ?
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <h5>Test #420</h5>
                            <p>System Generated Results not to be consumed without the supervision of Registered
                                Physician</p>
                        </div> : null}
                    <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 d-flex flex-column">
                        <h5 className="w-100 d-block text-center mt-3 mb-3">Input Image</h5>
                        {this.props.model_type === 'xray' ? <Preview file={this.props.xray_image}/> :
                            this.props.model_type === 'ct' ? <Preview file={this.props.ct_scan_image}/> : null}
                    </div>
                    {this.props.annotated_img_url !== '' ?
                        <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 d-flex flex-column">
                            <h5 className="w-100 d-block text-center mt-3 mb-3">Annotated Image</h5>
                            <div>
                                <img alt="annotated" className="w-100" src={this.props.annotated_img_url}/>
                            </div>
                            <div className="text-center">
                                <button className="btn btn-link">
                                    <img alt="download" style={{height: '30px'}} src={downloadIcon}/>
                                </button>
                            </div>
                        </div>
                        : null}
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <LungConditions data={this.props.lung_conditions}/>
                    </div>
                </div>
                <div className="row mt-4">
                    {this.props.patientInfo ? <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12 d-flex flex-column">
                        <strong className="mt-2">Patient #69</strong>
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
                    </div> : null }
                    <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
                        <strong>Diagnosis</strong>
                        <h1 className="mt-5">COVID-19</h1>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12">
                        <label className="radio-btn ml-3 text-pink mt-5" style={{fontSize: '34px', fontWeight: '700'}}>POSITIVE
                            <input type="radio" name="radio"/>
                            <span className="checkmark" style={{marginTop: '14px'}}></span>
                        </label>
                        <label className="radio-btn ml-3 text-blue" style={{fontSize: '34px', fontWeight: '700'}}>NEGATIVE
                            <input type="radio" name="radio"/>
                            <span className="checkmark" style={{marginTop: '14px'}}></span>
                        </label>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12 d-flex flex-column">
                        <button className="btn btn-secondary mt-3">View Report</button>
                        <button className="btn btn-secondary mt-3">Print Report</button>
                        <button className="btn btn-secondary mt-3">Share Report</button>
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
                            <strong>Sent for PCR</strong>
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
                            <strong>Quarantime</strong>
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
                                    style={{paddingLeft: '50px', paddingRight: '50px'}}>Next
                                Patient
                            </button>
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
    patientInfo: PropTypes.object,
    aws_s3_image_url: PropTypes.string,
    msg: PropTypes.string,
    type: PropTypes.string,
    covid_diagnosis: PropTypes.string,
    annotated_img_url: PropTypes.string,
    loading: PropTypes.bool
}

const mapStateToProps = ({xray_image, aws_s3_image_url, msg, type, covid_diagnosis, patientInfo,annotated_img_url, loading, lung_conditions, ct_scan_image, model_type}) => ({
    xray_image,
    aws_s3_image_url,
    msg,
    type,
    covid_diagnosis,
    annotated_img_url,
    loading,
    lung_conditions,
    ct_scan_image,
    model_type,
    patientInfo
});
const mapDispatchToProps = dispatch => {
    console.log(dispatch);
    return bindActionCreators({clearResults, logout}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(Results)
