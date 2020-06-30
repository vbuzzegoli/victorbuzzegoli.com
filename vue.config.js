const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = {
  configureWebpack: {
    plugins: [
      new FaviconsWebpackPlugin('./src/assets/png/vbz.png')
    ]
  }
}
