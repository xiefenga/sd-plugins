import 'webpack-dev-server'
import webpack from 'webpack'
import WebpackBar from 'webpackbar'
import CopyPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CleanTerminalPlugin from 'clean-terminal-webpack-plugin'
// import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'

import * as env from './env'
import * as paths from './paths'
import { PKG, proxy } from './files'

const webpackEnv = env.raw.NODE_ENV

const shouldUseSourceMap = process.env.NO_SOURCEMAP !== 'true'

const isEnvDevelopment = webpackEnv === 'development'
const isEnvProduction = webpackEnv === 'production'

const webpackDevtool = isEnvProduction
  ? shouldUseSourceMap
    ? 'source-map'
    : false
  : 'cheap-module-source-map'

const imageInlineSizeLimit = parseInt(
  process.env.IMAGE_INLINE_SIZE_LIMIT ?? `${4 * 1024}`
)

const devServerConfig: webpack.Configuration['devServer'] = {
  port: 8080,
  hot: true,
  open: false,
  proxy,
}

const config: webpack.Configuration = {
  entry: paths.scriptEntry,
  stats: 'errors-warnings',
  devtool: webpackDevtool,
  output: {
    clean: true,
    publicPath: '/',
    filename: 'instant-message-popup.js',
    assetModuleFilename: 'static/[name].[hash][ext]',
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      '@': paths.scriptSourceDiv,
    },
  },
  experiments: {
    topLevelAwait: true,
  },
  cache: {
    type: 'filesystem',
    version: process.env.NODE_ENV,
    cacheDirectory: paths.webpackCache,
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: [/\.avif$/],
            type: 'asset',
            mimetype: 'image/avif',
            parser: {
              dataUrlCondition: {
                maxSize: imageInlineSizeLimit,
              },
            },
          },
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/, /\/ttf$/],
            type: 'asset',
            parser: {
              dataUrlCondition: {
                maxSize: imageInlineSizeLimit,
              },
            },
          },
          {
            test: /\.css$/,
            use: [
              'style-loader',
              'css-loader',
            ],
          },
          {
            test: /\.less$/,
            use: [
              'style-loader',
              'css-loader',
              'less-loader',
            ],
          },
          {
            test: /\.(scss|sass)$/,
            use: [
              'style-loader',
              'css-loader',
              'sass-loader',
            ],
          },
          {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: [
              { 
                loader: 'babel-loader',
                options: {
                  presets: [
                    ['@babel/preset-env',
                      {
                        useBuiltIns: 'usage',
                        corejs: 3,
                        bugfixes: true,
                      },
                    ],
                  ],
                  plugins: [
                    '@babel/plugin-transform-runtime',
                  ],
                }, 
              },
              {
                loader: 'ts-loader',
                options: {
                  configFile: paths.tsConfigPath,
                },
              },
            ],
          },
          {
            exclude: [/^$/, /\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
            type: 'asset/resource',
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { ...env.stringified },
    }),
    isEnvDevelopment && new HtmlWebpackPlugin({
      title: PKG.name,
      filename: 'index.html',
      template: paths.publicHtmlPath,
    }),
    isEnvDevelopment && new CopyPlugin({
      patterns: [
        {
          from: paths.publicPath,
          to: './',
          globOptions: {
            // 解决和 HtmlWebpackPlugin 冲突
            ignore: ['**/index.html'],
          },
        },
      ],
    }),
    // new ForkTsCheckerWebpackPlugin({
    //   typescript: {
    //     memoryLimit: 1024,
    //     configFile: paths.tsConfigPath,
    //   },
    // }),
    new WebpackBar(),
    new CleanTerminalPlugin(),
  ].filter(Boolean) as webpack.WebpackPluginInstance[],
}

if (isEnvDevelopment) {
  config.devServer = devServerConfig
}

export default config