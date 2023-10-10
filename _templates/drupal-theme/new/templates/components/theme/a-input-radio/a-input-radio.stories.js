---
to: "<%= has_storybook ? `${h.src()}/${h.changeCase.lower(name)}/templates/components/theme/a-input-radio/a-input-radio.stories.js` : null %>"
---
import {
  defRender,
  renderComponent as r,
  faker,
  DrupalAttribute,
  useEffect,
} from '@story-handler';

export default {
  title: 'Atoms / Input radio',
  parameters: {
    // layout: 'fullscreen',
    // backgrounds: { default: 'grey' },
  },
  argTypes: {
    checked: {
      name: 'Checked',
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
  data.attributes.setAttribute('type', 'radio');
  if (args.id) {
    data.attributes.setAttribute('id', args.id);
  }
  if (args.name) {
    data.attributes.setAttribute('name', args.name);
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
  if (args.checked) {
    data.attributes.setAttribute('checked', '');
  }
  if (context.componentId) {
    useEffect(() => {
      // Simulation of ajax throbber.
      if (args.ajax) {
        document.querySelector('.h-boolean__element').insertAdjacentHTML(
          'afterend',
          `
        <svg class="h-boolean__icon h-boolean__icon--throbber a-throbber a-throbber--circle a-icon a-icon--throbber-circle" aria-hidden="true">
          <use xlink:href="${data.<%= h.changeCase.camelCase(name) %>SvgSprite}#svg-throbber-circle"></use>
        </svg>
      `,
        );
      }
    }, [args]);
  }
  return template.render(data);
};

export const Basic = {
  render: (args = {}, context) => BasicRender(args, context),
};
