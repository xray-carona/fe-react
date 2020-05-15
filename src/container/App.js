import React, { Component } from 'react';
import ReactGA from 'react-ga';

import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import LoginPage from '../components/LoginPage';
import ResearchPage from '../components/ResearchPage';
import PatientInfoForm from '../components/PatientInfoForm';
import RiskAssessmentForm from '../components/RiskAssessmentForm';
import Results from '../components/Results';
import Dashboard from '../components/Dashboard';
import RiskAssessmentResult from '../components/RiskAssessmentResult';
import PatientHistory from '../components/PatientHistory';
import PatientDetails from '../components/PatientDetails';
import Header from "../components/Header";
import createBrowserHistory from "history/createBrowserHistory";
const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
        
        <BrowserRouter history={history}>
          <div>
            
            <div>
              <Switch>
                <Route path='/' exact={true} component={LoginPage} />
                <Route path='/login' component={LoginPage} />
                <Route path='/research' component={ResearchPage} />
                <PrivateRoute path='/dashboard' component={Dashboard} />
                <PrivateRoute path='/patientInfoForm' component={PatientInfoForm} />
                <Route path='/riskAssessmentForm' component={RiskAssessmentForm} />
                <PrivateRoute path='/results' component={Results} />
                <Route path='/riskAssessmentResult' component={RiskAssessmentResult} />
                <PrivateRoute path='/history' component={PatientHistory} />
                <PrivateRoute path='/patientDetails' component={PatientDetails} />
              </Switch>
            </div>
        </div>
        </BrowserRouter>
    );
  }

  
}


export function  initializeReactGA()  {

  ReactGA.initialize('UA-163860318-1', {
    debug: true,
    titleCase: false,
    gaOptions: {
      userId: 123
    }
  }
  );
  ReactGA.pageview(window.location.pathname + window.location.search);
  console.log(window.location.pathname + window.location.search);
  
}


export default App;