---
to: "<%= has_storybook ? `${h.src()}/${h.changeCase.lower(name)}/.storybook/preview.js` : null %>"
---
import '../color/colors.css';
import '../css/styles.src.css';
import svgSprite from '../images/sprite.svg';
import breakpoints from '../<%= h.changeCase.lower(name) %>.breakpoints.yml';
import Twig from 'twig';
import { addDrupalExtensions } from 'drupal-twig-extensions/twig';
import DrupalAttributes from 'drupal-attribute';
import once from '@drupal/once';
import { importAssets, getYmlData } from './plugins/story-handler';

window.once = once;
addDrupalExtensions(Twig, {
  // Optionally, set options to configure how the Drupal
});
const allTwigPatternTemplates = import.meta.glob(
  '../templates/components/**/*.html.twig',
  { as: 'raw', import: 'default', eager: true },
);

importAssets();

// here we initiate all twig templates to save them in cache of Twig.Templates.registry
// and get by reference in render of story-handler.js
const namespaces = [
  '../templates/components/layouts',
  '../templates/components/suggestions',
  '../templates/components/theme',
  '../templates/components/ui_patterns',
  '../templates/components/uncategorized',
];

for (const [path, data] of Object.entries(allTwigPatternTemplates)) {
  Twig.twig({
    attributes: new DrupalAttributes(),
    id: path.replace(
      namespaces.filter((a) => path.includes(a))[0],
      '@component',
    ),
    data: data,
    allowInlineIncludes: true,
  });
}

const <%= h.changeCase.camelCase(name) %>Breakpoints = Object.keys(breakpoints).reduce(
  (a, i) =>
    Object.assign(a, {
      [i.split('.').pop()]: breakpoints[i].mediaQuery,
    }),
  {},
);

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  AllArgTypes: getYmlData(),
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  // Maybe load only Twig.Template.Registry somehow here.
  Twig: { ...Twig },
  backgrounds: {
    values: [{ name: 'grey', value: '#ddd' }],
  },
  options: {
    storySort: (a, b) => {
      if (a.id.startsWith('templates') && b.id.startsWith('pages')) {
        return -1;
      }
      return a.id === b.id
        ? 0
        : a.id.localeCompare(b.id, undefined, { numeric: true });
    },
  },
};

window.Drupal = {
  behaviors: {},
};
window.drupalSettings = {
  <%= h.changeCase.camelCase(name) %>SvgSprite: svgSprite,
  <%= h.changeCase.camelCase(name) %>Breakpoints,
};

((Drupal, drupalSettings) => {
  Drupal.t = function (str) {
    return str;
  };

  Drupal.throwError = function (error) {
    setTimeout(function () {
      throw error;
    }, 0);
  };

  Drupal.attachBehaviors = function (context, settings) {
    context = context || document;
    settings = settings || drupalSettings;
    let behaviors = Drupal.behaviors;
    Object.keys(behaviors || {}).forEach((i) => {
      if (typeof behaviors[i].attach === 'function') {
        // Don't stop the execution of behaviors in case of an error.
        try {
          behaviors[i].attach(context, settings);
        } catch (e) {
          Drupal.throwError(e);
        }
      }
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    Drupal.attachBehaviors(document, drupalSettings);
    Drupal.behaviors = new Proxy(Drupal.behaviors, {
      set(target, prop, value) {
        // Drupal.attachBehaviors(document, drupalSettings, key);
        target[prop] = value;
        Drupal.attachBehaviors(document, drupalSettings);
        return true;
      },
    });
  });
})(Drupal, window.drupalSettings);
