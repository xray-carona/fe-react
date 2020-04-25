import React, { Component } from "react";

class LungConditions extends Component {

    render() {
        let tifOptions = [];

        if (this.props.data) {
            Object.keys(this.props.data).forEach(key => {
                tifOptions.push(
                    <div class="row">
            <div class="col-md-6">{key}</div>
            <div class="col-md-6">
              <div>{this.props.data[key].result_boolean? <div><b>Yes</b></div> : <div>No</div>}</div>
            </div>
          </div>
                );
            });
        }
        return (
            <div>
        {tifOptions}
      </div>
        );
    }
}

export default LungConditions;