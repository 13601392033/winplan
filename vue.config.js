const path = require('path')
const resolve = dir => path.resolve(__dirname, dir);
const CompressionWebpackPlugin = require("compression-webpack-plugin")
module.exports = {
    //压缩文件配置zwc .gz
    chainWebpack: (config) => {
        // 生产环境，开启js\css压缩
        if (process.env.NODE_ENV === 'production') {
        config.plugin('compressionPlugin').use(new CompressionWebpackPlugin({
            test: /\.(js|css|less)$/, // 匹配文件名
            threshold: 100240, // 对超过100k的数据压缩
            minRatio: 0.8,
            //deleteOriginalAssets: true // 删除源文件
        }))
        }
    },
    configureWebpack: {
        externals: {
            "vue": "Vue",
            "ElementPlus": "ElementPlus",
            "axios": "axios",
            
        },
        resolve: {
            alias: {
              '@': resolve('src') // 设置 `@` 指向 `src` 目录
            }
        },
        devtool:"none"
    }
}
