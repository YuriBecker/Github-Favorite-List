const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const SimpleProgressWebpackPlugin = require("simple-progress-webpack-plugin");
const ErrorOverlayPlugin = require("error-overlay-webpack-plugin");
const autoprefixer = require("autoprefixer");

module.exports = (env, argv) => ({
  entry: [path.resolve(__dirname, `./src/index.js`)],
  output: {
    path: path.resolve(__dirname, `./build`),
    filename: "[name].js",
    chunkFilename: "[name].chunk.js"
  },
  resolve: {
    modules: ["node_modules"],
    symlinks: false
  },
  watchOptions: {
    poll: true
  },
  devServer: {
    noInfo: false,
    host: "0.0.0.0",
    port: 3000,
    open: true,
    useLocalIp: true,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        loader: "svg-inline-loader"
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve("url-loader"),
        options: {
          limit: 10000,
          name: "static/media/[name].[hash:8].[ext]"
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: require.resolve("babel-loader")
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" },
          {
            loader: require.resolve("postcss-loader"),
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              ident: "postcss",
              plugins: () => [
                require("postcss-flexbugs-fixes"),
                autoprefixer({
                  overrideBrowserslist: [
                    ">1%",
                    "last 4 versions",
                    "Firefox ESR",
                    "not ie < 9" // React doesn't support IE8 anyway
                  ],
                  flexbox: "no-2009"
                })
              ]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          {
            loader: require.resolve("postcss-loader"),
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              ident: "postcss",
              plugins: () => [
                require("postcss-flexbugs-fixes"),
                autoprefixer({
                  overrideBrowserslist: [
                    ">1%",
                    "last 4 versions",
                    "Firefox ESR",
                    "not ie < 9" // React doesn't support IE8 anyway
                  ],
                  flexbox: "no-2009"
                })
              ]
            }
          }
        ]
      }
    ]
  },
  devtool: "cheap-module-source-map", // 'eval' is not supported by error-overlay-webpack-plugin
  plugins: [
    new SimpleProgressWebpackPlugin({
      format: "compact"
    }),
    new HtmlWebPackPlugin({
      hash: true,
      template: path.resolve(__dirname, `./public/index.html`),
      filename: "index.html",
      favicon: path.resolve(__dirname, `./public/favicon.ico`)
    }),
    new Dotenv({
      path: path.resolve(__dirname, `./.env.${argv.mode}`),
      systemvars: true
    }),
    new ErrorOverlayPlugin()
  ],
  optimization: {
    splitChunks: {
      name: true,
      chunks: "all"
    }
  }
});
