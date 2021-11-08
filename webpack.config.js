module.exports = {
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
            {test: /\.svg?$/, loader: "svg-url-loader"}
        ]
    },
    resolve: {
        extensions: ['*', '.js']
    },
    plugins: [
    ]
};
