---
to: "<%= has_storybook ? `${h.src()}/${h.changeCase.lower(name)}/templates/components/theme/a-text/a-text.stories.js` : null %>"
---
import {
  defRender,
  renderComponent as r,
  faker,
  DrupalAttribute,
  useEffect,
} from '@story-handler';

export default {
  title: 'Atoms / Text',
  parameters: {
    // layout: 'fullscreen',
    // backgrounds: { default: 'grey' },
  },
  // argTypes: {},
};

const BasicRender = (args, context) => {
  const { data, template } = defRender(args, context);
  data.content = args.content || 'Lorem ipsum';
  if (args.tag === 'a' || args.link || args.href) {
    data.attributes.setAttribute('href', args.href || '#');
  }
  // useEffect(() => {
  //   place-your-js-code-here
  // }, [args]);
  return template.render(data);
};

export const Basic = {
  render: (args = {}, context) => BasicRender(args, context),
};
