const path = require('path');

//adding the resolve section allow us to tell webpack that if it sees a require, it also need to look in the
//lib and node_modules folder
const config = {
    resolve: {modules: [
        path.resolve('./lib'),
        path.resolve('./node_modules'),
    ]},
    entry: [ 'babel-polyfill', './lib/renderers/dom.js'],
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            { test: /\.js$/, exclude:/node_modules/, use: 'babel-loader' }
        ]
    }
};

module.exports = config;
