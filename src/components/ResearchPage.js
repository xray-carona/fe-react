import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import HeaderLoggedIn from "../components/HeaderLoggedIn";
import Table from 'react-bootstrap/Table'
import block_diagram from '../assets/img/block_diagram.png';

class ResearchPage extends Component {

    render() {
        return (
            <div>
        <HeaderLoggedIn history={this.props.history}></HeaderLoggedIn>
        <h2>Role of Radiological Imaging</h2>
        <p>Covid-19 presents unique features in CT Scans, chest X-rays accompanied with the clinical contexts</p>
        <br/>
        <h2>CT scan Findings (Early Stage) </h2>
        <p>In the early stages of the disease below are the lung conditions that are observed in the CT scans.
        Bilateral peripheral Ground Glass Opacity (often rounded Morphology)
        With or Without Superimposed Consolidation
        No Discrete Nodules
        No Pleural Effusion
        No Lymphadenopathy</p>
        <br/>
        <h2>CT scan Findings (Late Stage)</h2>
        <p>In the later stages of the disease progression, below are the lung conditions that are observed in the CT scans
        Confluent Ground Glass Opacity
        Crazy Paving
        Superimposed Consolidation
        Linear Opacities
        Architectural Distortion
        Bronchiolar Dilation along the affected areas
        Similar lung conditions are observed in chest Xrays at later stage. CT scans are more effective than Chest X-rays in terms of detecting the above mentioned changes in the lungs.</p>
        <h2>Working Principle</h2>
        <p>Our solution incorporates patient details, Locality, Clinical History, Travel History, Clinical Symptoms and Available diagnostics to evaluate the lung conditions observable using CT scans and Chest X-rays and assess the risk of Covid in suspect patients. 
        We use AI based models trained on CT scan datasets and Chest X-ray datasets to detect the presence of Ground Glass Opacities, Consolidation, Opacities, Nodules, Pleural Effusion along with the extent and laterality of the infection in the Lungs. 
        Using these finding we classify the patients and make appropriate recommendations for management of the patients.
         We further monitor the condition of the patient over the days and evaluate the disease progression to ensure efficient clinical intervention. 
        The below block diagram presents the overview of our solution.</p>

        <img className="block_diagram" alt='something went wrong'
                                                    src={block_diagram}/>

        <h2>Appendix</h2>
        <Table id='ct-results' striped bordered hover>
                    <thead>
                        <tr>
                          <th>Description</th>
                          <th>Link</th>
                        </tr>
                    </thead>
                   <tbody>
                      <tr><td>Xray, CT  </td><td><a href="https://github.com/ieee8023/covid-chestxray-dataset">https://github.com/ieee8023/covid-chestxray-dataset</a></td></tr>
                      <tr><td>Covid Net Data  </td><td><a href="https://github.com/lindawangg/COVID-Net">https://github.com/lindawangg/COVID-Net</a></td></tr>
                      <tr><td>CT  </td><td><a href="https://github.com/UCSD-AI4H/COVID-CT">https://github.com/UCSD-AI4H/COVID-CT</a></td></tr>
                      <tr><td>Xray, CT  </td><td><a href="https://www.sirm.org/en/">https://www.sirm.org/en/</a></td></tr>
                      <tr><td>An image based Xray attempt at coronavirus2019 (covid19) diagnosis. </td><td><a href="https://github.com/JordanMicahBennett/SMART-CT-SCAN_BASED-COVID19_VIRUS_DETECTOR">https://github.com/JordanMicahBennett/SMART-CT-SCAN_BASED-COVID19_VIRUS_DETECTOR</a></td></tr>
                      <tr><td>CT Dicom  </td><td><a href="https://www.kaggle.com/andrewmvd/covid19-ct-scans">https://www.kaggle.com/andrewmvd/covid19-ct-scans</a></td></tr>
                      <tr><td>Annotated CT   </td><td><a href="http://medicalsegmentation.com/covid19">http://medicalsegmentation.com/covid19</a></td></tr>
                      <tr><td>List of Datasets  </td><td><a href="https://docs.google.com/document/d/1Wkvbf2t2Da87NtNvMJf_PRqv9zLHyqqtRitBIGGKKNM/edit?ts=5e78bf6d#heading=h.m7aq1vqtpegc">https://docs.google.com/document/d/1Wkvbf2t2Da87NtNvMJf_PRqv9zLHyqqtRitBIGGKKNM/edit?ts=5e78bf6d#heading=h.m7aq1vqtpegc</a></td></tr>
                      <tr><td>Hospital case management + prediction </td><td><a href="https://github.com/CodeForPhilly/chime">https://github.com/CodeForPhilly/chime</a></td></tr>
                      <tr><td>COVID-19 BSTI Imaging Database  </td><td><a href="https://bsticovid19.cimar.co.uk/worklist/?embedded=#">https://bsticovid19.cimar.co.uk/worklist/?embedded=#</a></td></tr>
                   </tbody>
                </Table>
        
      </div>
        )
    }
}

const mapStateToProps = () => ({

});

export default connect(mapStateToProps)(ResearchPage);