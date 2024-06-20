---
to: "<%= has_storybook ? `${h.src()}/${h.changeCase.lower(name)}/templates/components/suggestions/m-form-element/m-form-element.stories.js` : null %>"
---
import {
  defRender,
  printComponentComment,
  renderComponent as r,
  faker,
  DrupalAttribute,
  useEffect,
} from '@story-handler';

export default {
  title: 'Molecules / Form element',
  parameters: {
    // layout: 'fullscreen',
    // backgrounds: { default: 'grey' },
  },
  argTypes: {
    type: {
      name: 'Form element type',
      options: [
        'text',
        'email',
        'search',
        'password',
        'textarea',
        'select',
        'checkbox',
        'radio',
      ],
      control: {
        type: 'radio',
      },
    },
    required: {
      name: 'Required',
      control: {
        type: 'boolean',
      },
    },
    disabled: {
      name: 'Disabled',
      control: {
        type: 'boolean',
      },
    },
    label: {
      name: 'Label',
      control: {
        type: 'boolean',
      },
    },
    error: {
      name: 'Error',
      control: {
        type: 'boolean',
      },
    },
    description: {
      name: 'Description',
      control: {
        type: 'boolean',
      },
    },
  },
};

const BasicRender = (args, context) => {
  const { data, template } = defRender(args, context);
  const id = args.id || 'm-form-element';
  const type = args.type || 'text';
  const {
    name,
    error,
    value,
    placeholder,
    disabled,
    required,
    checked,
    options,
    readonly,
  } = args;
  data.type = type;
  if (args.label) {
    data.label = r('m-form-element-label', {
      title: args.label !== true ? args.label : 'Lorem ipsum',
      required,
      type,
      title_display: ['checkbox', 'radio'].includes(type) ? 'after' : 'before',
      attributes: {
        for: id,
      },
    });
  }
  if (args.error) {
    data.errors = args.error !== true ? args.error : 'Lorem ipsum';
  }
  if (args.description) {
    data.description = {
      attributes: new DrupalAttribute(),
      content: args.description !== true ? args.description : 'Lorem ipsum',
    };
  }
  switch (type) {
    case 'textarea':
      data.children = r('a-textarea', {
        required,
        placeholder,
        value,
        error,
        id,
        disabled,
      });
      break;
    case 'select':
      data.children = r('a-select', {
        required,
        error,
        id,
        options,
        disabled,
      });
      break;
    case 'checkbox':
      data.children = r('a-input-checkbox', {
        name,
        required,
        checked,
        error,
        id,
        disabled,
      });
      break;
    case 'radio':
      data.children = r('a-input-radio', {
        name,
        required,
        checked,
        error,
        id,
        disabled,
      });
      break;
    case 'email':
    case 'text':
    case 'password':
    case 'search':
    default:
      data.children = r(`a-input-${type}`, {
        required,
        placeholder,
        value,
        error,
        id,
        type,
        readonly,
        disabled,
      });
      break;
  }
  // useEffect(() => {
  //   place-your-js-code-here
  // }, [args]);
  return printComponentComment(data) + template.render(data);
};

export const Basic = {
  render: (args = {}, context) => BasicRender(args, context),
};
