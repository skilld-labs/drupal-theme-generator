---
to: "<%= has_storybook ? `${h.src()}/${h.changeCase.lower(name)}/.storybook/main.js` : null %>"
---
import content from '@originjs/vite-plugin-content';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { sync } from 'glob';

const dir = dirname(fileURLToPath(import.meta.url));

let aliases = {};
sync(`templates/components/**/*.stories.js`).forEach((component) => {
  aliases[`@${component.split('/').pop().replace('.stories.js', '')}`] =
    path.join(dir, '../', component);
  const split = component.split('/');
  split.pop();
  aliases[`@${component.split('/').pop().replace('.stories.js', '')}-folder`] =
    path.join(dir, '../', split.join('/'));
});

export default {
  stories: ['../templates/components/**/*.stories.js'],
  addons: [
    '@storybook/addon-essentials',
    './plugins/controls/manager.js',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/html-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(config, { configType }) {
    const { mergeConfig } = await import('vite');

    return mergeConfig(config, {
      plugins: [content()],
      resolve: {
        alias: {
          '@root': path.join(dir, '../'),
          '@images': path.join(dir, '../', 'images'),
          '@fonts': path.join(dir, '../', 'fonts'),
          '@story-handler': path.join(dir, '/', 'plugins/story-handler.js'),
          ...aliases,
        },
      },
    });
  },
};
