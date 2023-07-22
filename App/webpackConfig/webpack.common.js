/**
 * webpack common file
 */
const path = require('path');
const threadLoader = require('thread-loader');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const jsWorkerPool = {
    workers: 2,
    poolTimeout: 2000,
};
threadLoader.warmup(jsWorkerPool, ['babel-loader']);

module.exports = {
    entry: {
        main: path.resolve(__dirname, '../src/index.tsx'),
    },
    resolve: {
        alias: {
            '~': path.resolve(__dirname, '../src'),
        },
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.(t|j)sx?$/,
                use: [
                    {
                        loader: 'thread-loader',
                        options: jsWorkerPool,
                    },
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
            {
                test: /\.(png|svg|jpg|gif|pdf|eot|ttf|svg)$/,
                type: 'asset',
                generator: {
                    filename: 'static/[hash][ext][query]',
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 20 * 1024, // 20kb
                    },
                },
            },
        ],
    },
    cache: { type: 'filesystem' },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.ProgressPlugin({
            percentBy: 'entries',
        }),
        new ForkTsCheckerWebpackPlugin({
            eslint: {
                enabled: true,
                files: './src/**/*.{tsx,ts,js,jsx}',
            },
            logger: {
                devServer: false,
                infrastructure: 'console',
                issues: 'console',
            },
        }),
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true,
                    },
                },
            }),
        ],
        moduleIds: 'size',
        usedExports: true,
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
        },
    },
    output: {
        path: path.resolve(__dirname, '../build'),
        publicPath: '/',
        pathinfo: false,
    },
};
