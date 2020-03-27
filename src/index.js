import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import { Provider } from 'react-redux';
import App from './components/App';
import store from './store';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
        <App />
    </Router>
  </Provider>, document.querySelector('.container'));
serviceWorker.unregister();
