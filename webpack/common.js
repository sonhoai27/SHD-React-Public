const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const paths = require("./path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const babelLoader = {
  loader: "babel-loader",
  options: {
    cacheDirectory: true,
    presets: ["@babel/preset-env", "@babel/preset-react", 'next',],
    comments: true,
    compact: false,
    plugins: [
      "@babel/plugin-syntax-dynamic-import",
      ["styled-jsx/babel", { "plugins": ["styled-jsx-plugin-postcss"] }]
    ]
  }
};

module.exports = {
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: { 
      "react-dom": "@hot-loader/react-dom",
      '@app': paths.appSrc,
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader", "source-map-loader"],
        exclude: /node_modules(?!\/quill-image-drop-module|quill-image-resize-module)/
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [babelLoader, "ts-loader"]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules: {
                mode: "local",
                localIdentName: "[name]__[local]--[hash:base64:5]",
                context: paths.appIndexJs,
                hashPrefix: "my-custom-hash"
              }
            }
          },
          { loader: "postcss-loader" },
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          {
            loader: require.resolve("css-loader")
          },
          { loader: "postcss-loader" }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: ["file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]"]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({}),
    new HtmlWebpackPlugin({
      template: paths.appHtml,
      minify: {
        collapseWhitespace: true
      },
      chunksSortMode: "auto"
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        chunkFilter: chunk => {
          // Exclude uglification for the `vendor` chunk
          if (chunk.name === "vendor") {
            return false;
          }

          return true;
        },
        cache: true,
        parallel: true,
        sourceMap: true,
        minify(file, sourceMap) {
          const extractedComments = [];

          const { error, map, code, warnings } = require("uglify-module") // Or require('./path/to/uglify-module')
            .minify(file, {});

          return { error, map, code, warnings, extractedComments };
        },
        uglifyOptions: {
          warnings: false,
          parse: {},
          compress: {},
          mangle: true,
          output: null,
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_fnames: false
        }
      })
    ]
  }
};
