import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import configureStore from './store/store';
import  csrfFetch ,{restoreCSRF } from './store/csrf';
import * as sessionActions from './store/session';
import './reset.css'


const store = configureStore();

if (import.meta.env.MODE !== 'production') {
  window.restoreCSRF = restoreCSRF
  window.sessionActions = sessionActions
  window.store = store;
  window.csrfFetch = csrfFetch;
}
restoreCSRF()
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
   </Provider>
  </React.StrictMode>
);