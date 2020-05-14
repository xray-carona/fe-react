import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { clearResults, logout, loadPatients, setCurrentPatient } from '../actions';
import HeaderLoggedIn from "../components/HeaderLoggedIn";
import '../styles/App.css';
import { setCookie } from '../util/cookies';
import SearchResults from 'react-filter-search';
import Table from 'react-bootstrap/Table';

class PatientHistory extends Component {

    backToPatientInfo = e => {
        e.preventDefault();
        this.props.clearResults();
        this.props.history.push('riskAssessmentForm');
    }

    constructor(props) {
      super(props);
      this.state = {
        value: ''
      };
    }

    logout = e => {
        e.preventDefault();
        this.props.logout();
        setCookie('token', '');
        this.props.history.push('login');
    }

    componentDidMount() {
        this.props.loadPatients();
    }

    handleChange = event => {
      const { value } = event.target;
      this.setState({ value });
    };

    fetchPatientDetails = el => {
      this.props.setCurrentPatient(el.patient_id);
      this.props.history.push('patientDetails');
    }

    render() {
        const { value } = this.state;
        return (
            <div>
                <HeaderLoggedIn history={this.props.history}></HeaderLoggedIn>
                  <div className="row">
                    <button className="upload-btn btn-primary text-white back-button" onClick={this.backToPatientInfo}>Back</button>
                  </div> 

                  <div>
                    <input className="searchInput" type="text" value={value} onChange={this.handleChange} placeholder="Filter by patient name, id, gender etc" />
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Patient Id</th>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Age</th>
                          <th>Gender</th>
                          <th>Date</th>
                          <th>Risk Status</th>
                        </tr>
                      </thead>
                      
                      {this.props.allPatients ?
                        <SearchResults
                          value={value}
                          data={this.props.allPatients.data}
                          renderResults={results => (
                            <tbody>
                              {results.map(el => (
                                      <tr onClick={() => this.fetchPatientDetails(el)}>
                                        <td>{el.patient_id}</td>
                                        <td>{el.first_name}</td>
                                        <td>{el.last_name}</td>
                                        <td>{el.age}</td>
                                        <td>{el.gender}</td>
                                        <td>{el.createdAt.toLocaleString().substring(0,10)}</td>
                                        <td>{el.extra ? el.extra.overAllScore.risk : ""}</td>
                                      </tr>
                              ))}
                            </tbody>
                          )}
                      />
                      : null}
                      </Table>
                  </div> 
            </div>
        );
    }
}

PatientHistory.propTypes = {}

const mapStateToProps = ({allPatients }) => ({ allPatients });
const mapDispatchToProps = dispatch => bindActionCreators({ clearResults, logout, loadPatients, setCurrentPatient }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(PatientHistory)