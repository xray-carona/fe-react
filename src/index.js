import React from 'react';
import ReactDOM from 'react-dom';
// import createBrowserHistory from "history/createBrowserHistory";
import { Provider } from 'react-redux';
import App from './container/App';
import store from './store';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
// import './styles/App.css';
import './styles/main.css';

ReactDOM.render(
  <Provider store={store}>
        <App />
  </Provider>, document.querySelector('.container'));
serviceWorker.unregister();
