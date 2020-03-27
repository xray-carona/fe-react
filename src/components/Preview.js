import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Preview extends Component {
    state = {
        thumb: undefined,
    };
    componentWillReceiveProps(nextProps) {
        if (!nextProps.file) { return; }
        this.setState({ loading: true }, () => {
          let reader = new FileReader();
          reader.onloadend = () => {
            this.setState({ loading: false, thumb: reader.result });
          };
          reader.readAsDataURL(nextProps.file);
        });
    }
    render() {
      const { file } = this.props;
      const { thumb } = this.state;
      return (
        <div className="row">
          <div className="col-md-6">
            { file ? <img src={thumb} alt={file.name} className="img-thumbnail" /> : null }
          </div>
        </div>
      );
    }
}

Preview.propTypes = {
    file: PropTypes.object
}
  
export default Preview;
  

