const path = require("path");
const webpack = require("webpack");
const hmr = new webpack.HotModuleReplacementPlugin();

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: "/",
  lintOnSave: true,
  outputDir: path.resolve(__dirname, "./server/dist"),
  chainWebpack: config => {
    config.resolve.alias.set("@$", resolve("src"));
    config.module.rules.delete("svg");
    config
      .entry("app")
      .clear()
      .add("webpack-hot-middleware/client?quiet=true")
      .add("webpack/hot/only-dev-server")
      .add("./src/main.js");
    config.module
      .rule("svg-sprite-loader")
      .test(/\.svg$/)
      .include.add(resolve("src/assets/icon"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({ symbolId: "[name]" });
    config.module
      .rule("images")
      .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
      .exclude.add(resolve("src/assets/icon"));
    config.entry.app = ["babel-polyfill", "./src/main.js"];
    config.plugin("hot").use(hmr);
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [path.resolve(__dirname, "./src/scss/_variables.scss")]
    }
  }
};
