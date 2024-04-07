---
to: "<%= has_storybook ? `${h.src()}/${h.changeCase.lower(name)}/.storybook/manager.js` : null %>"
---
import { addons } from '@storybook/manager-api';

addons.setConfig({
  panelPosition: 'right',
  navSize: 260,
  rightPanelWidth: 260,
});
