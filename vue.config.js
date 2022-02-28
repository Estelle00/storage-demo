const path = require("path");
// node运行路径
const rootPath = path.resolve(process.cwd(), 'node_modules');
const uniManifestJSON = require(path.resolve(rootPath, "@dcloudio/uni-cli-shared/lib/manifest.js")).getManifestJson();
module.exports = {
  chainWebpack(config){
    config
      .plugin("define")
      .tap(config => {
        config[0]["process.env"].versionName = JSON.stringify(uniManifestJSON.versionName);
        return config
    })
  }
};
