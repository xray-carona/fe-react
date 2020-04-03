import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { uploadImage, response , getMLResponse} from '../actions';
import Preview from './Preview';
import '../styles/App.css';

class App extends Component {

  state = {
    image: null,
    loading: false
  }
  
  componentDidMount(){
    this.props.response('','');
  }

  Upload_To_AWS_S3_and_Run_ML_Model = e => {
    e.preventDefault();
    this.setState({
       loading: true,
       ml_response: false
    });
    let patientInfo = {};
    for (let field in this.refs) {
      patientInfo[field] = this.refs[field].value;
    }
    let formImageData = new FormData();
    formImageData.append("photo", this.state.image);
    this.props.uploadImage(formImageData, patientInfo);
  }

  componentDidUpdate(prevProps) {
    if( prevProps.aws_s3_image_url !== this.props.aws_s3_image_url ) {
        this.setState({
            loading: false
        });
    }
  }

  closeAlert = e => {
    e.preventDefault();
    this.props.response('','');
  }

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

        <form className="form-horizontal">
          <div className="form-group">
            <label className="control-label d-inline-block col-sm-4" for="email">Name</label>
            <div className="col-sm-8 d-inline-block">
              <input type="email" ref="name" className="form-control " id="name" placeholder="Enter Name" name="name"/>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label d-inline-block col-sm-4" for="pwd">Dry Cough</label>
            <div className="col-sm-8 d-inline-block">     
              <input type="text" className="form-control" id="isDryCough" ref="isDryCough" placeholder="Does patient have dry cough" name="pwd"/>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label d-inline-block col-sm-4" for="email">Sneezing</label>
            <div className="col-sm-8 d-inline-block">
              <input type="email" className="form-control " id="isSneezing" ref="isSneezing" placeholder="" name="email"/>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label d-inline-block col-sm-4" for="email">Breathing issues</label>
            <div className="col-sm-8 d-inline-block">
              <input type="email" className="form-control " id="isBreathingIssue" ref="isBreathingIssue" placeholder="" name="email"/>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label d-inline-block col-sm-4" for="email">Age</label>
            <div className="col-sm-8 d-inline-block">
              <input type="email" className="form-control " id="age" ref="age" placeholder="Patient's age in years" name="email"/>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label d-inline-block col-sm-4" for="email">Gender</label>
            <div className="col-sm-8 d-inline-block">
              <input type="email" className="form-control " id="gender" ref="gender" placeholder="" name="email"/>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label d-inline-block col-sm-4" for="email">Temperature</label>
            <div className="col-sm-8 d-inline-block">
              <input type="email" className="form-control " id="temperature" ref="temperature" placeholder="Enter temperature in celsius" name="email"/>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label d-inline-block col-sm-4" for="email">RT PCR</label>
            <div className="col-sm-8 d-inline-block">
              <input type="email" className="form-control " id="rt_pcr" ref="rt_pcr" placeholder="" name="email"/>
            </div>
          </div>
        </form>

        <div className="col-md-12">
          <div className="upload-btn-wrapper mb-2">
            <button className="upload-btn bg-primary text-white">Upload XRay</button>
            <input name="image" type="file" onChange={ e => {
              this.setState({ image: e.currentTarget.files[0] })
            }} />
          </div>
        </div>
        <div className="col-md-12">
          <Preview file={this.state.image} />
        </div>
        { this.state.image ? <div className="col-md-12">
          <button className="btn bg-warning text-dark mt-3" onClick={this.Upload_To_AWS_S3_and_Run_ML_Model}>{ this.state.loading ? 'Uploading...' : 'Evaluate' }</button>
        </div> : null }
        { this.props.msg ? 
          <div className="col-lg-12 col-md-12 ">
              <div className={``}>
                <h4>{this.props.msg}</h4>
              </div>
          </div> : null }
        <div class="col-md-12">

        { (this.props.covid_diagnosis && !this.state.loading)?
          <div className="col-lg-12 col-md-12 ">
              <div className={`alert ${this.props.type} alert-dismissible mt-3`}>
                <h4>{this.props.covid_diagnosis}</h4>
            </div>
          </div> : null }
        { this.props.annotated_img_url ?
          <div className="row">
            <div className="col-md-4">
              <img src={this.props.annotated_img_url} alt={'annotated_img_url'} className="img-thumbnail" /> 
            </div>
          </div>
          : null }
        </div>
      </div>
    );
  }
}

App.propTypes = {
    aws_s3_image_url: PropTypes.string,
    msg: PropTypes.string,
    type: PropTypes.string,
    covid_diagnosis : PropTypes.string,
    annotated_img_url: PropTypes.string
}

const mapStateToProps = ({aws_s3_image_url,msg,type, covid_diagnosis, annotated_img_url}) => ({aws_s3_image_url,msg,type, covid_diagnosis, annotated_img_url});
const mapDispatchToProps = dispatch => bindActionCreators( { uploadImage, response, getMLResponse }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(App)
