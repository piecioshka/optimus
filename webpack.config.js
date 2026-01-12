const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',

    entry: path.join(__dirname, 'src/scripts/index.js'),

    output: {
        path: path.join(__dirname, 'dist/'),
        filename: 'bundle.js'
    },

    module: {
        rules: [
            {
                test: /.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/index.html'),
            filename: 'index.html',
            inject: 'body'
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/data', to: 'data' },
                { from: 'src/styles', to: 'styles' }
            ]
        })
    ]
};
