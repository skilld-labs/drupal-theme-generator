---
to: "<%= has_storybook ? `${h.src()}/${h.changeCase.lower(name)}/templates/components/theme/a-icon/a-icon.stories.js` : null %>"
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
  title: 'Atoms / Icon',
  parameters: {
    // layout: 'fullscreen',
    // backgrounds: { default: 'grey' },
  },
  // argTypes: {},
};

const BasicRender = (args, context) => {
  const { data, template } = defRender(args, context);
  // useEffect(() => {
  //   place-your-js-code-here
  // }, [args]);
  return printComponentComment(data) + template.render(data);
};

export const Basic = {
  render: (args = {}, context) => BasicRender(args, context),
};
