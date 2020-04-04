import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setXrayImage, uploadImage, response , getMLResponse, setLoading} from '../actions';
import PatientInfoForm from './PatientInfoForm';
import '../styles/App.css';

class App extends Component {

  render() {
    return (
      <div className="row container">
        <div className="col-md-12">
            <div className="page-header navbar-brand">
              <h1>
                 Xray Corona&nbsp;
              </h1>
            </div>
        </div>
        <PatientInfoForm/>
      </div>
    );
  }
}

const mapStateToProps = ({xray_image, aws_s3_image_url,msg,type, covid_diagnosis, annotated_img_url, loading}) => ({xray_image, aws_s3_image_url,msg,type, covid_diagnosis, annotated_img_url, loading});
const mapDispatchToProps = dispatch => bindActionCreators( { setXrayImage, uploadImage, response, getMLResponse, setLoading }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(App)
