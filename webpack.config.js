var path = require("path");
var SRC_DIR = path.join(__dirname, "/client/src");
var DIST_DIR = path.join(__dirname, "/client/dist");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: "bundle.js",
    path: DIST_DIR
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Add this line to include both .js and .jsx files
  },
  module: {
    rules: [
      {
        test: [/\.jsx?$/], // Modify this line to include both .js and .jsx files
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", ["@babel/preset-react", {
              "runtime": "automatic" // Add this line to enable the new JSX transform
            }]],
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      }
    ]
  }
};
