import React from 'react';
import ReactDOM from 'react-dom'; // We need this dependency because we are interfacing with the browser

import StateApi from 'state-api';
import App from 'components/App';

const store=new StateApi(window.initialData);

// I am rendering in the DOM my app
ReactDOM.render(
    <App store={store}/>,
    document.getElementById('root'));