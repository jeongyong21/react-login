var HtmlWebpackPlugin = require("html-webpack-plugin")
var path = require("path")

module.exports = {
  mode: "development",
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: "/node_modules",
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
      // favicon: 'public/favicon.ico' 파비콘은 준비가 되어있지 않으므로 주석처리
    })
  ],
  devServer: {
    historyApiFallback: true
    // open: true,
  },
  externals: {
    // global app config object
    config: JSON.stringify({
      apiUrl: "http://localhost:8080"
    })
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js"
  }
}
