const path = require('path');
const webpack = require ('webpack');

//adding the resolve section allow us to tell webpack that if it sees a require, it also need to look in the
//lib and node_modules folder
const config = {
    resolve: {modules: [
        path.resolve('./lib'),
        path.resolve('./node_modules'),
    ]},
    entry: {
        vendor: ['babel-polyfill', 'react', 'react-dom', 'prop-types', 'axios', 'lodash.debounce', 'lodash.pickby'],
        app: ['./lib/renderers/dom.js']
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/, exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets:['react', 'env', 'stage-2']
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            // filename: "vendor.js"
            // (Give the chunk a different name)

            minChunks: Infinity,
            // (with more entries, this ensures that no other module
            //  goes into the vendor chunk)
        })
    ]
};

module.exports = config;
