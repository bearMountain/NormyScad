const path = require('path');

module.exports = {
  entry: './src/NormyScad.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  node: {
    fs: 'empty'
  }
};