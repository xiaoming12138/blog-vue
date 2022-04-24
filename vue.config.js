const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'primary-color': '#00d6bf',
          'link-color': '#00d6bf',
          'body-background': '#f0f2f5',
          'modal-body-padding': '12px'
        },
        javascriptEnabled: true
      }
    },
    extract: {
      filename: `xiaoming__[chunkhash:8]__[name]__entry.css`,
      chunkFilename: `xiaoming__[chunkhash:8]__[name].css`
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    output: {
      // 输出重构  打包编译后的 文件名称
      filename: `xiaoming__[chunkhash:8]__[name]__entry.js`,
      chunkFilename: `xiaoming__[chunkhash:8]__[name].js`
    },
    plugins: [
      new CompressionPlugin({
        /* [file]被替换为原始资产文件名。
           [path]替换为原始资产的路径。
           [dir]替换为原始资产的目录。
           [name]被替换为原始资产的文件名。
           [ext]替换为原始资产的扩展名。
           [query]被查询替换。*/
        filename: 'xiaoming_[path].gz[query]',
        // 压缩算法
        algorithm: 'gzip',
        // 匹配文件
        test: /\.js$|\.css$|\.html$/,
        // 压缩超过此大小的文件,以字节为单位
        threshold: 1024*5,
        minRatio: 0.8
        // 删除原始文件只保留压缩后的文件
        // deleteOriginalAssets: true
      })
    ]
  },
  devServer: {
    disableHostCheck: true
  },
  chainWebpack(config) {
    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              maxSize: 1024*500,         //字节 引入的文件大于100kb才进行分割
              // automaticNameDelimiter: '__', //缓存组和生成文件名称之间的连接符
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          config.optimization.runtimeChunk('single')
          config.plugin('ScriptExtHtmlWebpackPlugin').after('html').use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
            // inline: /runtime\..*\.js$/
          }]).end()
        }
      )
  }
}
