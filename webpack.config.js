const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  mode: "development",
  // Where webpack enters to find your files
  entry: {
    bundle: path.resolve(__dirname, "src/index.js"),
  },
  /*
  Where webpack will output your bundled files
   - [name] refers to the name of the entry title
   - [contenthash] the numbers after the bundle name
   - In index.html - it places the bundle name automatically into index.html
  */
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name][contenthash].js",
    clean: true,
    assetModuleFilename: "[name][ext]",  // we need this to maintain the name of the assets
  },
  /*
   - Devtools for the dev server, lists the commands when npm run dev is used
   - Doesn't run directly from the dist files
  */
  devtool: "source-map",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  /* Terminal Commands used:
   - npm i -D sass style-loader css-loader sass-loader
   - npm i -D babel-loader @babel/core @babel/preset-env
  */
  module: {
    rules: [
      {
        // any file that ends with .scss - we are going to apply these loaders
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        // Any file that has as .js extension
        // We don't want to mess with node_modules
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      // Determine the type of assets allowed
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  /*
   - When build runs, injects template into index.html.
   - You can find the template in the src folder
  */
  plugins: [
    new HtmlWebpackPlugin({
      title: "Webpack App",
      filename: "index.html",
      template: "src/template.html",
    }),
    // Provides an analyzer after giving webpack commands
    new BundleAnalyzerPlugin(),
  ],
};
