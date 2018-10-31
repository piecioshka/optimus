const path = require('path');

module.exports = {
    mode: 'development',

    entry: path.join(__dirname, 'app/scripts/index.js'),

    output: {
        path: path.join(__dirname, 'app/dist/'),
        filename: 'bundle.js'
    },

    module: {
        rules: [
            {
                test: /.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    }
};
