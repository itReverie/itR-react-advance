import React from 'react';
import ReactDOMServer from 'react-dom/server';
import axios from 'axios';
import StateApi from 'state-api';
import config from 'config';
import App from 'components/App';


//note that you need the async becuase now we are calling the aync api
const serverRender = async () => {

    //fetch the data
    const response = await axios.get(`http://${config.host}:${config.port}/data`);
    const store = new StateApi(response.data);

    return {initialMarkup: ReactDOMServer.renderToString(
        <App store={store}/>),
        initialData : response.data};
};

export default serverRender;