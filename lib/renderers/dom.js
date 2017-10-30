import React from 'react';
import ReactDOM from 'react-dom'; // We need this dependency because we are interfacing with the browser
import App from 'components/App';


// I am rendering in the DOM my app
ReactDOM.render(
    <App initialData={window.initialData}/>,
    document.getElementById('root'));