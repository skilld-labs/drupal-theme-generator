---
to: "<%= has_storybook ? `${h.src()}/${h.changeCase.lower(name)}/templates/components/suggestions/m-pager/m-pager.stories.js` : null %>"
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
  title: 'Molecules / Pager',
  parameters: {
    // layout: 'fullscreen',
    // backgrounds: { default: 'grey' },
  },
  // argTypes: {},
};

const buildObject = (elements = []) => {
  const constructor = {
    href: '#',
    attributes: new DrupalAttribute(),
  };
  if (!elements.length) {
    return constructor;
  }
  let pages = {};
  elements.forEach((number) => {
    pages[number] = constructor;
  });
  return pages;
};

const BasicRender = (args, context) => {
  const { data, template } = defRender(args, context);
  data.current = args.current;
  data.items = {};
  if (args.items) {
    data.items = args.items;
    if (args.items.first) {
      data.items.first = buildObject();
    }
    if (args.items.previous) {
      data.items.previous = buildObject();
    }
    if (args.items.pages) {
      data.items.pages = buildObject(args.items.pages);
    }
    if (args.items.next) {
      data.items.next = buildObject();
    }
    if (args.items.last) {
      data.items.last = buildObject();
    }
  }
  console.log(data);
  data.ellipses = args.ellipses;
  // useEffect(() => {
  //   place-your-js-code-here
  // }, [args]);
  return printComponentComment(data) + template.render(data);
};

export const Basic = {
  render: (args = {}, context) => {
    args.current = '1';
    args.items = {
      pages: [1, 2, 3, 4, 5, 6],
      next: true,
      last: true,
    };
    args.ellipses = {
      next: true,
    };

    return BasicRender(args, context);
  },
};

export const LastActive = {
  render: (args = {}, context) => {
    args.current = '10';
    args.items = {
      first: true,
      previous: true,
      pages: [5, 6, 7, 8, 9, 10],
    };
    args.ellipses = {
      previous: true,
    };

    return BasicRender(args, context);
  },
};
