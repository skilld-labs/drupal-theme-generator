---
to: "<%= has_storybook ? `${h.src()}/${h.changeCase.lower(name)}/templates/components/layouts/h-container/h-container.stories.js` : null %>"
---
import {
  defRender,
  renderComponent as r,
  faker,
  DrupalAttribute,
  useEffect,
} from '@story-handler';

export default {
  title: 'Helpers / Container',
  parameters: {
    layout: 'fullscreen',
    // backgrounds: { default: 'grey' },
  },
  // argTypes: {},
};

const BasicRender = (args, context) => {
  const { data, template } = defRender(args, context);
  data.content =
    args.content ||
    '<div style="text-align: center; padding: 16px; background-color: var(--color-grey-light)">Container content</div>';
  // useEffect(() => {
  //   place-your-js-code-here
  // }, [args]);
  return template.render(data);
};

export const Basic = {
  render: (args = {}, context) => BasicRender(args, context),
};
