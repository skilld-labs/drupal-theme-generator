---
to: "<%= has_storybook ? `${h.src()}/${h.changeCase.lower(name)}/.storybook/main.js` : null %>"
---
import content from '@originjs/vite-plugin-content';

const path = require('path');
const { mergeConfig } = require('vite');
import { sync } from 'glob';

let aliases = {};
sync(`templates/components/**/*.stories.js`).forEach((component) => {
  aliases[`@${component.split('/').pop().replace('.stories.js', '')}`] =
    path.join(__dirname, '../', component);
  const split = component.split('/');
  split.pop();
  aliases[`@${component.split('/').pop().replace('.stories.js', '')}-folder`] =
    path.join(__dirname, '../', split.join('/'));
});

module.exports = {
  stories: ['../templates/components/**/*.stories.js'],
  addons: ['@storybook/addon-essentials', './plugins/controls/manager.js'],
  framework: {
    name: '@storybook/html-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(config, { configType }) {
    return mergeConfig(config, {
      plugins: [content()],
      resolve: {
        alias: {
          '@root': path.join(__dirname, '../'),
          '@images': path.join(__dirname, '../', 'images'),
          '@fonts': path.join(__dirname, '../', 'fonts'),
          '@story-handler': path.join(
            __dirname,
            '/',
            'plugins/story-handler.js',
          ),
          ...aliases,
        },
      },
    });
  },
};
