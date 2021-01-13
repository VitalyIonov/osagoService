const { resolve } = require('path');
const CssExtractPlugin = require('mini-css-extract-plugin');

const { getStyleVars } = require('./utils');

function styleLoader(isProduction, stylesPath) {
  const cssLoader = [
    CssExtractPlugin.loader,
    {
      loader: 'css-loader',
      query: {
        importLoaders: 1
      }
    },
    {
      loader: 'less-loader',
      options: {
        lessOptions: {
          javascriptEnabled: true,
          globalVars: getStyleVars()
        },
        sourceMap: !isProduction
      },
    },
    {
      loader: 'style-resources-loader',
      options: {
        patterns: [
          resolve(stylesPath, 'mixins.less'),
        ]
      }
    }
  ];

  return {
    test: /\.(css|less)(\?.+)?$/,
    use: isProduction
      ? cssLoader.concat({
        loader: 'postcss-loader'
      })
      : cssLoader
  };
}

function fontsLoader(name) {
  return {
    test: /\.(otf|eot|ttf|woff|woff2)(\?.+)?$/,
    loader: {
      loader: 'url-loader',
      query: {
        name,
        limit: 2048,
        emitFile: true,
        esModule: false
      }
    }
  };
}

const svgLoader = (iconsPath, spriteFileName) => ({
  test: /\.svg$/,
  oneOf: [
    {
      include: iconsPath,
      loader: 'svg-sprite-loader'
    },
    {
      loader: 'url-loader',
      query: {
        limit: 10 * 1024,
        name: spriteFileName
      }
    }
  ]
});

function imagesLoader(name) {
  return {
    test: /\.(png|jpg|gif)(\?.+)?$/,
    loader: {
      loader: 'url-loader',
      query: {
        limit: 10 * 1024,
        name
      }
    }
  };
}

function babelLoader() {
  return {
    test: /\.(js|jsx)$/,
    exclude: /(node_modules)/,
    loader: 'babel-loader'
  };
}

module.exports = {
  styleLoader,
  svgLoader,
  fontsLoader,
  imagesLoader,
  babelLoader
};
