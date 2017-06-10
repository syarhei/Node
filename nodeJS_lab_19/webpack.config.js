let webpack = require('webpack');

module.exports = {
    context: __dirname,
    entry: "./view/components/WF.js",
    output: {
        path: __dirname + "/view/webpack",
        filename: "bundle.js"
    },
    module: {
        rules: [
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
            {test: /\.css$/, loader: "style-loader!css-loader"}
        ]
    }
};