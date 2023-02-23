import WebpackBar from 'webpackbar'
import CopyPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CleanTerminalPlugin from 'clean-terminal-webpack-plugin'
// import dynamicPublicPathPlugin from 'dynamic-public-path-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import { DefinePlugin, type Configuration, type WebpackPluginInstance } from 'webpack'

import initEnv from './env'
import { Env } from '../types'
import { PKG } from '../utils/files'
import * as paths from './paths'
import { imageInlineSizeLimit, shouldUseSourceMap, useTypeScript } from '../utils/config'

const createWebpackConfiguration = (webpackEnv: Env, entry: string): Configuration => {
  const isEnvDevelopment = webpackEnv === 'development'
  const isEnvProduction = webpackEnv === 'production'

  const env = initEnv(webpackEnv)

  const webpackDevtool = isEnvProduction
    ? shouldUseSourceMap
      ? 'source-map'
      : false
    : 'cheap-module-source-map'

  const outputFilename = isEnvDevelopment ? 'bundle.js' : '[name].[contenthash:8].js'

  return {
    // target: ['browserslist'], default 
    mode: webpackEnv,
    // entry: paths.PLUGIN_INDEX,
    entry,
    stats: 'errors-warnings',
    devtool: webpackDevtool,
    resolve: {
      extensions: paths.MODULE_FILE_EXTENSIONS
        .map(ext => `.${ext}`)
        .filter(ext => useTypeScript || !ext.includes('ts')),
      alias: {
        '@': paths.PLUGIN_SRC_PATH,
      },
    },
    experiments: {
      topLevelAwait: true,
    },
    output: {
      clean: true,
      publicPath: '/',
      filename: `js/${outputFilename}`,
      assetModuleFilename: 'static/[name].[hash][ext]',
    },
    cache: {
      type: 'filesystem',
      version: process.env.NODE_ENV,
      cacheDirectory: paths.WEBPACK_CACHE_DIR,
      store: 'pack',
      // buildDependencies: {
      //   defaultWebpack: ['webpack/lib/'],
      //   config: [__filename],
      //   tsconfig: [paths.TS_CONFIG_PATH, paths.appJsConfig].filter(f =>
      //     fs.existsSync(f)
      //   ),
      // },
    },
    performance: {
      hints: false,  // 解决入口点 > 250KB 警告的问题
    },
    externals: isEnvProduction
      ? {
        react: 'React',
        'react-dom': 'ReactDOM',
        jsencrypt: 'JSEncrypt',
        antd: 'antd',
        moment: 'moment',
      } : {},
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
              test: /\.svg$/,
              use: [
                {
                  loader: require.resolve('@svgr/webpack'),
                  options: {
                    prettier: false,
                    svgo: false,
                    svgoConfig: {
                      plugins: [{ removeViewBox: false }],
                    },
                    titleProp: true,
                    ref: true,
                  },
                },
              ],
            },
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\/ttf$/],
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
                require.resolve('style-loader'),
                require.resolve('css-loader'),
              ],
            },
            {
              test: /\.less$/,
              use: [
                require.resolve('style-loader'),
                require.resolve('css-loader'),
                require.resolve('less-loader'),
              ],
            },
            {
              test: /\.(scss|sass)$/,
              use: [
                require.resolve('style-loader'),
                require.resolve('css-loader'),
                require.resolve('sass-loader'),
              ],
            },
            {
              test: /\.(js|jsx|ts|tsx)$/,
              exclude: /node_modules/,
              loader: require.resolve('babel-loader'),
              options: {
                customize:
                  require.resolve('babel-preset-react-app/webpack-overrides'),
                presets: [
                  [
                    require.resolve('babel-preset-react-app'),
                    { runtime: 'automatic' },
                  ],
                ],
                plugins: [
                  isEnvDevelopment && require.resolve('react-refresh/babel'),
                ].filter(Boolean),
                cacheDirectory: true,
                cacheCompression: false,
                compact: isEnvProduction,
              },
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
      new DefinePlugin({
        'process.env': {
          ...env.stringified,
        },
      }),
      isEnvDevelopment && new HtmlWebpackPlugin({
        title: PKG.name,
        filename: 'index.html',
        template: paths.PLUGIN_HTML_PATH,
      }),

      isEnvDevelopment && new CopyPlugin({
        patterns: [
          {
            from: paths.PLUGIN_PUBLIC_PATH,
            to: './',
            globOptions: {
              ignore: ['**/index.html'],
            },
          },
        ],
      }),
      isEnvDevelopment && new ReactRefreshWebpackPlugin(),
      useTypeScript && new ForkTsCheckerWebpackPlugin({
        typescript: {
          memoryLimit: 1024,
          configFile: paths.TS_CONFIG_PATH,
        },
      }),
      // isEnvProduction && new dynamicPublicPathPlugin({
      //   // eslint-disable-next-line no-useless-escape, @typescript-eslint/quotes
      //   dynamicPublicPath: `document.currentScript?.src.replace(window.location.origin, '').replace(/\/js\/.*/, '/') ?? '/'`,
      // }),
      new WebpackBar(),
      new CleanTerminalPlugin(),
    ].filter(Boolean) as WebpackPluginInstance[],
  }
}

export default createWebpackConfiguration