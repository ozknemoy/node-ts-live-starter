const path = require('path');


module.exports = {
  mode: "none",// в этом режиме нет сжатия и есть игнор если в блде проблемы(пути в несте)
  target: 'node',
  node: {
    __dirname: false,
    __filename: false
  },
  entry: './dist/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.bundle.js'
  },
};