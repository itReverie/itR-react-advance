
import express from 'express';
import config from './config';

const app= express();

//anything we server here will be served directly
app.use(express.static('public'));

//Configuring express to use EJS as it's template language
app.set('view engine', 'ejs');

app.get('/', (req,res)=> {res.render('index', {answer : 42});});

app.listen(config.port, function listenHandler(){
    console.info(`Running on ${config.port}`);
});
