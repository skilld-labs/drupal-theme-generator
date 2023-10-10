---
to: "<%= has_storybook ? `${h.src()}/${h.changeCase.lower(name)}/templates/components/ui_patterns/m-cta-field/m-cta-field.stories.js` : null %>"
---
import {
  defRender,
  renderComponent as r,
  faker,
  DrupalAttribute,
  useEffect,
} from '@story-handler';

export default {
  title: 'Molecules / CTA field',
  parameters: {
    // layout: 'fullscreen',
    backgrounds: { default: 'grey' },
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

const BasicRender = (args, context) => {
  const { data, template } = defRender(args, context);
  if (args.label) {
    data.label = args.label === true ? 'Lorem ipsum' : args.label;
  }
  data.item = args.item || 'Lorem ipsum';
  data.item_href = args.href || '#';
  // useEffect(() => {
  //   place-your-js-code-here
  // }, [args]);
  return template.render(data);
};

export const Basic = {
  render: (args = {}, context) => BasicRender(args, context),
};
