---
to: "<%= has_storybook ? `${h.src()}/${h.changeCase.lower(name)}/templates/components/suggestions/m-radios/m-radios.stories.js` : null %>"
---
import {
  defRender,
  renderComponent as r,
  faker,
  DrupalAttribute,
  useEffect,
} from '@story-handler';

export default {
  title: 'Molecules / Radios',
  parameters: {
    // layout: 'fullscreen',
    // backgrounds: { default: 'grey' },
  },
  // argTypes: {},
};

const BasicRender = (args, context) => {
  const { data, template } = defRender(args, context);
  data.children =
    args.children ||
    [
      r('m-form-element', {
        label: true,
        type: 'radio',
        name: 'm-radios',
        id: 'm-radios-1',
      }),
      r('m-form-element', {
        label: true,
        type: 'radio',
        name: 'm-radios',
        id: 'm-radios-2',
      }),
      r('m-form-element', {
        label: true,
        type: 'radio',
        name: 'm-radios',
        id: 'm-radios-3',
      }),
    ].join('');
  // useEffect(() => {
  //   place-your-js-code-here
  // }, [args]);
  return template.render(data);
};

export const Basic = {
  render: (args = {}, context) => BasicRender(args, context),
};
