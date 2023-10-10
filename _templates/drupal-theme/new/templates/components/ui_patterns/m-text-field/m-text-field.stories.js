---
to: "<%= has_storybook ? `${h.src()}/${h.changeCase.lower(name)}/templates/components/ui_patterns/m-text-field/m-text-field.stories.js` : null %>"
---
import {
  defRender,
  renderComponent as r,
  faker,
  DrupalAttribute,
  useEffect,
} from '@story-handler';

export default {
  title: 'Molecules / Text field',
  parameters: {
    // layout: 'fullscreen',
    // backgrounds: { default: 'grey' },
  },
  argTypes: {
    label: {
      name: 'Show label',
      control: {
        type: 'boolean',
      },
    },
    link: {
      name: 'Link',
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
  data.item = args.item || faker.lorem.sentences();
  if (args.link) {
    data.item_href = args.link === true ? '#' : args.link;
  }
  // useEffect(() => {
  //   place-your-js-code-here
  // }, [args]);
  return template.render(data);
};

export const Basic = {
  render: (args = {}, context) => BasicRender(args, context),
};
