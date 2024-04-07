---
to: "<%= has_storybook ? `${h.src()}/${h.changeCase.lower(name)}/.storybook/plugins/story-handler.js` : null %>"
---
import { useParameter, useEffect } from '@storybook/preview-api';
import DrupalAttribute from 'drupal-attribute';
import svgSprite from '../../images/sprite.svg';

// Components objects global storage.
let componentsImport = {};
// Global components storage.
let componentsData = {};
// Components yml parsed data.
let componentYmlsData = {};

export { faker } from '@faker-js/faker';
export { DrupalAttribute };
export { useEffect };

const getComponentsImport = (name = null) => {
  if (Object.keys(componentsImport).length === 0) {
    componentsImport = importComponents();
  }
  if (Array.isArray(name) && name.length === 2) {
    name = name[0];
  }
  return componentsImport[name] || null;
};

export const argsDecoder = (setting, selected) => {
  if (setting.options) {
    if (typeof selected === 'object') {
      return selected.map((value) => findValueInObject(setting.options, value));
    }
    return findValueInObject(setting.options, selected);
  }
  return selected;
};

const findValueInObject = (obj, value) => {
  return Object.keys(obj).find((key) => obj[key] === value || key === value);
};

export const defArgTypes = (src) => {
  const component = Object.values(src)[0];
  const argTypes = {};
  if (component.settings) {
    Object.entries(component.settings).forEach(([argName, argValue]) => {
      if (argValue.type !== 'attributes') {
        argTypes[argName] = {
          ...(argValue.label && { name: argValue.label }),
          ...(argValue.type && {
            control: { type: transformDrupalControlToStorybook(argValue.type) },
          }),
          ...(argValue.options && {
            options: Object.values(argValue.options),
          }),
          ...(argValue.default_value && {
            defaultValue: argValue.default_value,
          }),
        };
      }
    });
  }
  return argTypes;
};

// This is default storygenerator
// still possible to use `componentRender` and `paramsLoader` as is
export const defRender = (args, context, twigPath = null) => {
  let component = {};
  let componentName = '';
  if (typeof context === 'string') {
    if (context.substring(0, 4) === 'http') {
      componentName = context.split('/').pop().split('.').shift();
    } else {
      componentName = context;
    }
  } else {
    // Load arg types dynamically.
    componentName = context.parameters.fileName
      .split('/')
      .pop()
      .split('.')
      .shift();
  }
  component = Object.values(getYmlData(componentName))[0];
  let template = useParameter('Twig').twig({
    ref: component && component.use ? component.use : twigPath,
    allowInlineIncludes: true,
  });

  const data = {
    attributes: new DrupalAttribute(),
    <%= h.changeCase.lower(name) %>_svg_sprite: svgSprite,
    <%= h.changeCase.camelCase(name) %>SvgSprite: svgSprite,
  };

  if (component && component.settings) {
    Object.entries(component.settings).forEach(([argName, argValue]) => {
      if (argValue.type === 'attributes') {
        data[argName] = new DrupalAttribute();
      }
      if (argValue.default_value) {
        data[argName] = argValue.default_value;
      }
    });
  }
  Object.entries(args).forEach(([argName, argValue]) => {
    if (argName === 'attributes') {
      Object.entries(args[argName]).forEach(([attrName, attrValue]) => {
        if (attrName === 'class') {
          data[argName].addClass(attrValue);
        } else {
          data[argName].setAttribute(attrName, attrValue);
        }
      });
    } else if (component && component.settings && component.settings[argName]) {
      data[argName] = argsDecoder(component.settings[argName], argValue);
    } else {
      data[argName] = argValue;
    }
  });

  data.component = component;
  return {
    template,
    data,
  };
};

// Helper to render inner component without import.
export const renderComponent = (name, args = {}) => {
  // @todo research Promise usage and dynamic import on demand.
  const component = getComponentsImport(name);
  let defaultStoryName = 'Basic';
  let componentName = name;
  if (Array.isArray(name) && name.length === 2) {
    componentName = name[0];
    defaultStoryName = name[1];
  }
  if (
    component[defaultStoryName] &&
    typeof component[defaultStoryName].render == 'function'
  ) {
    return component[defaultStoryName].render(args, componentName);
  }
  return '';
};

// Transforms Drupal module style to storybook
// from:
// https://www.drupal.org/project/ui_patterns_settings
// to:
// https://storybook.js.org/docs/7.0/html/api/argtypes

const transformDrupalControlToStorybook = (type) => {
  switch (type) {
    case 'radios':
      return 'radio';
    case 'checkboxes':
      return 'check';
    case 'textfield':
      return 'text';
  }
  return type;
};

// Helpers to needed imports.

// Resolving order of importing assets. Can't use combined glob here, because
// assets living in different folders (aka.: theme, ui_patterns, suggestions, etc.).
// So we need to be sure - first, atoms will be imported, then molecules, then organisms,
// etc.
export function importAssets() {
  import.meta.glob('../../templates/components/**/a-*/*.src.css', {
    eager: true,
  });
  import.meta.glob('../../templates/components/**/h-*/*.src.css', {
    eager: true,
  });
  import.meta.glob('../../templates/components/**/m-*/*.src.css', {
    eager: true,
  });
  import.meta.glob('../../templates/components/**/o-*/*.src.css', {
    eager: true,
  });
  import.meta.glob('../../templates/components/**/t-*/*.src.css', {
    eager: true,
  });
  import.meta.glob('../../templates/components/**/p-*/*.src.css', {
    eager: true,
  });
  const libsJS = import.meta.glob(['../../templates/components/**/*.src.js']);

  for (const path in libsJS) {
    libsJS[path]();
  }
}

export function importComponents() {
  if (Object.keys(componentsData).length !== 0) {
    return componentsData;
  }
  const componentsImportData = import.meta.glob(
    [
      '../../templates/components/**/*.stories.js',
      '!../../templates/components/globals.stories.js',
    ],
    { eager: true },
  );
  for (const path in componentsImportData) {
    const name = path.split('/').pop().split('.').shift();
    componentsData[name] = componentsImportData[path];
    delete componentsImportData[path];
  }
  return componentsData;
}

export function getYmlData(name) {
  if (Object.keys(componentYmlsData).length !== 0) {
    return name ? componentYmlsData[name] || null : componentYmlsData;
  }
  const componentYmls = import.meta.glob(
    [
      '../../templates/components/**/*.yml',
      '!../../templates/components/**/config.*.yml',
    ],
    {
      import: 'default',
      eager: true,
    },
  );

  for (const path in componentYmls) {
    let folder = path.split('/');
    let name = folder.pop();
    name = folder.pop();
    componentYmlsData[name] = componentYmls[path];
    delete componentYmls[path];
  }
  return name ? componentYmlsData[name] || null : componentYmlsData;
}
