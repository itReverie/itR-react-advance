
import express from 'express';
import config from './config';
import serverRender from './renderers/server';
import {data} from './testData';

const app= express();

//anything we server here will be served directly
app.use(express.static('public'));

//Configuring express to use EJS as it's template language
app.set('view engine', 'ejs');


//React server rendering using ReactDOMServer
app.get('/', async (req,res)=> {
    const initialContent= await serverRender();
    res.render('index', {... initialContent});
});


//passing our data as an API
app.get('/data', (req,res)=> {
    res.send(data);
});

app.listen(config.port, function listenHandler(){
    console.info(`Running on ${config.port}`);
});
