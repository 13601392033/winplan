const path = require('path')
const resolve = dir => path.resolve(__dirname, dir);
module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
              '@': resolve('src') // 设置 `@` 指向 `src` 目录
            }
          },
    }
}