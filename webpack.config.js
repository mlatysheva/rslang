const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const baseConfig = {
    entry: path.resolve(__dirname, './src/index.ts'),
    mode: 'development',
    module: {
        rules: [
            {
              test: /\.css$/i,
              use: ['style-loader', 'css-loader'],
            },
            {
              test: /.(ts|tsx)$/i,
              use: 'ts-loader',
              exclude: ['/node_modules/'],
            },
            {
              test: /\.(?:ico|gif|png|jpg|jpeg|svg|webp)$/i,
              type: 'asset/resource',
            },
            {
              test: /\.(?:mp3|wav|ogg|mp4)$/i,
              type: 'asset/resource',
            },
            {
              test: /\.(woff(2)?|eot|ttf|otf)$/i,
              type: 'asset/resource',
            }
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'assets/[hash][ext]',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
            // favicon: './src/assets/favicon.ico'
        }),
        new CleanWebpackPlugin(),
        
        new CopyPlugin(
          { patterns: [ 
          { from: "./src/assets", to: "assets" }, 
           ], 
          }), 
          
    ],
};

module.exports = ({ mode }) => {
    const isProductionMode = mode === 'prod';
    const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

    return merge(baseConfig, envConfig);
};