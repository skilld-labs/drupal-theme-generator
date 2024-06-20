---
to: "<%= has_storybook ? `${h.src()}/${h.changeCase.lower(name)}/templates/components/suggestions/m-breadcrumb/m-breadcrumb.stories.js` : null %>"
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
  title: 'Molecules / Breadcrumb',
  parameters: {
    // layout: 'fullscreen',
    // backgrounds: { default: 'grey' },
  },
  // argTypes: {},
};

const BasicRender = (args, context) => {
  const { data, template } = defRender(args, context);
  data.breadcrumb = args.items || [
    {
      text: 'Trailing breadcrumb',
      url: '#',
    },
    {
      text: 'Trailing breadcrumb',
      url: '#',
    },
    {
      text: 'Current page',
    },
  ];
  // useEffect(() => {
  //   place-your-js-code-here
  // }, [args]);
  return printComponentComment(data) + template.render(data);
};

export const Basic = {
  render: (args = {}, context) => BasicRender(args, context),
};
