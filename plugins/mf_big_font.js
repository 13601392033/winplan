var postcss = require('postcss');
module.exports = postcss.plugin('postcss-big-font', function (opts) {
  opts = opts || {};
  return function (root /* , result*/) {
      root.append(`${opts.selector} {font-size: 12px}`)
      root.walkRules(rule => {
          // if (rule.selector.startsWith('.font_size_')) {
          //   // rule.remove();
          // } else if (!rule.selector.includes(opts.selector)) {
          //   rule.walkDecls(/^font-size?$/, decl => {
          //     if (decl.value.includes('px')) {
          //       // const next = decl.next() || {}
          //       // if (next.prop === 'line-height' && next.value.includes('px')) {
          //       //   let baseLineHeight = '--caring-line-height';
          //       //   try {
          //       //     let lineHeight = next.value;
          //       //     let fontSize = decl.value;
          //       //     lineHeight = Number(lineHeight.replace('px', ''))
          //       //     fontSize = Number(fontSize.replace('px', ''))
          //       //     if((lineHeight === 68 && fontSize === 48) || (fontSize === 28 && lineHeight === 40)) {
          //       //       baseLineHeight = '--caring-line-height-special';
          //       //     }
          //       //   } catch (e) {}
          //       //   decl.next().value = `calc(var(${baseLineHeight}) + ${next.value})`
          //       // }
          //       decl.value = `calc(var(--caring-font) + ${decl.value})`
          //     }
          //     })
          //     // 解析注释
          //     // let isCaringCss = ''
          //     // rule.walkComments(comment => {
          //     //   if (comment.text.includes('isCaring')) {
          //     //     isCaringCss += comment.text.replace('isCaring', '').replace(/\*/g, '').trim() + ';';
          //     //     comment.remove();
          //     //   }
          //     //   root.append(`:global(${opts.selector}) ${rule.selector} {${isCaringCss}}`);
          //     // });
          // }
        rule.walkDecls(/^font-size?$/, decl => {
          if (decl.value.includes('px')) {
            decl.value = `calc(var(--caring-font) + ${decl.value})`
          }
        })
      });
    };
});
