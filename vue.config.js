const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
              '@': resolve(__dirname, 'src') // 设置 `@` 指向 `src` 目录
            }
          },
    }
}