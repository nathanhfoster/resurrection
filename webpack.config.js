const webpack = require("webpack")
const Visualizer = require("webpack-visualizer-plugin")

module.exports = {
  entry: ["./src/index.jsx"],
  output: {
    library: "resurrection",
    libraryTarget: "umd",
    path: __dirname + "/dist",
    publicPath: "/",
    filename: "index.js",
  },

  externals: {
    react: {
      root: "React",
      commonjs2: "react",
      commonjs: "react",
      amd: "react",
    },
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {},
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  resolve: {
    extensions: [".jsx", ".js"],
  },
  plugins: [new webpack.optimize.OccurrenceOrderPlugin(), new Visualizer()],
}
