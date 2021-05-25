const path = require('path')
const resolve = dir => path.resolve(__dirname, dir);
module.exports = {
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
        devtool:"cheap-module-source-map"
    }
}
