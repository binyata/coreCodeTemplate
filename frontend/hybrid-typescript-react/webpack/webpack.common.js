const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
let FaviconsWebpackPlugin = require('favicons-webpack-plugin')

const fileNameFormat = '[name]-[hash].[ext]';

module.exports = {
  entry: {
      index: './src/Index.tsx'
  },
  plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        template: 'index.ejs'
      }),
    //   new MiniCssExtractPlugin({
    //     filename: "[name].css",
    //     chunkFilename: "[id].css"
    //   }),
    /*  
        -- Note for css.d.ts/scss.d.ts files
        As the loader generates typing files, 
        it is wise to tell webpack to ignore them. 
        The fix is luckily very simple. Webpack ships
        with a "WatchIgnorePlugin" out of the box.
        Simply add this to your webpack plugins:
    */
      new webpack.WatchIgnorePlugin([
        /css\.d\.ts$/
      ]),
  ],
  output: {
    // filename: '[name].[contenthash].js',
    // chunkFilename: '[name].[contenthash].js',
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
      extensions: ['.tsx', '.ts', '.js', '.scss', '.css'],
      modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  module: {
      rules: [
          {
              test: /\.css$/,
              use: [
                'style-loader',
                {
                    loader: 'typings-for-css-modules-loader',
                    options: {
                        modules: true,
                        namedExport: true,
                        camelCase: true
                    }
                }
              ]
          },
          {
            test: /\.scss$/,
            use: [
              'style-loader',
              {
                  loader: 'typings-for-css-modules-loader',
                  options: {
                      modules: true,
                      namedExport: true,
                      camelCase: true,
                      sass: true
                  }
              },
              'sass-loader'
            ]
          },
          {
              test: /\.(png|svg|jpg|gif|ico)$/,
              //include: path.resolve(__dirname, path),
              use: [
                  {
                    loader: 'file-loader',
                    options: `images/${fileNameFormat}`
                  }
              ]
          },
          {
              test: /\.(woff|woff2|eot|ttf|otf)$/,
              //include: path.resolve(__dirname, path),
              use: [
                  'file-loader'
              ]
          },
          {
              test: /\.(csv|tsv)$/,
              //include: path.resolve(__dirname, path),
              use: [
                  'csv-loader'
              ]
          },
          {
              test: /\.xml$/,
              //include: path.resolve(__dirname, path),
              use: [
                  'xml-loader'
              ]
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
          },
          {
              test: /\.tsx?$/,
              use: [{
                  loader: 'ts-loader',
                  // loader: 'awesome-typescript-loader',
                  // helps speed up typescript compiling.
                  options: {
                    transpileOnly: true,
                    experimentalWatchApi: true,
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