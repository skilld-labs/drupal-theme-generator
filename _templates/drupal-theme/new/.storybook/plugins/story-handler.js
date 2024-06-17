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
    storyName: context.name || 'Basic',
    componentName: componentName,
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

export const printComponentComment = (data) => {
  let fields = [];
  let settings = [];

  const createTextTable = (headers, rows) => {
    function calculateMaxLengths(headers, rows) {
      const lengths = headers.map((header) => header.length);

      rows.forEach((row) => {
        row.forEach((cell, index) => {
          if (cell.length > lengths[index]) {
            lengths[index] = cell.length;
          }
        });
      });

      return lengths;
    }

    function padCell(content, length) {
      return ' ' + content + ' '.repeat(length - content.length) + ' ';
    }

    const maxLengths = calculateMaxLengths(headers, rows);
    const topBorder = '='.repeat(
      maxLengths.reduce((sum, len) => sum + len + 3, 1),
    );
    const headerRow = headers
      .map((header, index) => padCell(header, maxLengths[index]))
      .join('|');
    const separatorRow = '-'.repeat(
      maxLengths.reduce((sum, len) => sum + len + 3, 1),
    );
    const dataRows = rows.map((row) => {
      return row
        .map((cell, index) => padCell(cell, maxLengths[index]))
        .join('|');
    });

    const table = [
      topBorder,
      `|${headerRow}|`,
      topBorder,
      ...dataRows.map((row) => `|${row}|`),
      separatorRow,
    ];

    return table.join('\n');
  };

  const $fieldsHeadings = [
    'Field label',
    'Field machine name',
    'If used in render',
  ];
  const $settingsHeadings = [
    'Setting label',
    'Setting machine name',
    'Value label',
    'Value machine name',
  ];

  if (data.component.fields) {
    Object.keys(data.component.fields).forEach((key) => {
      fields.push([
        data.component.fields[key]?.label,
        key,
        data[key] ? '✅' : '❌',
      ]);
    });
  }

  if (data.component.settings) {
    Object.keys(data.component.settings).forEach((key) => {
      if (!data[key]) {
        const defValue = data.component.settings[key].default_value;
        if (defValue) {
          const readableDefValue =
            data.component.settings[key]?.options[defValue] || defValue;
          я;
          settings.push([
            data.component.settings[key]?.label,
            key,
            readableDefValue,
            defValue,
          ]);
        } else {
          settings.push([data.component.settings[key]?.label, key, '❌', '❌']);
        }
      } else {
        const value = data[key];
        if (typeof value !== 'object') {
          const readableValue =
            data.component.settings[key]?.options?.[value] || value;
          settings.push([
            data.component.settings[key]?.label,
            key,
            readableValue,
            value,
          ]);
        }
      }
    });
  }

  const componentProps =
    componentsData[data.componentName] ||
    window.allStories[
      Object.keys(window.allStories).find((a) =>
        a.endsWith(`${data.componentName}.stories.js`),
      )
    ];
  ['default', data.storyName].forEach((type) => {
    if (componentProps[type] && componentProps[type]?.argTypes) {
      Object.keys(componentProps[type].argTypes).forEach((key) => {
        settings.push([
          componentProps[type].argTypes[key]?.name,
          key,
          componentProps[type].argTypes[key]?.control?.type === 'boolean'
            ? data[key]
              ? 'true'
              : 'false'
            : data[key]
              ? `${data[key]}`
              : 'Not selected',
          componentProps[type].argTypes[key]?.control?.type === 'boolean'
            ? data[key]
              ? 'true'
              : 'false'
            : data[key]
              ? `${data[key]}`
              : 'Not selected',
        ]);
      });
    }
  });

  Object.keys(data).forEach((key) => {
    if (
      [
        'component',
        'storyName',
        'componentName',
        '<%= h.changeCase.lower(name) %>SvgSprite',
        '<%= h.changeCase.lower(name) %>_svg_sprite',
      ].includes(key)
    ) {
      return;
    }

    if (
      (data.component.fields && data.component.fields[key]) ||
      (data.component.settings && data.component.settings[key])
    ) {
      return;
    }

    if (
      componentProps.default &&
      componentProps.default?.argTypes &&
      componentProps.default?.argTypes[key]
    ) {
      return;
    }

    if (
      componentProps[data.storyName] &&
      componentProps[data.storyName]?.argTypes &&
      componentProps[data.storyName]?.argTypes[key]
    ) {
      return;
    }

    if (data[key].constructor.name === 'DrupalAttribute') {
      return;
    }

    if (data.componentName === 'a-select') {
      return;
    }

    fields.push([key, key, '✅']);
  });

  const fieldsRender =
    fields.length > 0
      ? `\n💥 Fields:\n${createTextTable($fieldsHeadings, fields)}\n`
      : '';
  const settingsRender =
    settings.length > 0
      ? `\n💣 Settings:\n${createTextTable($settingsHeadings, settings)}\n`
      : '';
  return `
<!--

📕 Component name: ${data.component.label} (${data.componentName})
📗 Twig file: ${data.component.use.split('/').pop()}
📘 Story name: ${data.storyName}
${fieldsRender}${settingsRender}
-->
  `;
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

export function importComponents() {
  if (Object.keys(componentsData).length !== 0) {
    return componentsData;
  }
  const componentsImportData = window.allStories;
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
  const componentYmls = window.allComponentYMLs;

  for (const path in componentYmls) {
    let folder = path.split('/');
    let name = folder.pop();
    name = folder.pop();
    componentYmlsData[name] = componentYmls[path];
    delete componentYmls[path];
  }
  return name ? componentYmlsData[name] || null : componentYmlsData;
}
