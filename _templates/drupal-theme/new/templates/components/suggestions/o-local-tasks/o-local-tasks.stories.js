---
to: "<%= has_storybook ? `${h.src()}/${h.changeCase.lower(name)}/templates/components/suggestions/o-local-tasks/o-local-tasks.stories.js` : null %>"
---
import {
  defRender,
  renderComponent as r,
  faker,
  DrupalAttribute,
  useEffect,
} from '@story-handler';

export default {
  title: 'Organisms / Local tasks',
  parameters: {
    // layout: 'fullscreen',
    // backgrounds: { default: 'grey' },
  },
  // argTypes: {},
};

const BasicRender = (args, context) => {
  const { data, template } = defRender(args, context);
  data.primary = '';
  [
    'View',
    'Test',
    'Results',
    'Edit',
    'Build',
    'Settings',
    'Export',
    'Translate',
    'Clone',
  ].forEach((item) => {
    data.primary += r('m-local-task', {
      link: item,
    });
  });
  // useEffect(() => {
  //   place-your-js-code-here
  // }, [args]);
  return template.render(data);
};

export const Basic = {
  render: (args = {}, context) => BasicRender(args, context),
};
