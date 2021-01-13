const fs = require('fs');
const { join } = require('path');
const lessToJs = require('less-vars-to-js');

const getFileName = isProduction => (isProduction ? '[name].[chunkhash].min' : '[name]');

const getStyleVars = () => {
  const varsPath = join('src', 'application', 'styles', 'variables.less');
  const paletteLess = fs.readFileSync(varsPath, 'utf8');

  return lessToJs(paletteLess, { stripPrefix: true });
};

module.exports = {
  getFileName,
  getStyleVars
};
