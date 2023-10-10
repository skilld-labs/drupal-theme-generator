---
to: "<%= has_storybook ? `${h.src()}/${h.changeCase.lower(name)}/templates/components/uncategorized/o-dialog/o-dialog.stories.js` : null %>"
---
import {
  defRender,
  renderComponent as r,
  faker,
  DrupalAttribute,
  useEffect,
} from '@story-handler';

export default {
  title: 'Organisms / Dialog',
  parameters: {
    layout: 'fullscreen',
    // backgrounds: { default: 'grey' },
  },
  // argTypes: {},
};

const BasicRender = (args, context) => {
  const { data, template } = defRender(args, context);
  if (args.title) {
    data.dialog_title = args.title;
  }
  if (args.close) {
    data.close = args.close;
  }
  data.content = args.content || 'Lorem ipsum';
  // useEffect(() => {
  //   place-your-js-code-here
  // }, [args]);
  return template.render(data);
};

export const Basic = {
  render: (args = {}, context) => {
    args.title = r('a-text', {
      content: 'Dialog title',
      type: 'h2',
    });
    args.close = r('a-input-submit', {
      value: 'Close',
      trailing_icon: 'close',
    });
    args.content = r('a-text', {
      content: 'This is dialog content',
    });
    return BasicRender(args, context);
  },
};
