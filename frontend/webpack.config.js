const { join, resolve } = require('path');
const { styleLoader, svgLoader, babelLoader, fontsLoader, imagesLoader } = require('./webpack/loaders');
const { developmentPlugins, productionPlugins } = require('./webpack/plugins');

const { getFileName } = require('./webpack/utils');

const { NODE_ENV } = process.env;
const nodeEnv = NODE_ENV || 'development';

const isProduction = nodeEnv === 'production';
const fileName = getFileName(isProduction);

const context = resolve(__dirname);
const srcPath = resolve(context, 'src');
const appPath = resolve(srcPath, 'application', 'index.jsx');
const stylesPath = resolve(srcPath, 'application', 'styles');
const iconsPath = join(srcPath, 'common', 'components', 'Icon', 'assets');
const faviconPath = resolve(context, 'static', 'images', 'favicons');
const manifestPath = resolve(context, 'static', 'manifest.json');
const outputPath = resolve(context, 'dist');

const scriptsFileName = join('scripts', `${fileName}.js`);
const stylesFileName = join('styles', `${fileName}.css`);
const fontsFileName = join('fonts', '[name].[ext]');
const imagesFileName = join('images', '[name].[ext]');
const viewFileName = 'index.html';

const plugins = developmentPlugins(stylesFileName, viewFileName);

module.exports = {
  entry: appPath,

  output: {
    filename: scriptsFileName,
    path: outputPath,
    publicPath: '',
  },

  resolve: {
    extensions: ['.js', '.jsx', '.css', '.less'],
    alias: {
      application: resolve(srcPath, 'application'),
      common: resolve(srcPath, 'common'),
      pages: resolve(srcPath, 'pages'),
    }
  },

  module: {
    rules: [
      babelLoader(),
      svgLoader(iconsPath, imagesFileName),
      fontsLoader(fontsFileName),
      imagesLoader(imagesFileName),
      styleLoader(isProduction, stylesPath)
    ]
  },

  plugins: isProduction ? plugins.concat(productionPlugins(faviconPath, manifestPath, outputPath)) : plugins,

  devServer: {
    contentBase: outputPath,
    compress: true,
    port: 3020,
    historyApiFallback: true
  }
};
