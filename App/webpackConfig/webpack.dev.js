/**
 * webpack development
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const devConfig = {
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            modules: {
                                localIdentName: '[local]',
                            },
                        },
                    },
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
        ],
    },
    devtool: 'eval-source-map',
    devServer: {
        static: './dist',
        historyApiFallback: true,
        open: true,
        port: 3000,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            favicon: './public/favicon.ico',
        }),
    ],
    output: {
        filename: '[name].js',
        //dynamic split
        chunkFilename: '[name].chunk.js',
    },
};
module.exports = () => {
    return merge(commonConfig, devConfig);
};
