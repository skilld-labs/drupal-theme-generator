---
to: "<%= has_storybook ? `${h.src()}/${h.changeCase.lower(name)}/templates/components/layouts/m-card/m-card.stories.js` : null %>"
---
import {
  defRender,
  renderComponent as r,
  faker,
  DrupalAttribute,
  useEffect,
} from '@story-handler';

export default {
  title: 'Molecules / Card',
  parameters: {
    // layout: 'fullscreen',
    // backgrounds: { default: 'grey' },
  },
  // argTypes: {},
};

const BasicRender = (args, context) => {
  const { data, template } = defRender(args, context);
  data.image = r('m-responsive-image', {
    group: 'machine_name_of_responsive_image_group_2',
  });
  data.title = r('m-text-field', {
    item: 'Card title',
    item_tag: 'h3',
    item_type: 'h3',
  });
  data.body = r('m-text-field', {
    item: 'Card body',
  });
  data.cta = r('m-cta-field', {
    item: 'Card CTA',
  });
  // useEffect(() => {
  //   place-your-js-code-here
  // }, [args]);
  return template.render(data);
};

export const Basic = {
  render: (args = {}, context) => BasicRender(args, context),
};
