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

  Upload_To_AWS_S3 = e => {
    e.preventDefault();
    this.setState({
       loading: true,
       ml_response: false
    });
    let formData = new FormData();
    formData.append("photo", this.state.image);
    this.props.uploadImage(formData);
  }

  Get_ML_Response = e => {
    this.props.response('','');
    e.preventDefault();
    this.props.getMLResponse(this.state.aws_s3_image_url);
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
      console.log(this.props.displayEvaluatedImage)
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
              <input type="email" className="form-control " id="email" placeholder="Enter Name" name="name"/>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label d-inline-block col-sm-4" for="pwd">Dry Cough</label>
            <div className="col-sm-8 d-inline-block">          
              <input type="text" className="form-control" id="pwd" placeholder="Does patient have dry cough" name="pwd"/>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label d-inline-block col-sm-4" for="email">Sneezing</label>
            <div className="col-sm-8 d-inline-block">
              <input type="email" className="form-control " id="email" placeholder="" name="email"/>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label d-inline-block col-sm-4" for="email">Breathing issues</label>
            <div className="col-sm-8 d-inline-block">
              <input type="email" className="form-control " id="email" placeholder="" name="email"/>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label d-inline-block col-sm-4" for="email">Age</label>
            <div className="col-sm-8 d-inline-block">
              <input type="email" className="form-control " id="email" placeholder="Patient's age in years" name="email"/>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label d-inline-block col-sm-4" for="email">Gender</label>
            <div className="col-sm-8 d-inline-block">
              <input type="email" className="form-control " id="email" placeholder="" name="email"/>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label d-inline-block col-sm-4" for="email">Temperature</label>
            <div className="col-sm-8 d-inline-block">
              <input type="email" className="form-control " id="email" placeholder="Enter temperature in celsius" name="email"/>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label d-inline-block col-sm-4" for="email">RT PCR</label>
            <div className="col-sm-8 d-inline-block">
              <input type="email" className="form-control " id="email" placeholder="" name="email"/>
            </div>
          </div>

        </form>

        <div className="col-md-12">
          <div className="upload-btn-wrapper mb-2">
            <button className="upload-btn bg-primary text-white">Upload CT scan</button>
            <input name="image" type="file" onChange={ e => {
              this.setState({ image: e.currentTarget.files[0] })
            }} />
          </div>
        </div>

        <div className="col-md-12">
          <div className="upload-btn-wrapper mb-2">
            <button className="upload-btn bg-primary text-white">Upload Xray</button>
          </div>
        </div>

        <div className="col-md-12">
          <div className="upload-btn-wrapper mb-2">
            <button className="upload-btn bg-primary text-white">Upload blood reports</button>
          </div>
        </div>

        <div className="col-md-12">
          <div className="upload-btn-wrapper mb-2">
            <button className="upload-btn bg-primary text-white">Upload Serological tests </button>
          </div>
        </div>

        <div className="col-md-12">
          <Preview file={this.state.image} url={this.state.aws_s3_image_url}/>
        </div>
          { this.props.displayEvaluatedImage && this.props.displayEvaluatedImage === true ?
              <div>
                  <img width="350px" src="https://xray-corona.s3.ap-south-1.amazonaws.com/1_annotated.png" />
              </div> : null
          }
          { this.props.displayEvaluatedImage && this.props.displayEvaluatedImage === true ?
              <div>
                  <img width="350px" src="https://xray-corona.s3.ap-south-1.amazonaws.com/capture.png" />
              </div> : null
          }
        { this.state.image ? <div className="col-md-12">
          <button className="btn bg-warning text-dark mt-3" onClick={this.Upload_To_AWS_S3}>{ this.state.loading ? 'Loading results...' : 'Evaluate' }</button>
        </div> : null }
        
        { this.state.aws_s3_image_url ? <div className="col-md-12">
          <button className="btn bg-warning text-dark mt-3" onClick={this.Upload_To_AWS_S3}>Hello</button>
        </div> : null }

        { this.props.msg ? 
          <div className="col-lg-12 col-md-12 ">
              <div className={``}>
                <h4>{this.props.msg}</h4>
              </div>
          </div> : null }
        
      </div>
    );
  }
}

App.propTypes = {
    aws_s3_image_url: PropTypes.string,
    msg: PropTypes.string,
    type: PropTypes.string,
    ml_response : PropTypes.string
}

const mapStateToProps = ({aws_s3_image_url,msg,type, ml_response,displayEvaluatedImage }) => ({aws_s3_image_url,msg,type, ml_response, displayEvaluatedImage});
const mapDispatchToProps = dispatch => bindActionCreators( { uploadImage, response, getMLResponse }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(App)
