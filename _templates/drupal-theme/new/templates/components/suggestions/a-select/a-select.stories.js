---
to: "<%= has_storybook ? `${h.src()}/${h.changeCase.lower(name)}/templates/components/suggestions/a-select/a-select.stories.js` : null %>"
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
  title: 'Atoms / Select',
  parameters: {
    // layout: 'fullscreen',
    // backgrounds: { default: 'grey' },
  },
  argTypes: {
    error: {
      name: 'Error',
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
    ajax: {
      name: 'Ajax',
      control: {
        type: 'boolean',
      },
    },
    required: {
      name: 'Required',
      control: {
        type: 'boolean',
      },
    },
  },
};

const BasicRender = (args, context) => {
  const { data, template } = defRender(args, context);
  if (args.id) {
    data.attributes.setAttribute('id', args.id);
  }
  if (args.disabled || args.ajax) {
    data.attributes.setAttribute('disabled', '');
  }
  if (args.required) {
    data.attributes.setAttribute('required', '');
  }
  if (args.error) {
    data.attributes.addClass('error');
  }
  data.options = args.options || [
    {
      type: 'option',
      label: 'Lorem ipsum',
      value: '',
    },
    {
      type: 'option',
      label: 'Value 1',
      value: 'value_1',
    },
    {
      type: 'option',
      label: 'Value 2',
      value: 'value_2',
    },
    {
      type: 'option',
      label: 'Value 3',
      value: 'value_3',
    },
  ];
  if (context.componentId) {
    useEffect(() => {
      // Simulation of ajax throbber.
      if (args.ajax) {
        document.querySelector('.a-select__element').insertAdjacentHTML(
          'afterend',
          `
        <svg class="a-select__icon a-select__icon--throbber a-throbber a-throbber--circle" aria-hidden="true">
          <use xlink:href="${data.<%= h.changeCase.camelCase(name) %>SvgSprite}#svg-throbber-circle"></use>
        </svg>
      `,
        );
      }
    }, [args.ajax]);
  }
  return printComponentComment(data) + template.render(data);
};

export const Basic = {
  render: (args = {}, context) => BasicRender(args, context),
};
