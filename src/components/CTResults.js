import React, { Component } from "react";
import Table from 'react-bootstrap/Table'

class CTResults extends Component {

    renderTableData() {
      return this.props.data.map((result_row) => {
         const { area_percentage, color, count, key,legend } = result_row //destructuring
         var severity = 'NONE';
         if(legend === 'Ground Glass') {
            if(area_percentage > 4.0) {
                severity = 'SEVERE';
            } else if (area_percentage > 1.0) {
                severity = 'MILD';
            }
         }
         if(legend === 'Consolidations') {
            if(area_percentage > 4.0) {
                severity = 'SEVERE';
            } else if (area_percentage > 1.0) {
                severity = 'MILD';
            }
         }
         if(legend === 'Pleural effusion') {
            if(area_percentage > 4.0) {
                severity = 'SEVERE';
            } else if (area_percentage > 1.0) {
                severity = 'MILD';
            }
         }
         return (
            <tr key={key}>
               <td style={{background: "rgb("+color[0]+","+color[1]+","+color[2]+")"}}></td> 
               <td>{legend}</td>
               <td>{area_percentage}</td>
               <td className={severity}>
                    {severity}
                </td>
               
            </tr>
         )
      })
   }

    render() {
        return (
            <div>
                <Table id='ct-results' striped bordered hover>
                    <thead>
                        <tr>
                          <th>Color</th>
                          <th>CT Feature</th>
                          <th>%age area</th>
                          <th>Severity</th>
                        </tr>
                    </thead>
                   <tbody>
                      {this.renderTableData()}
                   </tbody>
                </Table>
            </div>
        );
    }
}

export default CTResults;