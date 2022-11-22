const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  transpileDependencies: ["vuetify"],
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.csv$/,
          loader: "csv-loader",
          options: {
            dynamicTyping: true,
            header: true,
            skipEmptyLines: true,
          },
        },
      ],
    },
    plugins: [new NodePolyfillPlugin()],
  },
};
