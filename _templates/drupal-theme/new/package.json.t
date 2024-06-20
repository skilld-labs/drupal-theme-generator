---
to: <%= h.src() %>/<%= h.changeCase.lower(name) %>/package.json
---
{
  "name": "<%= h.changeCase.lower(name) %>",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "engines": {
    "yarn": ">= 4.1.1",
    "node": ">= 18.0"
  },
  "devDependencies": {
<% if (has_storybook) { -%>
    "@faker-js/faker": "^8",
    "@originjs/vite-plugin-content": "^1",
<% } -%>
    "@skilld/drupal-component-generator": "^1",
<% if (has_storybook) { -%>
    "@storybook/addon-a11y": "^8",
    "@storybook/addon-essentials": "^8",
    "@storybook/addon-interactions": "^8",
    "@storybook/blocks": "^8",
    "@storybook/html": "^8",
    "@storybook/html-vite": "^8",
    "@storybook/preview-api": "^8",
<% } -%>
    "cli-real-favicon": "^0",
<% if (has_storybook) { -%>
    "drupal-attribute": "^1",
    "drupal-twig-extensions": "^1.0.0-beta.5",
    "jquery": "^3",
<% } -%>
    "oslllo-svg-fixer": "^4",
    "prepend-file-cli": "^1",
<% if (has_storybook) { -%>
    "storybook": "^8",
<% } -%>
    "stylelint": "^16",
    "svg-sprite": "^2",
    "svgo": "^3"<%= has_storybook ? `,` : '' %>
<% if (has_storybook) { -%>
    "twig": "^1"
<% } -%>
  },
  "dependencies": {
<% if (has_storybook) { -%>
    "@drupal/once": "^1",
<% } -%>
    "@splidejs/splide": "^4",
    "autoprefixer": "^10",
    "eslint": "^8",
    "eslint-config-airbnb-base": "^15",
    "eslint-config-prettier": "^9",
    "eslint-plugin-import": "^2",
    "eslint-plugin-prettier": "^5",
    "eslint-plugin-yml": "^1",
    "glob": "^10",
    "postcss": "^8",
    "postcss-custom-media": "^10",
    "postcss-custom-media-generator": "^1",
    "postcss-discard-empty": "^6",
    "postcss-header": "^3",
    "postcss-nested": "^6",
    "postcss-pxtorem": "^6",
    "prettier": "^3",
    "style-to-object": "^1",
    "stylelint-config-standard": "^36",
    "stylelint-order": "^6",
    "vite": "^5",
    "yaml": "^2"
  },
  "scripts": {
    "build": "node vite.build.mjs && yarn lint:fix",
    "build:watch": "node vite.build.mjs --watch",
<% if (has_storybook) { -%>
    "build:storybook": "storybook build",
    "storybook": "storybook dev",
<% } -%>
    "lint": "stylelint \"**/*.src.css\" --config './.stylelintrc' --max-warnings '0' && eslint --ext .yml . && eslint \"**/*.src.js\" --max-warnings 0 && prettier -c .",
    "lint:fix": "stylelint \"**/*.src.css\" --config './.stylelintrc' --fix --max-warnings '0' && eslint --ext .yml . --fix && eslint \"**/*.src.js\" --fix --max-warnings 0 && prettier -w --cache .",
    "favicon": "mkdir -p favicon && real-favicon generate favicon.config.json favicon.output.json favicon && rm favicon.output.json",
    "svg-fix": "oslllo-svg-fixer -s images/svg/${FILE} -d images/svg && svgo images/svg/${FILE} -o images/svg --final-newline --config svgo.config.js",
    "svg-fix:all": "oslllo-svg-fixer -s images/svg -d images/svg && svgo -f images/svg -o images/svg --final-newline --config svgo.config.js",
    "sprite": "svg-sprite -s --svg-xmldecl=false --symbol-sprite='sprite.svg' --symbol-dest=images --shape-id-generator='svg-%s' images/svg/*.svg && prepend images/sprite.svg \"<!--\n    DO NOT EDIT THIS FILE\n    It's generated automatically by 'yarn sprite' command.\n    You have to re-generate 'sprite.svg' every time you\n    modifying icons in 'images/svg/' folder\n    @preserve\n-->\n\"",
    "cc": "npx @skilld/drupal-component-generator --theme_name=<%= h.changeCase.lower(name) %><%= has_storybook ? ` --has_storybook=true` : ''%>"
  },
  "private": true,
  "packageManager": "yarn@4.1.1"
}
