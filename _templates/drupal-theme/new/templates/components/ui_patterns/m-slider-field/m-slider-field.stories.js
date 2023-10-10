---
to: "<%= has_storybook ? `${h.src()}/${h.changeCase.lower(name)}/templates/components/ui_patterns/m-slider-field/m-slider-field.stories.js` : null %>"
---
import {
  defRender,
  renderComponent as r,
  faker,
  DrupalAttribute,
  useEffect,
} from '@story-handler';

export default {
  title: 'Molecules / Slider field',
  parameters: {
    layout: 'fullscreen',
    // backgrounds: { default: 'grey' },
  },
  argTypes: {
    label: {
      name: 'Show label',
      control: {
        type: 'boolean',
      },
    },
  },
};

const defContent = () => {
  const items = [];
  for (let i = 1; i <= 10; i++) {
    items.push(
      `<div style="text-align: center; padding: 30px 16px; background-color: var(--color-grey-light);">Slide ${i}</div>`,
    );
  }
  return items;
};

const BasicRender = (args, context) => {
  const { data, template } = defRender(args, context);
  if (args.label) {
    data.label = args.label !== true ? args.label : 'Lorem ipsum';
  }
  data.items = args.items || defContent();
  // useEffect(() => {
  //   place-your-js-code-here
  // }, [args]);
  return template.render(data);
};

export const Basic = {
  render: (args = {}, context) => BasicRender(args, context),
};
