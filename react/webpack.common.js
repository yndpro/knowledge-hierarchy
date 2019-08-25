const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry : {
        // router: "./src/ReactRouter.js",
        // redux : "./src/redux.js",
        reactTodolist : "./src/ReactTodolist.js",
        reactRouter : "./src/ReactTodolist.js"
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader"
                }
            }
        ]
    },
    plugins: [
        // This is especially useful for webpack bundles that include a hash in the filename
        // which changes every compilation
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,"index.tpl.html"),
            inject:'body',
            filename: './index.html'
        }),
        new CleanWebpackPlugin(['dist']),
        new webpack.HotModuleReplacementPlugin()
    ]
};