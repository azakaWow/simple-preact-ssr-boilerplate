const webpack = require('webpack');
const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        main: path.resolve(__dirname, "../src", "index.tsx"),
    },
    mode: 'development',
    devtool: 'eval-source-map',
    watch: true,
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: [/node_modules/],
                use: [{ loader: "ts-loader" }]
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ],
        
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: "/"
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new ManifestPlugin(),
        new webpack.DefinePlugin({ "NODE_ENV": JSON.stringify("development") }),
    ],
    resolve: {
        extensions: ['.ts', '.tsx','.css']
    },
};
