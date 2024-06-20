---
to: "<%= has_storybook ? `${h.src()}/${h.changeCase.lower(name)}/templates/components/suggestions/p-page/p-page.stories.js` : null %>"
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
  title: 'Pages / Page',
  parameters: {
    layout: 'fullscreen',
    // backgrounds: { default: 'grey' },
  },
  // argTypes: {},
};

const BasicRender = (args, context) => {
  const { data, template } = defRender(args, context);
  data.page = {};
  data.page.branding = r('o-branding');
  data.page.main_navigation = r('m-menu-main');
  if (args.system) {
    data.page.system = args.system;
  }
  data.page.breadcrumb = r('m-breadcrumb');
  data.page.content =
    args.content ||
    [
      r('m-slider-field', {
        container: true,
        container_width: 'w-1',
        container_horizontal_padding: 'hp-1',
        container_vertical_padding: 'vp-1',
        type: 'type-1',
        label: 'Slider field',
        label_tag: 'h2',
        label_type: 'h2',
        items: [r('m-banner'), r('m-banner'), r('m-banner')],
      }),
      r('m-grid-field', {
        container: true,
        container_width: 'w-1',
        container_horizontal_padding: 'hp-1',
        container_vertical_padding: 'vp-1',
        type: 'type-1',
        gap: 'g-1',
        label: 'Grid field',
        label_tag: 'h2',
        label_type: 'h2',
        items: [
          r('m-card', {
            clickable: true,
          }),
          r('m-card', {
            clickable: true,
          }),
        ],
      }),
      r('m-text-field', {
        container: true,
        container_width: 'w-1',
        container_horizontal_padding: 'hp-1',
        container_vertical_padding: 'vp-1',
        type: 'type-1',
        gap: 'g-1',
        label: 'Text field',
        label_tag: 'h2',
        label_type: 'h2',
        item: `
        <p>Paragraph 1</p>
        <p>Paragraph 2</p>
      `,
      }),
      r('m-flex-field', {
        container: true,
        container_width: 'w-1',
        container_horizontal_padding: 'hp-1',
        container_vertical_padding: 'vp-1',
        type: 'type-1',
        gap: 'g-1',
        label: 'Flex field',
        label_tag: 'h2',
        label_type: 'h2',
        items: [
          r('m-text-field', {
            item: 'Lorem ipsum 1',
            link: true,
          }),
          r('m-text-field', {
            item: 'Lorem ipsum 2',
            link: true,
          }),
          r('m-text-field', {
            item: 'Lorem ipsum 3',
            link: true,
          }),
          r('m-text-field', {
            item: 'Lorem ipsum 4',
            link: true,
          }),
          r('m-text-field', {
            item: 'Lorem ipsum 5',
            link: true,
          }),
        ],
      }),
    ].join('');
  data.page.copyright = r('m-text-field', {
    item_content: '@ Copyright',
  });
  // data.page.secondary_navigation = Menu.render();
  // useEffect(() => { place-your-js-code-here }, [args]);
  return printComponentComment(data) + template.render(data);
};

export const Homepage = {
  render: (args = {}, context) => BasicRender(args, context),
};

export const Administrator = {
  render: (args = {}, context) => {
    args.system = [
      r('o-local-tasks'),
      r('m-status-messages', {
        type: args.system_messages_type,
      }),
    ].join('');
    return BasicRender(args, context);
  },
};

Administrator.argTypes = {
  system_messages_type: {
    name: 'Type of system message',
    options: ['Status', 'Warning', 'Error', 'Information'],
    control: {
      type: 'radio',
    },
  },
};
