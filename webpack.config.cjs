const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

 module.exports = {
  mode: "development",
  entry: {
     index: './src/index.js',
   },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Battleship',
      template: 'src/index.html',
      inject: false,
    }),
  ],
   output: {
     filename: '[name].js',
     path: path.resolve(__dirname, 'dist'),
     clean: true,
   },
   optimization: {
    runtimeChunk: 'single',
  },
  module: {
    rules: [
      { // babel loader
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      { // css loader
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
 };