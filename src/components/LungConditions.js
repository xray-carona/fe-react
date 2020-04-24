import React, {Component} from "react";

class LungConditions extends Component {

  render() {
    let tifOptions = [];

    if (this.props.data) {
      Object.keys(this.props.data).forEach(key => {
        tifOptions.push(
/**/        <div className="row mt-3" key={key}>
          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <strong>{key}</strong>
          </div>

          <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12">
            <div className="slidecontainer">
              <input type="range" min={this.props.data[key].low_val} max={this.props.data[key].high_val} value={this.props.data[key].this_val} className="slider" id={key}/>
            </div>
          </div>
        </div>
        );
      });
    }
    return (
        <React.Fragment>
          <div className="mt-3 mb-3 text-center">
            <h5>Disease Predictions</h5>
          </div>
          <div className="row mt-3">
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">

            </div>

            <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 ">
              <div className="justify-content-between d-flex">
                <small>Healthy</small>
                <small>Risk</small>
              </div>
              <div className="justify-content-between d-flex dote">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
          {tifOptions}
        </React.Fragment>
      );
  }
}

export default LungConditions;
