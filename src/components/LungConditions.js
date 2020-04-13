import React, { Component } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

class LungConditions extends Component {

  render() {
    let tifOptions = [];

    if (this.props.data) {
      Object.keys(this.props.data).forEach(key => {
        tifOptions.push(
          <div class="row">
            <div class="col-md-6">{key}</div>
            <div class="col-md-6">
              <ProgressBar
              variant={
                this.props.data[key].this_val < 33? "success"
                : (this.props.data[key].this_val < 66? "warning"
                : "danger")
              }
                now={this.props.data[key].this_val}
                min={this.props.data[key].low_val}
                max={this.props.data[key].high_val}
              />
            </div>
          </div>
        );
      });
    }
    return (
      <div>
        <div className="row">
          <div className="col-md-6"></div>
          <div className="col-md-6 ">
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
      </div>
      );
  }
}

export default LungConditions;