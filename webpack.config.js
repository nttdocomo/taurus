module.exports = {
    entry: {
        grid:['./examples/grid/grid.js']
    },
    output: {
        path: './build',
        publicPath: "/assets/",
        filename: '[name].js'
    }/*,
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }*/
};