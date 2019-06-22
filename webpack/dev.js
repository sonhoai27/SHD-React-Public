const paths = require('./path');
const merge = require('webpack-merge');
const webpack = require('webpack');

const commonConfig = require('./common');

module.exports = merge(commonConfig, {
    mode: 'development',
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client',
        'webpack/hot/only-dev-server',
        paths.appIndexJs,
    ],
    output: {
        filename: 'js/[name].[hash].js',
        chunkFilename: "js/[name].[hash].js",
        path: paths.appDevPath,
        publicPath: paths.appPath
    },
    devServer: {
        hot: true,
        historyApiFallback: true,
    },
    devtool: 'cheap-module-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ],
});