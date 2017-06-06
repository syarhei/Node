var webpack = require('webpack');

module.exports = {
    context: __dirname,
    entry: "./view/components/ToDo.js",
    output: {
        path: __dirname + "/webpack",
        filename: "bundle.js"
    },
    module: {
        rules: [
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
            {test: /\.css$/, loader: "style-loader!css-loader"}
        ]
    }
};