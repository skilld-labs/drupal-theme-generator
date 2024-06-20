---
to: "<%= has_storybook ? `${h.src()}/${h.changeCase.lower(name)}/templates/components/suggestions/m-form-element-label/m-form-element-label.stories.js` : null %>"
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
  title: 'Molecules / Form element label',
  parameters: {
    // layout: 'fullscreen',
    // backgrounds: { default: 'grey' },
  },
  argTypes: {
    required: {
      name: 'Required',
      defaultValue: false,
      control: {
        type: 'boolean',
      },
    },
    title_display: {
      name: 'Label display',
      defaultValue: 'before',
      options: ['before', 'after', 'invisible'],
      control: {
        type: 'radio',
      },
    },
  },
};

const BasicRender = (args, context) => {
  const { data, template } = defRender(args, context);
  data.title = args.title || 'Lorem ipsum';
  data.title_display = args.title_display || 'before';
  data.required = args.required;
  // useEffect(() => {
  //   place-your-js-code-here
  // }, [args]);
  return printComponentComment(data) + template.render(data);
};

export const Basic = {
  render: (args = {}, context) => BasicRender(args, context),
};
