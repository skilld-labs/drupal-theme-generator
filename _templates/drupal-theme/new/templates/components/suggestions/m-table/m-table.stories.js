---
to: "<%= has_storybook ? `${h.src()}/${h.changeCase.lower(name)}/templates/components/suggestions/m-table/m-table.stories.js` : null %>"
---
import {
  defRender,
  renderComponent as r,
  faker,
  DrupalAttribute,
  useEffect,
} from '@story-handler';

export default {
  title: 'Molecules / Table',
  parameters: {
    // layout: 'fullscreen',
    // backgrounds: { default: 'grey' },
  },
  // argTypes: {},
};

const generateRow = (labels, tag = 'td') => {
  const items = [];
  labels.forEach((label) => {
    items.push({
      attributes: new DrupalAttribute(),
      content: label,
      tag,
    });
  });
  return items;
};

const generateRows = (rows) => {
  const items = [];
  rows.forEach((row) => {
    items.push({
      attributes: new DrupalAttribute(),
      cells: generateRow(row.labels),
    });
  });
  return items;
};

const BasicRender = (args, context) => {
  const { data, template } = defRender(args, context);
  data.header = generateRow(['Head 1', 'Head 2', 'Head 3', 'Head 4'], 'th');
  data.rows = generateRows([
    {
      labels: ['Body 1', 'Body 2', 'Body 3', 'Body 3'],
    },
    {
      labels: ['Body 1', 'Body 2', 'Body 3', 'Body 3'],
    },
    {
      labels: ['Body 1', 'Body 2', 'Body 3', 'Body 3'],
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
