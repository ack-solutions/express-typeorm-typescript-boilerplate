const path = require('path');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');

module.exports = {
  // entry: {
  //   app: [
  //     'core-js',
  //     path.join(__dirname, 'src', 'index.ts')
  //   ]
  // },
  entry: {
    index: './src/index.ts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  mode: 'production',
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          'ts-loader',
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  plugins: [new NodemonPlugin()]
}