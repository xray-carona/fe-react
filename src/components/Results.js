import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { clearResults, logout} from '../actions';
import Preview from './Preview';
import LungConditions from './LungConditions';
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

  render() {
    return (
      <div>
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
      <div className="row">
        <button className="upload-btn btn-primary text-white back-button" onClick={this.backToPatientInfo}>Back</button>
      </div>  
      <div className="row container results">
        <div class="col-md-12">
        { (this.props.covid_diagnosis && !this.props.loading)?
          <div className="col-lg-12 col-md-12 ">
              <div className={`alert ${this.props.type} alert-dismissible mt-3`}>
                <h4>{this.props.covid_diagnosis}</h4>
            </div>
          </div> : null }

      { this.props.model_type == 'xray' ?
        <div className="row">
          <div className="col-md-4">
            <h2>Input XRay image</h2>
            <Preview file={this.props.xray_image} />
          </div>
          { this.props.annotated_img_url ?
              <div className="col-md-4">
                <img src={this.props.annotated_img_url} alt={'annotated_img_url'} className="img-thumbnail" /> 
            </div>
            : null }
          { this.props.lung_conditions ?
              <div className="col-md-4">
                <h2>Disease predictions</h2>
                <LungConditions data={this.props.lung_conditions} />
            </div>
            : null }
        </div> : null }

        { this.props.model_type == 'ct' ?
        <div className="row">
          <div className="col-md-4">
            <h2>Input CT scan</h2>
            <Preview file={this.props.ct_scan_image} />
          </div>
          { this.props.annotated_img_url ?
              <div className="col-md-4">
                <h2>Annotated CT scan</h2>
                <img src={this.props.annotated_img_url} alt={'annotated_img_url'} className="img-thumbnail" /> 
            </div>
            : null }
          { this.props.lung_conditions ?
              <div className="col-md-4">
                <h2>Disease predictions</h2>
                <LungConditions data={this.props.lung_conditions} />
            </div>
            : null }
        </div> : null }

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
    covid_diagnosis : PropTypes.string,
    annotated_img_url: PropTypes.string,
    loading: PropTypes.bool
}

const mapStateToProps = ({xray_image, aws_s3_image_url,msg,type, covid_diagnosis, annotated_img_url, loading, lung_conditions, ct_scan_image, model_type}) => ({xray_image, aws_s3_image_url,msg,type, covid_diagnosis, annotated_img_url, loading, lung_conditions, ct_scan_image, model_type});
const mapDispatchToProps = dispatch => bindActionCreators( {clearResults, logout}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Results)