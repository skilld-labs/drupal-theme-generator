---
to: "<%= has_storybook ? `${h.src()}/${h.changeCase.lower(name)}/.storybook/manager.js` : null %>"
---
import { addons } from '@storybook/addons';

addons.setConfig({
  panelPosition: 'right',
});
