module.exports = {
  plugins: [
    // require('postcss-plugin-px2rem')({remUnit: 16}),
    require('./plugins/mf_big_font')({ selector: '.isCaring' })
  ]
}