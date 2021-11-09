var path = require('path');

module.exports = {
    output: {
        path: path.resolve(__dirname),
        filename: "cookie-consent.min.js"
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: "css-loader" },
                    { loader: "sass-loader" },
                ]
            },
            {test: /\.svg?$/, loader: "svg-inline-loader"}
        ]
    },
    resolve: {
        extensions: ['*', '.js']
    },
    plugins: [
    ]
};
