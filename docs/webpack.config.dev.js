const { resolve } = require("path")
const webpack = require("webpack")

module.exports = {
    entry: {
        hotloader: "react-hot-loader/patch",
        endpoint: "webpack-dev-server/client?http://localhost:8080",
        hotreload: "webpack/hot/only-dev-server",
        react: "./docs/react/index.js",
        angular: "./docs/angular/index.ts",
        common: "./docs/common/index.js"
    },
    output: {
        filename: "[name]/[name].js",
        path: resolve(__dirname, ""),
        publicPath: "/"
    },
    resolve: {
        extensions: [ ".js", ".ts" ],
        alias: {
            bosket: resolve(__dirname, "../src")
        }
    },

    devtool: "inline-source-map",

    devServer: {
        hot: true,
        contentBase: resolve(__dirname, ""),
        publicPath: "/"
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader"
            }, {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader", options: { importLoaders: 1 }},
                    "postcss-loader"
                ]
            },
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                options: {
                    transpileOnly: true,
                    configFileName: resolve(__dirname, "angular/tsconfig.json")
                }
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
}