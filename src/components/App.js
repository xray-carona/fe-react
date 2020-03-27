import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { uploadImage, response } from '../actions';
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
       loading: true
    });
    let formData = new FormData();
    formData.append("photo", this.state.image);
    this.props.uploadImage(formData);
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
      <div className="row">
        <div className="col-md-12">
            <div className="page-header">
              <h3>
                 Custom Photo Upload&nbsp;<small>with ReactJS, NodeJS and AWS S3.</small>
              </h3>
            </div>
        </div>
        <div className="col-md-12">
          <div className="upload-btn-wrapper mb-2">
            <button className="upload-btn bg-primary text-white">Choose Photo...</button>
            <input name="image" type="file" onChange={ e => {
              this.setState({ image: e.currentTarget.files[0] })
            }} />
          </div>
        </div>
        <div className="col-md-12">
          <Preview file={this.state.image} />
        </div>
        { this.state.image ? <div className="col-md-12">
          <button className="btn bg-warning text-dark mt-3" onClick={this.Upload_To_AWS_S3}>{ this.state.loading ? 'Uploading...' : 'Upload To AWS S3' }</button>
        </div> : null }
        { this.props.msg ? 
          <div className="col-lg-12 col-md-12 ">
              <div className={`alert ${this.props.type} alert-dismissible mt-3`}>
                <button className="close" onClick={this.closeAlert.bind(this)} data-dismiss="alert" aria-label="close">&times;</button>
                <span dangerouslySetInnerHTML={{__html: this.props.msg}} />
              </div>
          </div> : null }
      </div>
    );
  }
}

App.propTypes = {
    aws_s3_image_url: PropTypes.string,
    msg: PropTypes.string,
    type: PropTypes.string
}

const mapStateToProps = ({aws_s3_image_url,msg,type}) => ({aws_s3_image_url,msg,type});
const mapDispatchToProps = dispatch => bindActionCreators( { uploadImage, response }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(App)
