---
to: "<%= has_storybook ? `${h.src()}/${h.changeCase.lower(name)}/templates/components/suggestions/m-responsive-image/m-responsive-image.stories.js` : null %>"
---
import {
  defRender,
  renderComponent as r,
  faker,
  DrupalAttribute,
  useEffect,
} from '@story-handler';
import imageStyles from '@a-image-folder/config.styles.yml';
import responsiveImageGroups from './config.groups.yml';

export default {
  title: 'Molecules / Responsive image',
  parameters: {
    // layout: 'fullscreen',
    // backgrounds: { default: 'grey' },
  },
  // argTypes: {},
};

const defaultFakerProvider = 'abstract';

const randomDimension = (base, maxRatio = 1.5, minRatio = 0.5) =>
  Math.floor(
    Math.random() * (base * minRatio - base * maxRatio) + base * maxRatio,
  );

const loadImageStyleData = (current, all) => {
  let width;
  let height;

  if (current === '_empty image_') {
    return { width: 1, height: 1 };
  }

  if (all[current].effect === 'image_scale_and_crop') {
    width = all[current].width;
    height = all[current].height;
  }

  if (all[current].effect === 'image_scale') {
    if (all[current].width === 'auto') {
      width = randomDimension(all[current].height);
      height = all[current].height;
    } else if (all[current].height === 'auto') {
      width = all[current].width;
      height = randomDimension(all[current].width);
    } else {
      const random = Math.round(Math.random());
      if (random === 0) {
        width = all[current].width;
        height = randomDimension(all[current].height, 1);
      } else {
        width = randomDimension(all[current].width, 1);
        height = all[current].height;
      }
    }
  }
  return { width, height };
};

export const Basic = {
  render: (args = {}, context) => {
    const { data, template } = defRender(args, context);
    const fakerProvider = args.fakerProvider || defaultFakerProvider;
    const responsiveImageGroup =
      Object.keys(responsiveImageGroups).find(
        (key) =>
          responsiveImageGroups[key].label === args.group || key === args.group,
      ) || Object.keys(responsiveImageGroups)[0];
    const fallback = loadImageStyleData(
      responsiveImageGroups[responsiveImageGroup].fallback,
      imageStyles,
    );
    data.img_element = `<img storybook-fallback-image-style-name="${
      responsiveImageGroups[responsiveImageGroup].fallback
    }" ${args.alt ? `alt="${args.alt}"` : ''} src="${faker.image.urlLoremFlickr(
      {
        category: fakerProvider,
        width: fallback.width,
        height: fallback.height,
      },
    )}"/>`;
    data.sources = [];
    const { breakpoints } = responsiveImageGroups[responsiveImageGroup];
    if (breakpoints) {
      Object.keys(breakpoints).forEach((breakpoint) => {
        let srcset = '';
        let help = '';
        Object.keys(breakpoints[breakpoint]).forEach((multiplier, i) => {
          const breakpointImageStyle = loadImageStyleData(
            breakpoints[breakpoint][multiplier],
            imageStyles,
          );
          help += `${
            i > 0 ? ' ' : ''
          }storybook-image-style-name-for-${multiplier}-multiplier="${
            breakpoints[breakpoint][multiplier]
          }"`;
          srcset += `${i > 0 ? ', ' : ' '}${faker.image.urlLoremFlickr({
            category: fakerProvider,
            width: breakpointImageStyle.width,
            height: breakpointImageStyle.height,
          })} ${multiplier}`;
        });
        data.sources.push(
          `storybook-breakpoint-name="${breakpoint}" ${help} srcset="${srcset}" media="${window.drupalSettings.<%= h.changeCase.camelCase(name) %>Breakpoints[breakpoint]}"`,
        );
      });
    }
    data.picture_attributes = new DrupalAttribute();
    data.picture_attributes.setAttribute(
      'storybook-responsive-image-group-name',
      responsiveImageGroup,
    );
    return template.render(data);
  },
  argTypes: {
    group: {
      name: 'Responsive image groups',
      options: Object.values(responsiveImageGroups).map((e) => e.label),
      control: {
        type: 'radio',
      },
    },
  },
};
