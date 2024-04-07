---
to: "<%= has_storybook ? `${h.src()}/${h.changeCase.lower(name)}/.storybook/plugins/controls/manager.js` : null %>"
---
import { addons } from '@storybook/manager-api';
import { defArgTypes } from '../story-handler';
import { STORY_PREPARED } from '@storybook/core-events';

addons.register('s-control/scontols', (api) => {
  api.on(STORY_PREPARED, (eventData) => {
    // Here we may change argTypes if needed.
    // Load arg types dynamically.
    const { argTypes, parameters } = eventData;
    const componentName = parameters.fileName
      .split('/')
      .pop()
      .split('.')
      .shift();
    if (parameters.AllArgTypes[componentName]) {
      eventData.argTypes = {
        ...defArgTypes(parameters.AllArgTypes[componentName]),
        ...argTypes,
      };
    }
  });
});
