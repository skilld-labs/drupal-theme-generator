---
to: "<%= has_storybook ? `${h.src()}/${h.changeCase.lower(name)}/templates/components/layouts/m-banner/m-banner.stories.js` : null %>"
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
  title: 'Molecules / Banner',
  parameters: {
    // layout: 'fullscreen',
    // backgrounds: { default: 'grey' },
  },
  // argTypes: {},
};

const BasicRender = (args, context) => {
  const { data, template } = defRender(args, context);
  data.media = r('m-responsive-image', {
    group: 'machine_name_of_responsive_image_group_1',
  });
  data.title = r('m-text-field', {
    item: 'Banner title',
    item_tag: 'h3',
    item_type: 'h3',
  });
  data.cta = r('m-cta-field', {
    item_content: 'Click me',
  });
  // useEffect(() => {
  //   place-your-js-code-here
  // }, [args]);
  return printComponentComment(data) + template.render(data);
};

export const Basic = {
  render: (args = {}, context) => BasicRender(args, context),
};
