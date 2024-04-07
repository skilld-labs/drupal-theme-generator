---
to: "<%= has_storybook ? `${h.src()}/${h.changeCase.lower(name)}/templates/components/suggestions/a-image/a-image.stories.js` : null %>"
---
import {
  defRender,
  renderComponent as r,
  faker,
  DrupalAttribute,
  useEffect,
} from '@story-handler';
import imageStyles from './config.styles.yml';

export default {
  title: 'Atoms / Image',
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
    const imageStyle =
      Object.keys(imageStyles).find(
        (key) => imageStyles[key].label === args.style,
      ) || Object.keys(imageStyles)[0];
    const { width, height } = loadImageStyleData(imageStyle, imageStyles);
    data.attributes.setAttribute('storybook-image-style-name', imageStyle);
    data.attributes.setAttribute('width', width);
    data.attributes.setAttribute('height', height);
    data.attributes.setAttribute(
      'src',
      faker.image.urlLoremFlickr({
        category: fakerProvider,
        width,
        height,
      }),
    );

    if (args.alt) {
      data.attributes.setAttribute('alt', args.alt);
    }
    return template.render(data);
  },
  argTypes: {
    style: {
      name: 'Image styles',
      options: Object.values(imageStyles).map((e) => e.label),
      defaultValue: Object.values(imageStyles)[0].label,
      control: {
        type: 'radio',
      },
    },
  },
};
