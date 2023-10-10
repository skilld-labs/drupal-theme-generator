---
to: "<%= has_storybook ? `${h.src()}/${h.changeCase.lower(name)}/templates/components/uncategorized/a-throbber/a-throbber.stories.js` : null %>"
---
import {
  defRender,
  renderComponent as r,
  faker,
  DrupalAttribute,
  useEffect,
} from '@story-handler';

export default {
  title: 'Atoms / Throbber',
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
  return template.render(data);
};

export const Circle = {
  render: (args = {}, context) => {
    args.circle = true;
    return BasicRender(args, context);
  },
};

export const Fullscreen = {
  render: (args = {}, context) => BasicRender(args, context),
};
