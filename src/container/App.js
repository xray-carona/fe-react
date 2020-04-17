import React, { Component } from 'react';
import ReactGA from 'react-ga';

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