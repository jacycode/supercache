const webpack = require('webpack');
const path = require('path');

const config = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index.build.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env', '@babel/stage-0', '@babel/react']
                    }
                }
            }
        ]
    },
};

module.exports = config;