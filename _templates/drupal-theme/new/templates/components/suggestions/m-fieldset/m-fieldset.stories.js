---
to: "<%= has_storybook ? `${h.src()}/${h.changeCase.lower(name)}/templates/components/suggestions/m-fieldset/m-fieldset.stories.js` : null %>"
---
import {
  defRender,
  renderComponent as r,
  faker,
  DrupalAttribute,
  useEffect,
} from '@story-handler';

export default {
  title: 'Molecules / Fieldset',
  parameters: {
    // layout: 'fullscreen',
    // backgrounds: { default: 'grey' },
  },
  // argTypes: {},
};

const BasicRender = (args, context) => {
  const { data, template } = defRender(args, context);
  data.legend = {
    attributes: new DrupalAttribute(),
    title: args.title || 'Lorem ipsum',
  };
  data.legend_span = {
    attributes: new DrupalAttribute(),
  };
  data.children = args.children || faker.lorem.sentences();
  // useEffect(() => {
  //   place-your-js-code-here
  // }, [args]);
  return template.render(data);
};

export const Basic = {
  render: (args = {}, context) => BasicRender(args, context),
};
