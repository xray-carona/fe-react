import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import LoginPage from '../components/LoginPage';
import RegisterPage from '../components/RegisterPage';
import PatientInfoForm from '../components/PatientInfoForm';
import Results from '../components/Results';
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
                <Route path='/register' component={RegisterPage} />
                <PrivateRoute path='/patientInfoForm' component={PatientInfoForm} />
                <PrivateRoute path='/results' component={Results} />
              </Switch>
            </div>
        </div>
        </BrowserRouter>
    );
  }
}

export default App;