const path = require('path')
const resolve = dir => path.resolve(__dirname, dir);
const CompressionWebpackPlugin = require("compression-webpack-plugin")

module.exports = {
    //压缩文件配置zwc .gz
    chainWebpack: (config) => {
        // 生产环境，开启js\css压缩
        if (process.env.NODE_ENV === 'production') {
            const imagesRule = config.module.rule('images')
            imagesRule
                .use('image-webpack-loader')
                .loader('image-webpack-loader')
                .options({
                    bypassOnDebug: true
                })
                .end()
        }
    },
    configureWebpack: {
        plugins: [
            new CompressionWebpackPlugin({
                /* [file]被替换为原始资产文件名。
                    [path]替换为原始资产的路径。
                    [dir]替换为原始资产的目录。
                    [name]被替换为原始资产的文件名。
                    [ext]替换为原始资产的扩展名。
                    [query]被查询替换。*/
                filename: '[path].gz[query]',
                //压缩算法
                algorithm: 'gzip',
                //匹配文件
                test: /\.js$|\.css$|\.html$/,
                //压缩超过此大小的文件,以字节为单位
                threshold: 10240,
                minRatio: 0.8,
                //删除原始文件只保留压缩后的文件
                deleteOriginalAssets: false
            })
        ],
        externals: {
            "vue": "Vue",
            "ElementPlus": "ElementPlus",
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
              //target: 'http://1.117.21.31:9011/', //API服务器的地址
              target: 'http://localhost:9011/',
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
