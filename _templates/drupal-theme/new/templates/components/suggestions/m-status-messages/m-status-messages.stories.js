---
to: "<%= has_storybook ? `${h.src()}/${h.changeCase.lower(name)}/templates/components/suggestions/m-status-messages/m-status-messages.stories.js` : null %>"
---
import {
  defRender,
  renderComponent as r,
  faker,
  DrupalAttribute,
  useEffect,
} from '@story-handler';

export default {
  title: 'Molecules / Status messages',
  parameters: {
    // layout: 'fullscreen',
    // backgrounds: { default: 'grey' },
  },
  argTypes: {
    type: {
      name: 'Chosee a type of message',
      defaultValue: 'Status',
      options: ['Status', 'Warning', 'Error', 'Information'],
      control: {
        type: 'radio',
      },
    },
  },
};

const BasicRender = (args, context) => {
  const { data, template } = defRender(args, context);
  if (args.type === 'Information') {
    data.type = 'info';
  } else {
    data.type = args.type ? args.type.toLowerCase() : 'status';
  }
  data.message_list = {};
  data.message_list[data.type] = args.list || ['Lorem ipsum dolor'];
  data.status_headings = {
    status: 'Status message',
    warning: 'Warning message',
    error: 'Error message',
    info: 'Information message',
  };
  // useEffect(() => {
  //   place-your-js-code-here
  // }, [args]);
  return template.render(data);
};

export const Basic = {
  render: (args = {}, context) => BasicRender(args, context),
};

export const Multiple = {
  render: (args = {}, context) => {
    args.list = args.list || [
      'Lorem ipsum dolor 1',
      'Lorem ipsum dolor 2',
      'Lorem ipsum dolor 3',
    ];
    return BasicRender(args, context);
  },
};
