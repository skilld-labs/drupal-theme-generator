---
to: <%= h.src() %>/<%= h.changeCase.lower(name) %>/svgo.config.js
---
module.exports = {
  js2svg: {
    indent: 2,
    pretty: true,
  },
  plugins: [
    {
      name: 'removeXMLSpace',
      fn: () => ({
        element: {
          enter: (node) => {
            if (node.attributes['xml:space']) {
              delete node.attributes['xml:space'];
            }
          },
        },
      }),
    },
    {
      name: 'preset-default',
      params: {
        overrides: {
          inlineStyles: {
            onlyMatchedOnce: false,
          },
          removeDoctype: false,
        },
      },
    },
    {
      name: 'removeAttrs',
      params: {
        attrs: '(fill|fill-rule|stroke)',
      },
    },
  ],
};
