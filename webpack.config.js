const webpack = require('webpack')
const path = require('path')

module.exports = {
    output: {
        path: path.resolve(__dirname),
        filename: 'entry.bundle.js'
    },
    resolve: {
        extensions: ['.js'],
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    }
}
