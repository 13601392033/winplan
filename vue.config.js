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
            "vant":"Vant"
        },
        resolve: {
            alias: {
                '@': resolve('src') // 设置 `@` 指向 `src` 目录
            }
        },
        devtool: "none"
    },
    devServer: {
        port: '8080', // 设置端口号
        proxy: {
            '/api': {
              target: 'localhost:9011/', //API服务器的地址
              ws: true, //代理websockets
              changeOrigin: true, // 是否跨域，虚拟的站点需要更管origin
              pathRewrite: {
                // '^/api'是一个正则表达式，表示要匹配请求的url中，全部'http://localhost:8081/api' 转接为 http://localhost:8081/
                '^/api': '',
              }
            }
        },
    }
}
