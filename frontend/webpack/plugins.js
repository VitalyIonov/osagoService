const webpack = require('webpack');
const { join, resolve } = require('path');
const CssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

function developmentPlugins(stylesFileName, viewFileName) {
  return [
    // new BundleAnalyzerPlugin(),
    new CssExtractPlugin({
      filename: stylesFileName,
      allChunks: true
    }),
    new SpriteLoaderPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: resolve(__dirname, '..', 'views', 'index.html'),
      filename: viewFileName,
    }),
    // изучить подробнее
    new PreloadWebpackPlugin({
      rel: 'prefetch',
      include: 'asyncChunks'
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ru/)
  ];
}

function productionPlugins(faviconPath, manifestPath, outputPath) {
  return [
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: {
        discardUnused: { fontFace: false },
        discardComments: { removeAll: true }
      }
    }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     { from: faviconPath, to: resolve(outputPath, 'favicons') },
    //     { from: manifestPath, to: resolve(outputPath) }
    //   ]
    // })
  ];
}

module.exports = {
  developmentPlugins,
  productionPlugins
};
