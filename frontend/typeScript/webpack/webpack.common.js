const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
      index: './src/index.ts'
  },
  plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'TypeScript Using Webpack'
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      })
  ],
  output: {
    // filename: '[name].[contenthash].js',
    // chunkFilename: '[name].[contenthash].js',
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
      extensions: ['.tsx', '.ts', '.js']
  },
  module: {
      rules: [
          {
              test: /\.css$/,
              use: [
                {
                    loader: 'typings-for-css-modules-loader?modules',
                },
                // {
                //     loader: MiniCssExtractPlugin.loader
                // },
                // {
                //     loader: 'css-loader',
                // },
              ]
          },
          {
              test: /\.(png|svg|jpg|gif)$/,
              use: [
                  'file-loader'
              ]
          },
          {
              test: /\.(woff|woff2|eot|ttf|otf)$/,
              use: [
                  'file-loader'
              ]
          },
          {
              test: /\.(csv|tsv)$/,
              use: [
                  'csv-loader'
              ]
          },
          {
              test: /\.xml$/,
              use: [
                  'xml-loader'
              ]
          },
          {
              test: /\.tsx?$/,
              use: [{
                  loader: 'ts-loader',
                  // helps speed up typescript compiling.
                  options: {
                    transpileOnly: true,
                    experimentalWatchApi: true
                  }
              }],
              exclude: /node_modules/,
          }
      ]
  },
  /*
    The SplitChunksPlugin allows us to extract 
    common dependencies into an existing entry
    chunk or an entirely new chunk. Let's use
    this to de-duplicate the lodash dependency from the previous example:
  */
//   optimization: {
//       splitChunks: {
//           chunks: 'all'
//       }
//   }
//   optimization: {
//       // runtimeChunk helps with deploying code to servers
//       runtimeChunk: 'single',
//       splitChunks: {
//           cachedGroups: {
//               vendor: {
//                   test: /[\\/]node_modules[\\/]/,
//                   name: 'vendors',
//                   chunks: 'all'
//               }
//           }
//       }
//   }
};