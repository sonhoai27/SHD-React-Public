const path = require("path");
const fs = require("fs");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
// config after eject: we're in ./config/
module.exports = {
  appPath: '/',
  appProdPath: '/public',
  appDevPath: '/public',
  appHtml: resolveApp("public/index.html"),
  appIndexJs: resolveApp("src/index.tsx"),
  appSrc: resolveApp("src")
};
