const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const settings = {
  distPath: path.resolve(__dirname + "/../", "assets"),
  srcPath: "./src/ts/index.ts",
  hostPort: 5000,
  babelOptions: {
    babelrc: false,
    presets: [
      [
        "@babel/preset-env",
        {
          targets: "last 2 versions, ie 11",
          modules: false,
        },
      ],
    ],
  },
};

const mainStyleLoaders = [
  {
    loader: "css-loader",
    options: {
      sourceMap: true,
    },
  },
  {
    loader: "postcss-loader",
    options: {
      config: {
        path: "./configs",
      },
      sourceMap: true,
    },
  },
  {
    loader: "sass-loader",
    options: {
      sourceMap: true,
    },
  },
];

const prodStyleLoader = ExtractTextPlugin.extract({
  use: mainStyleLoaders,
});

const devStyleLoader = ["css-hot-loader"].concat(
  ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: ["style-loader", ...mainStyleLoaders],
  })
);

module.exports = (env) => ({
  devtool: "source-map",
  devServer: {
    port: settings.hostPort,
    stats: "minimal",
    hot: true,
    contentBase: settings.distPath,
    publicPath: "/assets/",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  entry: settings.srcPath,
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        enforce: "pre",
        loader: "tslint-loader",
        options: {
          configFile: "./configs/tslint.json",
        },
      },
      {
        test: /\.(tsx|ts)?$/,
        loader: "awesome-typescript-loader",
        options: {
          babelCore: "@babel/core",
          babelOptions: settings.babelOptions,
          configFileName: "./configs/tsconfig.json",
          useBabel: true,
        },
      },
      {
        exclude: [/node_modules\/(?!(swiper|dom7)\/).*/],
        test: /\.jsx?$/,
        use: [
          {
            loader: "babel-loader",
            options: settings.babelOptions,
          },
        ],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: env.mode === "prod" ? prodStyleLoader : devStyleLoader,
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(ttf|woff|woff2|eot|oft)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "fonts/[name].[ext]",
            },
          },
        ],
      },
    ],
  },
  output: {
    path: settings.distPath,
    filename: "app.js",
    publicPath:
      env.mode === "prod"
        ? "./"
        : "http://localhost:" + settings.hostPort + "/assets/",
    hotUpdateChunkFilename: "hot/hot-update.js",
    hotUpdateMainFilename: "hot/hot-update.json",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json", ".css", ".scss"],
  },
  plugins:
    env.mode === "prod"
      ? [new ExtractTextPlugin("/style.css")]
      : [
          new ExtractTextPlugin({
            filename: "/style.css",
            disable: true,
          }),
          new webpack.HotModuleReplacementPlugin(),
        ],
  stats: "minimal",
});
