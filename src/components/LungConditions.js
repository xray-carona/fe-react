import React, { Component } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

class LungConditions extends Component {

  render() {
    let tifOptions = [];

    if (this.props.data) {
      Object.keys(this.props.data).forEach(key => {
        tifOptions.push(
          <div class="row">
            <div class="col-md-auto">{key}</div>
            <div class="col-sm">
              <ProgressBar
                now={this.props.data[key].this_val}
                min={this.props.data[key].low_val}
                max={this.props.data[key].high_val}
              />
            </div>
          </div>
        );
      });
    }
    return tifOptions;
  }
}

export default LungConditions;