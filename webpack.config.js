const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const packageJson = require('./package.json');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: './dist/index.js',
        library: packageJson.name,
        libraryTarget: 'umd'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.ts?$/,
                loader: 'awesome-typescript-loader'
            }
        ]
    },
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new webpack.optimize.ModuleConcatenationPlugin()
    ]
};