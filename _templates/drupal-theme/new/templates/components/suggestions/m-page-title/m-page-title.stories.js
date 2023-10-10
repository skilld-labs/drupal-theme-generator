---
to: "<%= has_storybook ? `${h.src()}/${h.changeCase.lower(name)}/templates/components/suggestions/m-page-title/m-page-title.stories.js` : null %>"
---
import {
  defRender,
  renderComponent as r,
  faker,
  DrupalAttribute,
  useEffect,
} from '@story-handler';

export default {
  title: 'Molecules / Page title',
  parameters: {
    // layout: 'fullscreen',
    // backgrounds: { default: 'grey' },
  },
  // argTypes: {},
};

const BasicRender = (args, context) => {
  const { data, template } = defRender(args, context);
  data.title_attributes = new DrupalAttribute();
  data.title = args.title || 'Lorem ipsum';
  // useEffect(() => {
  //   place-your-js-code-here
  // }, [args]);
  return template.render(data);
};

export const Basic = {
  render: (args = {}, context) => BasicRender(args, context),
};
