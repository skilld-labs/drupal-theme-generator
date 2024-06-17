---
to: "<%= has_storybook ? `${h.src()}/${h.changeCase.lower(name)}/templates/components/theme/a-link-button/a-link-button.stories.js` : null %>"
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
  title: 'Atoms / Link button',
  parameters: {
    // layout: 'fullscreen',
    // backgrounds: { default: 'grey' },
  },
  argTypes: {
    ajax: {
      name: 'Ajax',
      control: {
        type: 'boolean',
      },
    },
  },
};

const BasicRender = (args, context) => {
  const { data, template } = defRender(args, context);
  data.content = args.content || 'Lorem ipsum';
  if (!args.href) {
    data.href = '#';
  }
  if (args.ajax) {
    data.attributes.addClass('is-disabled');
  }
  if (context.componentId) {
    useEffect(() => {
      // Simulation of ajax throbber.
      if (args.ajax) {
        const throbber = (type = 'full') => `
        ${
          type === 'full'
            ? `<span class="h-button__icon-container h-button__icon-container--throbber-full">`
            : ''
        }
        <svg class="h-button__icon ${
          type !== 'full'
            ? 'h-button__icon--throbber a-throbber a-throbber--circle '
            : ''
        }a-icon a-icon--throbber-circle" aria-hidden="true">
          <use xlink:href="${data.<%= h.changeCase.camelCase(name) %>SvgSprite}#svg-throbber-circle"></use>
        </svg>
        ${type === 'full' ? '</span>' : ''}
      `;
        const btn = document.querySelector('.h-button');
        if (
          (!btn.querySelector('.h-button__icon-container--start') &&
            !btn.querySelector('.h-button__icon-container--end')) ||
          (btn.querySelector('.h-button__icon-container--start') &&
            btn.querySelector('.h-button__icon-container--end'))
        ) {
          btn.insertAdjacentHTML('afterbegin', throbber());
        } else if (btn.querySelector('.h-button__icon-container--start')) {
          btn
            .querySelector('.h-button__icon-container--start')
            .insertAdjacentHTML('afterbegin', throbber('start'));
        } else if (btn.querySelector('.h-button__icon-container--end')) {
          btn
            .querySelector('.h-button__icon-container--end')
            .insertAdjacentHTML('afterbegin', throbber('end'));
        }
      }
    }, [args]);
  }
  return printComponentComment(data) + template.render(data);
};

export const Basic = {
  render: (args = {}, context) => BasicRender(args, context),
};
