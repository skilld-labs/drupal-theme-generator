---
to: "<%= has_storybook ? `${h.src()}/${h.changeCase.lower(name)}/templates/components/theme/m-menu-main/m-menu-main.stories.js` : null %>"
---
import {
  defRender,
  renderComponent as r,
  faker,
  DrupalAttribute,
  useEffect,
} from '@story-handler';

export default {
  title: 'Molecules / Menu main',
  parameters: {
    // layout: 'fullscreen',
    // backgrounds: { default: 'grey' },
  },
  // argTypes: {},
};

const buildMenuLinks = (items) => {
  items.forEach((item) => {
    item.attributes = new DrupalAttribute();
    item.url = '#';

    if (item.below) {
      buildMenuLinks(item.below);
    }
  });

  return items;
};

const BasicRender = (args, context) => {
  const { data, template } = defRender(args, context);
  data.items = buildMenuLinks([
    {
      title: 'Lorem ipsum 1',
      below: [
        {
          title: 'Lorem ipsum 1 1',
          below: [
            {
              title: 'Lorem ipsum 1 1 1',
            },
            {
              title: 'Lorem ipsum 1 1 2',
            },
            {
              title: 'Lorem ipsum 1 1 3',
            },
          ],
        },
        {
          title: 'Lorem ipsum 1 2',
        },
        {
          title: 'Lorem ipsum 1 3',
        },
      ],
    },
    {
      title: 'Lorem ipsum 2',
      below: [
        {
          title: 'Lorem ipsum 2 1',
        },
        {
          title: 'Lorem ipsum 2 2',
          below: [
            {
              title: 'Lorem ipsum 2 2 1',
            },
            {
              title: 'Lorem ipsum 2 2 2',
            },
          ],
        },
      ],
    },
    {
      title: 'Lorem ipsum 3',
    },
  ]);
  // useEffect(() => {
  //   place-your-js-code-here
  // }, [args]);
  return template.render(data);
};

export const Basic = {
  render: (args = {}, context) => BasicRender(args, context),
};
