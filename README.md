<p align="center">
  <a href="https://skilld.cloud/" target="_blank">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/skilld-labs/drupal-theme-generator/logo/dark.svg">
      <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/skilld-labs/drupal-theme-generator/logo/light.svg">
      <img alt="Logo" src="https://raw.githubusercontent.com/skilld-labs/drupal-theme-generator/logo/light.svg" width="360" height="108" style="max-width: 100%;">
    </picture>
  </a>
</p>
<p align="center">
  This theme generator was inspired by <a href="https://www.drupal.org/project/component_connector">Component connector</a> initiative. 
  It will help you to generate your custom theme for <a href="https://www.drupal.org/">Drupal</a>
</p>

#### Navigation
- [About component connector initiative](#about-component-connector-initiative)
- - [What we actually call a component](#what-we-actually-call-a-component)
- - [Ways of components delivering in drupal today](#ways-of-components-delivering-in-drupal-today)
- - [Our native integration](#our-native-integration)
- - [What's the benefits](#whats-the-benefits)
- [Features generated theme will have](#features-generated-theme-will-have)
- [Installation](#installation)
- [Explanation of generated theme](#explanation-of-generated-theme)
- - [Purposes of generated theme](#purposes-of-generated-theme)
- - [Structure of generated theme](#structure-of-generated-theme)
- [How to create new component](#how-to-create-new-component)
- [How to compile styles and scripts](#how-to-compile-styles-and-scripts)
- [How to run and compile storybook](#how-to-run-and-compile-storybook)
- [Linting](#linting)
- [Drupal's breakpoints in CSS and JS](#drupals-breakpoints-in-css-and-js)
- [SVG sprite](#svg-sprite)
- - [Why SVG sprite technology](#why-svg-sprite-technology)
- - [How to generate SVG sprite](#how-to-generate-svg-sprite)
- - [How to use SVG sprite](#how-to-use-svg-sprite)
- - [How to optimize source SVG files](#how-to-optimize-source-svg-files)
- [How to generate favicon](#how-to-generate-favicon)
- [About components](#about-components)
- - [Atomic design](#atomic-design)
- - [Component structure](#component-structure)
- - [Principle of building components](#principle-of-building-components)
- - [Namespaces](#namespaces)
- - [Pre-defined components](#pre-defined-components)
- - - [Buttons and inputs](#buttons-and-inputs)
- - - [Atom "Image"](#atom-image)
- - - [Molecule "Responsive Image"](#molecule-responsive-image)
- - - [Helper "Root variables"](#helper-root-variables)
- - - [Helper "Wrapper as link"](#helper-wrapper-as-link)
- - [Pre-defined Drupal javascript](#pre-defined-drupal-javascript)
- - [Third party libraries](#third-party-libraries)
- [Methodology of doing Storybook](#methodology-of-doing-storybook)
- - [How to split design system on components](#how-to-split-design-system-on-components)
- [Debug in Drupal](#debug-in-drupal)
- [License](#license)

## About component connector initiative

The process of delivering components in Drupal is not so easy thing. Drupal 
is having own [Render API](https://www.drupal.org/docs/drupal-apis/render-api) which is a bit out of component approach. However, component approach
turn out to be very popular and we want to promote delivering of front-end components in Drupal.

### What we actually call a component

Definitely when we are saying `component` - we are talking about `UI Component`. So it should have
some html markup, optional styles and scripts required by this component only.

### Ways of components delivering in drupal today

To date, how you actually can deliver your front-end component in Drupal?
Initially you have many different ways to do that. For example:
1. Via twig overrides you can ` {{ include }}` twig of front-end component to apply it in Drupal.
2. Via [Drupal hooks](https://api.drupal.org/api/drupal/core%21core.api.php/group/hooks/10): preprocess hooks, alter hooks and so on.
3. If your component should be layout in drupal - then [Layout API](https://www.drupal.org/docs/drupal-apis/layout-api)
4. Writing your own theme hooks which will take your component into account 
5. And so on - many ways !

Another problem is [delivering of assets in Drupal](https://www.drupal.org/docs/develop/creating-modules/adding-assets-css-js-to-a-drupal-module-via-librariesyml).
Initially your `my-component/styles.css` and `my-component/scripts.js` is nothing in Drupal. So you have to:
1. Declare a new drupal library
2. Attach it where need.

Of course, today we already have several great initiatives, like [SDC](https://www.drupal.org/project/sdc) or 
[UI Patterns](https://www.drupal.org/project/ui_patterns), which already greatly simplifying life of developers.
But are these initiatives enough?

Well, `SDC` initiative can't resolve next problems:
1. It still requires an extra layer to connect your component via twig for example - where you have to override drupal's
twig file just to include twig of your component and map the fields to 
[SDC props and slots](https://www.drupal.org/docs/develop/theming-drupal/using-single-directory-components/using-your-new-single-directory-component#s-using-your-component-through-a-render-array).
2. Second problem is an actually dangerous mapping of drupal's fields. 
We are not recommending to map entity machine names to component's props and slots, for example:

```
{{ include('my-title', {
  content: content.field_title,
}) }}
```

It's very dangerous to do it like this, because one day field machine name can be changed, or a whole field will be removed,
or field will be removed from view mode display. In that case you will get an error, because in twig you are expecting
machine name of the field.

So we vote for an abstract mapping, which for example `Layout API` can give to us. Instead of referring to the real machine names
of entities, we can declare abstract layout's regions and we don't have to worry about which entities will be placed in regions
of our layout. Regions are static, while machine names of entities are not.

Another old-school way of building front-end in twig is to do something like this:

```
{{ include('my-button', {
  text: 'Some text',
  icon: 'some-icon'
}) }}
```

From our point of view it could be much simplier and more correct to customize settings of components from admin back-office. So it's a question
to cost of development. Guess how many entities with different view modes you can have, and what if you need
to connect your `my-button` component in lots of different places. What will be easier and faster - to override
twig files or to make several clicks in admin back-office to enter specific `text` and choose the `icon` for
the button?

Regarding `UI Patterns` - unfortunately as a standalone module it can't wrap all the possible cases in Drupal.
For example:
- How to connect `my-selectbox` component to the core theme hook `select` with its template `select.html.twig`?
Right now only by using old-school ways: via twig overrides, or playing around drupal hooks. So it becomes a question
to all core theme hooks drupal have: `pager`, `breadcrumb`, `status_messages`, `input`, `textarea`, `details` and
[so on](https://api.drupal.org/api/drupal/core%21lib%21Drupal%21Core%21Render%21theme.api.php/group/themeable/9).

Yes, `UI patterns` already can provide you many different ways of connection your component into drupal: as a field formatter,
as a layout, as a view style, and so on. So potentially you can build ~60% of the web-site only by using `UI Patterns`
and configuration of them via admin back-office.

### Our native integration
                
We wanted to get rid of all the extra layers to connect components in Drupal and stay native and flexible
at the same time. You have to [check this](https://git.drupalcode.org/project/component_connector) about our integration before reading on.

### What's the benefits

#### For a company in long term strategy.

1. Much less time development of drupal websites will take. 

We are estimating a 30% reduction in the total time to develop your custom Drupal project with custom design system of any complexity
comparing to what you had before - that means... money !

2. Storybook included in theme generator. 

I hope you all already had experience with [Storybook](https://storybook.js.org/). It's a great tool for keeping 
front-end state up-to-date on the project. It makes your customers happy since they can see a lot of progress already in the 
beginning of project. Since front-end developer can build all pages with all html structure, styles and scripts 
from your unique design system, spending only ~10-20% of the project's budget and customer can see already a lot of results
in the beginning of its project. But that's not all, because with our integration almost all components from storybook will be 
fully re-used by Drupal, so `Storybook` becomes not a standalone tool. Methodology of doing storybook is well described 
[below](#methodology-of-doing-storybook).

3. Fast growing drupal experience of drupal developers.

#### For a regular drupal developer

1. <strong>Again</strong>. <strong>Experience</strong> with Drupal.

2. Well known tools in theme generator.

All the well known features partially coming from drupal core under the hood: postCSS, Javascript ES6, linting processes.
Also many other very helpful features: [read below](#features-generated-theme-will-have).

3. Familiar structure of theme, similar to drupal core themes.

4. Powerful and modern tools: vite, storybook - everything to make your life easier and development process faster.

5. Faster creation of new components, thanks to [Component generator](https://www.npmjs.com/package/@skilld/drupal-component-generator).

How to use `Component generator` is described [below](#how-to-create-new-component).

## Features generated theme will have

- [Vite](https://vitejs.dev/)
- PostCSS v8.4
- Javascript ES6+ (No need for ES5 anymore, because all major browsers already [supporting](https://caniuse.com/?search=es6) ES6)
- Drupal's breakpoints in CSS and JS. [Read more](#drupals-breakpoints-in-css-and-js)
- Rems everywhere. Write your source css styles in pixels, but on the `build` task it will be converted to `rems` automatically.
- [Storybook](https://storybook.js.org/docs/react/builders/vite) v7.0
- Drupal component generator - [learn more](https://www.npmjs.com/package/@skilld/drupal-component-generator)
- Linting and auto-fixer of CSS, JS, YML files using Stylelint, Eslint and Prettier
- SVG sprite generator and optimizer of SVG assets. [Why SVG sprite technology](#why-svg-sprite-technology)
- [Favicon generator](https://www.npmjs.com/package/cli-real-favicon). Check [below](#how-to-generate-favicon) how to use favicon generator.
- Integration with [Color](https://www.drupal.org/project/color) module to be able to customize palette of colours on your web-site through admin back office.
- Multiple base components pre-installed in theme with minimal styles and scripts.

## Installation

Our plans are to create contrib starterkit theme and put it on drupal.org, so you will be able 
to generate sub-theme using 
[this php script](https://www.drupal.org/docs/core-modules-and-themes/core-themes/starterkit-theme)
or drush. However these functionalities aren't done yet.

But already today you can generate your new drupal theme with our generator using:
1. `npx @skilld/drupal-theme-generator`
2. or via docker - `docker run -it --rm -u $(id -u):$(id -g) -v "$PWD":/app -w /app node:lts-alpine npx @skilld/drupal-theme-generator`

After execution of one of those commands - just follow instructions in console.

Then you have to:
1. `cd themename/`
2. `yarn install` or via docker `make install`
3. `yarn build` or via docker `make build`

## Explanation of generated theme

You have to install and enable the following Drupal modules before enabling generated theme:
- [UI patterns](https://www.drupal.org/project/ui_patterns)
- [UI Patterns Field Formatters](https://www.drupal.org/project/ui_patterns_field_formatters)
- [Components](https://www.drupal.org/project/components)
- [Component connector](https://www.drupal.org/project/component_connector)

However if you don't want/need to get full experience of usage of our component connector initiative and want
just to try theme as it is - you can remove all `dependencies` from `your_theme.info.yml` file except of
`components:components` and just enable the theme in Drupal.

### Purposes of generated theme

Goal of generated theme and our initiative is to implement a whole design system in components and integrate
them in Drupal natively.

<strong>As a front-end developer you can not be an architect of Drupal web-site, no matter which experience you have.</strong>
The architect
of project can be defined only with communication between all involved persons - project managers, 
back-end and front-end developers, all together. That means when front-end developer want to create one or another component - he
should think first how this component will be integrated in Drupal - as a `theme`, `layout`, `suggestion` or `ui_patterns`
way. If front-end developer sure its `my-selectbox` component should be applied to core theme hook `select` - there is
no problem with it, so front-end developer can just move its component into `suggestions` folder ([Read again about our integration](https://git.drupalcode.org/project/component_connector)
if you don't clearly understand why `suggestions` folder). But if front-end developer can't guess what this component
will be in Drupal - a component should be placed in `uncategorized` folder and wait for its usage. When back-end developer will 
start to work on this subject - he can decide how component can be integrated in Drupal and move it from `uncategorized` folder 
to the one of other folders.

However, it was recommended usage. But you also may not use our integration at all. There is always available folders:
- `templates/overrides` for your twig overrides
- `css/` for storing styles
- `js/` for javascript
- `theme_name.theme` for hooks

### Structure of generated theme

- Source CSS and JS files have suffixes `.src` in filenames
- Generated styles and scripts doesn't have `.src` suffix. Normally you should never touch generated assets since it's build affected
- Styles and scripts required only by Drupal can be added in the root `css/` or `js/` folders. For example styles 
  for administrative toolbar - we don't want to take care about such components in storybook. So toolbar overrides 
  can be done only for Drupal
- `.storybook/` folder for storing storybook stuff. If you don't use storybook on your project - feel free just ignore or remove this folder
- `favicon/` folder contains generated favicons for different browsers. You can generate your custom favicon [this way](#how-to-generate-favicon)
- `fonts/` folder for storing project fonts
- `images/svg/` folder for storing source SVG assets. Pay attention to `images/sprite.svg` - this file is auto-generated, 
so you shouldn't modify it normally. [Read more](#svg-sprite) about SVG sprite
- `templates/` folder contains two sub-folders. One of them is `overrides/` - this folder is for drupal's twig overrides. 
And `components/` folder for storing components required by our integration.

## How to create new component

Run `yarn cc` or via docker `make cc`
and follow instructions in console.

New component will be added in `templates/components/**` folder. Read more about [component generator](https://www.npmjs.com/package/@skilld/drupal-component-generator).

## How to compile styles and scripts

Simply run `yarn build` or via docker `make build`

It will compile all assets from `css/`, `js/` and `templates/components/**` folders. Compiled assets
are living near to sources. So we don't have `dist` or `app` folder in the root of theme.

`build` task contains subtask `lint:fix` which executes right after build - so linting with auto-fixer included.

There is Stylelint, ESlint and Prettier for the linting of code. Warnings are not allowed -> that's why any warning
in console will be targeted as `error` type. Stylelint and ESlint are running in a parallel and once it's finished - Prettier 
executes. If you got an error on Stylelint or ESlint steps - Prettier will not be executed. Note that <strong>you
have to resolve all errors in console before making commit.</strong>

There is also watcher available, just run `yarn build:watch` or `make build:watch` to enable it.

## How to run and compile storybook

To run storybook on local port run `yarn storybook` or via docker 
`make storybook`

To create static storybook run `yarn build:storybook` or `make build:storybook`

## Linting

Linting and auto-fixers are already included in `build` command. So normally if you are using 
`yarn build` or `make build`
commands - it's already enough. But if you want to just lint assets without `build` task
simply run `yarn lint` command (or via docker `make lint`).
And if you want to auto-fix linting errors, run `yarn lint:fix` (or via docker 
`make lint:fix`)

All warnings are interpreting by all kind of linters as errors.
So if you are using CI or some custom scripts before `git commit` for validation or something, you
will get failed results even in case of `warnings`.

## Drupal's breakpoints in CSS and JS

We have made a very nice functional, which allows you to align media queries everywhere: in your CSS, JS and 
Drupal's responsive images.

Based on [Breakpoints in Drupal](https://www.drupal.org/docs/theming-drupal/working-with-breakpoints-in-drupal)
you have already pre-defined `theme_name.breakpoints.yml` file in theme with some pre-defined breakpoints after installation
of your new theme. Of course your custom design system can have own breakpoints system, but if it's not - you can simply use 
default breakpoints provided by our theme generator. And you can use those breakpoints from CSS or JS.

Usage in CSS:
```
.selector {
  @media (--xxs) { ... }
  @media (--xs) { ... }
  @media (--s) { ... }
  @media (--m) { ... }
  @media (--l) { ... }
  @media (--xl) { ... }
  @media (--xxl) { ... }
}
```

In JS all available breakpoints lives in [drupalSettings](https://www.drupal.org/docs/drupal-apis/javascript-api/javascript-api-overview)
and its usage is:
```
drupalSettings.yourThemeBreakpoints.xxs
drupalSettings.yourThemeBreakpoints.xs
drupalSettings.yourThemeBreakpoints.s
drupalSettings.yourThemeBreakpoints.m
drupalSettings.yourThemeBreakpoints.l
drupalSettings.yourThemeBreakpoints.xl
drupalSettings.yourThemeBreakpoints.xxl
```

So you can simply check if window is matching specific media, like this for example:

```
if (window.matchMedia(drupalSettings.yourThemeBreakpoints.xl).matches) { ... }
```

All the default breakpoints you will get after theme installation are market and `mobile first` based. `Market based` means we did an 
analysis of market of world-spread electronic devices and default breakpoints are the more fitting.

Answering your questions why for example breakpoint `min-width: 1441px` and not `1440px` - it's logically justified.
Well a big amount of laptops around the world have screens with the resolution `1440` pixels. Now guess any
responsive image which is taking a whole width of viewport (for example some banner image) - it makes sense to load `1440` pixels
image on such laptops, isn't? If there was a breakpoint `min-width: 1440px` - then on such screens the next breakpoint could be
triggered.

## SVG sprite

An SVG sprite is a single SVG file that contains multiple icons as <svg> elements. Each icon has a unique id 
attribute that you can use to select it.

### Why SVG sprite technology

There is a lot of benefits of using svg sprite instead of other technologies of delivering icons:

1. SVG sprite is cached by browser once user visited any page
2. Possibility to customize colors for single color icons based on design system palette
3. Technology supported by all major browsers
4. No blinking effects on hover of icon which happens to iconic CSS background images for example
5. Weight of SVG sprite is tiny if to compare with CSS background images, or iconic fonts technologies
6. No shred of quality degradation on resize, but also better anti aliasing than iconic fonts for example

### How to generate SVG sprite

Source SVG icons should be stored in `images/svg` folder. Compiled SVG sprite lives in `images/sprite.svg`.

To generate SVG sprite from source icons just run `yarn sprite` or via docker 
`make sprite`

SVG sprite generation is a rare task, so it's not included in `build` task, because it takes time,
and probably you will need to generate or re-generate svg sprite just only several times for entire project.

### How to use SVG sprite

Normally there is already a component called `a-icon`, which is living in `templates/components/theme/` folder.
You can use this component any time you should have SVG icon in your render.

Usage in twig is next:

```
<svg>
  <use xlink:href="{{ your_theme_name_svg_sprite }}#svg-{{ icon }}"></use>
</svg>
```

Usage in PHP:

```
'<svg><use xlink:href="' . _your_theme_name_get_svg_sprite_path() . '#svg-{{ icon }}"></use></svg>'
```

Path to SVG sprite lives in [drupalSettings](https://www.drupal.org/docs/drupal-apis/javascript-api/javascript-api-overview) and 
its usage in JS is:

```
<svg>
  <use xlink:href="${drupalSettings.yourThemeNameSvgSprite}#svg-${icon}"></use>
</svg>
```

### How to optimize source SVG files

Sometimes source icons can have weird structure inside and many useless attributes and techniques 
for web usage (for example it's `stroke` based instead of `fill`). If you need to clean-up specific svg 
icon - simply run `FILE=icon-name.svg yarn svg-fix` or via docker `FILE=icon-name.svg make svg-fix`. 
You don't need to write full path to icon in those commands. It's supposed your icon already placed in
`images/svg` folder

If you need to optimize all of the icons at once - run `yarn svg-fix:all` or via docker 
`make svg-fix:all`

## How to generate favicon

You have to have your favicon in vector graphic format named `favicon.svg`. Put this file in
the root of theme and just run `yarn favicon` or via docker
`make favicon`

Wait a bit and new favicons will be added into `favicon` folder.
Then clear cache in Drupal and new favicons will be automatically applied in drupal
because of `page_attachments_alter` Drupal hook in `your_theme.theme` file.

## About components

### Atomic design

In components we are using [Atomic design](https://bradfrost.com/blog/post/atomic-web-design/) approach.

Component folder and files inside has atomic prefixes:
- `a` - Atom. Usually it's tiny undividable cells, like `a-icon`, `a-checkbox`, `a-radio`, `a-throbber`, etc.
- `h` - Helper. Kinda softener, helps other components to get some universal functionality. [Read more](#pre-defined-components) about helpers.
- `m` - Molecule. Can be some `m-card`, `m-banner`, or `m-checkboxes`. So it's a good-size components, with several "atoms" inside, but not big enough
to be organisms.
- `o` - Organism. Can be some `o-some-view` or `o-some-block`. Analogue in Drupal are blocks for example, or views, which contains several molecules.
- `t` - Template. It can be layouts of the whole page. If you are using [Panels](https://www.drupal.org/project/panels) for example or some
other module which allows you to configure different layouts for different pages - this is where `Template` category will help.
- `p` - Page. Global layout of the entire web-site, including header, footer, system, main content regions and so on. Analogues in Drupal are `page` 
theme hook or `maintenance_page` for example.

These prefixes allows us:
- To be sure our custom component will never override drupal's default twig suggestions. For example if drupal's 
twig suggestion is `select.html.twig` - twig in our component will never have same naming, instead it will have something like
`a-select.html.twig`. So there is no collisions
- To better group components. It's a natural awareness when you know that molecule contains atoms for example, but not vice versa. In storybook we have sidebar with the list of all components and it's grouped per their atomic type
- To understand which order should be in DOM tree for css and js assets. For example if `a-component-name` is loaded in DOM tree after some molecule or organism - probably it shouldn't be like this, because high risk styles of atom will override styles of more high-level component. And by the way loading of assets in storybook is built by this principle.

### Component structure

Every component folder contains several files inside:
- `.src.css` and it's compiled version `.css`
- `.src.js` and it's compiled version `.js`. By the way in these js files we initially have code wrapped in Drupal's behavior. Drupal's `settings` and `context` are also available and it works in storybook.
- `.stories.js` - for storybook needs. Initially such files contains everything you will need for preview any component in storybook. If you don't want
to support storybook on your project - you can just ignore this file.
- `.html.twig` - twig of component. By the way `attributes` variable is always available in any component by default in Storybook. Other fields and settings you can declare in `.yml` file or describe them in `.stories.js`
- `.yml` - configuration of component. [Read more](https://www.npmjs.com/package/@skilld/drupal-component-generator) about how to write `yml` files and also explanation of every file inside component.

<img src="https://raw.githubusercontent.com/skilld-labs/drupal-theme-generator/images/images/5.png?raw=true" width="200"/>

Also here is the [link](https://www.npmjs.com/package/@skilld/drupal-component-generator) to our component generator
where you can find more information about every file in component.

### Principle of building components

If you are not too much familiar with Drupal or just don't know what your current component will be in 
Drupal - just put your component in `templates/components/uncategorized` folder. And later when back-end developer will start
to work on such component in Drupal - he can change `.yml` 
file and move your component from `storybook` 
folder to some other specific folder (depending on the type of integration will be taken).

Goal is to build maximum amount of components which will be natively integrated in Drupal. Which means - in the end of 
project `storybook` folder should have as minimum as possible components, which are not integrated. Also `Helpers` can
live in this folder, because they are not explicitly used in Drupal. And of course you will always have some other unclear and/or complicated 
components, like dialogs or autocompletes or ajax throbbers which will be partially integrated in drupal (for example only css 
file of such components will be integrated in drupal and that's all). Such components should also live in `storybook` folder, because
they are not natively integrated.

### Namespaces

We also using [Components](https://www.drupal.org/project/components) drupal module for namespaces.

Global namespace is `@component` no matter in which folder component is living. Same namespace is working
in Storybook. So if you need to call your component somewhere in twig, you can just write:

```
{{ include('@component/a-button/a-button.html.twig', { props }) }}
```

You can find several examples of such usage in pre-defined components.

If component was moved from one folder to another - normally
all you have to do is to change `yml` file only. [Read more](https://git.drupalcode.org/project/component_connector) about how `yml` file should be organized.

### Pre-defined components

In generated theme you will get a big list of pre-defined components. It is base components which are exist on
every single project. Every pre-defined component has minimal twig with minimal styles and scripts by default. Also components are
already attached to their required type of integration (so it's already splitted by required folders). You can take these
components as a reference for creation of your custom components. You can also customize pre-defined components based on your
design system.

Now several words about some "specific" pre-defined components.

#### Buttons and inputs

Keep in mind that with our native integration we are not recommending to create abstract components which can not be
applicable to Drupal, like `button` component for example (which means
UI component `Button`). In terms of Drupal - there is no simple integration of UI component `button`. But Drupal have 
for example `input` theme hook. So we can be sure that `input [type="submit"]` should look like a button. For that
we have added in our theme generator in the list of pre-defined components - `a-input-submit` component, which is living in
`templates/components/theme/a-input-submit`. So this component is applied always to `input__submit` hook in Drupal.

Ok, where else we should have buttons? Well - it can be some links, which are visually looking like a button. But in Drupal
there is no theme hooks like `link-button` or at least just `link`. So we have added a new component `a-link-button` where we 
have declared a new theme hook `a_link_button`. Now from PHP back-end developers can use this hook.

What about Drupal admin back-office? Well - there is another component which is `ui_pattern` called `m-cta-field` which can be 
applied to the `link` field type, and its visual display will be just like a `button`.

So as you can see by default you have 3 different pre-installed components for buttons in theme generator, which are integrated in Drupal
differently. But where to store styles for buttons in that case?

For styles - there is fourth component, called `h-button` and it lives in `templates/components/uncategorized/h-button`. This component
doesn't have any `twig` or `stories.js` file. It's just a CSS styles for buttons. This component is already attached globally in Drupal,
so it's available on any page. If you will open components `a-input-submit`, `a-link-button`, `m-cta-field` - you will notice its 
templates contains `h-button` classnames as a reference to the base styles.

Regarding other input types, like `checkbox`, `radio`, `text`, `email`, `password` and other - for some of them there is already
pre-defined components and it's living in `templates/components/theme/a-input-*` folders. Each such component already integrated 
in Drupal for its specific input type. If you need other types in your design system - just create one more component and integrate
it in Drupal same way.

For the textable inputs - there is helper component called `h-text-input` which contains base styles for textable inputs, like 
`text`, `email`, etc. Even `templates/components/suggestions/a-textarea` component is related to `h-text-input`.

For the boolean inputs (checkbox and radio) - same situation. Since visual difference between those two components usually is a 
CSS `border-radius` only - we have added one more helper `h-boolean` which contains base styles for `radio` and `checkbox` input type.
It's integrated same way as other input types described above.

So such integration of buttons and inputs is logically substantiated and we are recommending to follow same principal.

#### Atom "Image"

This component is living in `templates/components/suggestions/a-image` folder. It is applied to the core theme hook `image`. 
But you can find also `config.styles.yml` file in this component. This file is supposed to be for documenting all the image
styles from entire design system. There is several "test" image styles under the hood - you can remove them, because they are
just added for testing purposes and to be as a reference for you to create other image styles.

As a front-end developer - you are an architect of site layout, so you can understand which image styles you have to create
on which media breakpoints and with which image style effects.

In `config.styles.yml` you will find an explanation how you should declare your image styles.

Example of creation image style with effect `Scale and crop`:

```
500_x_500_scale_and_crop:
  label: 500 x 500 (Scale and crop)
  effect: image_scale_and_crop
  width: 500
  height: 500
```

Example of creation image style with effect `Scale` and auto width:

```
auto_x_500_scale:
  label: Auto x 500 (Scale)
  effect: image_scale
  width: auto
  height: 500
```

Example of creation image style with effect `Scale` and auto height:

```
500_x_auto_scale:
  label: 500 x Auto (Scale)
  effect: image_scale
  width: 500
  height: Auto
```

Example of creation image style with effect `Scale` and maximum possible width and height:

```
500_x_500_scale:
  label: 500 x 500 (Scale)
  effect: image_scale
  width: 500
  height: 500
```

Storybook is sensitive to `scale_and_crop` and `scale` image effects. In case if `effect` is `scale`,
dimensions affected. For example if image style is `500_x_auto` (so auto height), in that case storybook will take into
account width of image style and by using little coefficient will make height. For example final dimensions of such image can be
`500x461` or `500x523` - so height is close to width, but various.

Idea of this file is to document all possible image styles, so after back-end developer can write a simple script which will take
this file and generate all possible image styles and its configs in Drupal automatically. This process is supposed to be done
only once on project. Normally back-end developer can generate all image styles in Drupal only when 100% of image styles are described
in this file. Moreover, this file is already using
by our storybook. So Storybook and Drupal will be aligned in terms of images.

For the displaying images in Storybook we are using [faker](https://www.npmjs.com/package/@faker-js/faker) library. And by default
type of images is `abstract`, but you can customize this type in `a-image.stories.js` if you need.

Usage of this component in storybook is next:

```
r('a-image', {
  style: 'machine_name_of_image_style',
  fakerProvider: 'some_other_type_of_image', // If need to customize image type - https://fakerjs.dev/api/image.html
})
```

Pay your attention to the default image style called `1_x_1_fallback`. This image style is helpful when for example you should have
hidden image on some media breakpoint. Not everyone knows, but image is still downloading by browser even if it's hidden in CSS with
`display: none;`. For browser it doesn't matter if it's hidden or not. So for such cases to improve performance on the page - you 
can use this image style in your responsive image group for specific breakpoint (on which your image is supposed to be hidden).

#### Molecule "Responsive Image"

This component is living in `templates/components/suggestions/m-responsive-image` folder. It is applied to the core theme hook
`responsive_image`. You can also find `config.groups.yml` file in the folder of this component. This file is supposed to be for
documenting all the responsive image groups from entire design system. Same as `a-image` - there is several "test" responsive image 
groups pre-defined in this file. You can remove them and create your own.

In `config.groups.yml` you will find an explanation how you should declare your responsive image groups.

Example of some responsive image group:

```
machine_name_of_responsive_image_group:
  label: Label
  breakpoints:
    xxl:
      1x: 500_x_200_scale_and_crop
    l:
      1x: 500_x_200_scale_and_crop
      2x: 1000_x_400_scale_and_crop
    xxs:
      1x: 500_x_200_scale_and_crop
  fallback: 500_x_200_scale_and_crop
```

So as you can see `a-image` and `m-responsive-image` are totally referring to Drupal architecture.

Idea is to collect and document all the responsive image groups, so once it's done - back-end developer can write a simple script which
will take this file and generate all responsive image groups with configs in Drupal automatically. This process is supposed to be done
only once on project. Normally back-end developer can generate all responsive image groups in Drupal only when 100% of responsive image groups are described
in this file. Storybook is also using this file,
so you can build your storybook components with the specific responsive image groups.

For displaying image in Storybook we are using [faker](https://www.npmjs.com/package/@faker-js/faker) library. And by default
type of images is `abstract`, but you can customize this type in `m-responsive-image.stories.js` if you need.

Usage of this component in storybook is next:

```
r('m-responsive-image', {
  group: 'machine_name_of_responsive_image_group',
  fakerProvider: 'some_other_type_of_image', // If need to customize image type - https://fakerjs.dev/api/image.html
});
```

#### Helper "Root variables"

This component is living in `templates/components/uncategorized/h-root-variables` folder.

Sometimes `100vw` or `100vh` CSS values may return incorrect dimensions of visible area in viewport (especially on iOS devices).
This is where this helper can help you.

It helps you to measure your real viewport's width and height and put these dimensions into css variables 
in `html` tag via `style` attribute, so they are always accessible on any page.

These CSS variables are:

```
  --viewport-width
  --viewport-height
```

By default in `css/_variables.src.css` these variables are set to `100vw` and `100vh` as a fallback.

Example of usage:

1. Mobile dropdown navigation which should take full height of the screen.
2. Dialogs which should be sensetive to max-height of the viewport.
3. etc.

#### Helper "Wrapper as link"

This component is living in `templates/components/uncategorized/h-wrapper-as-link` folder.

This component helps you to simulate link on the entire wrapper using little javascript. For example if in your entity only title is a link in Drupal,
but you want to have a whole entity clickable - you can use this helper.

Usage of this component:
1. This component has own library definition in `theme_name.libraries.yml`, so you have to link this library to your related
component as a dependency if you want to use it.
2. Simply add `wrapper-as-link-container` html attribute to the expected wrapper and JS script will automatically find first matched
link inside of your wrapper and simulate click on the entire wrapper.

It works even with ajax `use-ajax` links.

When script has finished execution and if link was found - you will get another html attribute added in your wrapper called
`wrapper-as-link-target-built`. You can use this attribute as a reference in your CSS files.

As an example - guess the `m-card`, which contains image, clickable title, and some body text. Default behavior is when
only title is clickable. But once script has been added & executed on the page - a whole card becomes clickable, so you can
use `wrapper-as-link-target-built` attribute to improve visual styling.

Be careful, if in your entity you have several links with different `href`, probably you shouldn't use this script in that case.

### Pre-defined Drupal javascript

After theme generation you will find two javascript files in `/js` folder:

1. `ajax-throbber.src.js` and its compiled version. This file is supposed to override ajax throbbers in Drupal.
It's fully aligned with the pre-defined components so normally you will see all the same ajax throbbers in Drupal,
just like in Storybook when you activating `Ajax` control in component. For now there is only 3 types of components
where ajax throbber is reflecting: for buttons (there is different logic of throbber in case if button doesn't have icons,
or have icon only before text or after), for radios and checkboxes. If `element` which is triggered ajax request is
not in this list - fullscreen throbber will be added.
2. `states.src.js` and its compiled version. Since we are using SVG sprite technology, we have switched
`input` html tag on `button` in `a-input-submit` component. However, drupal's core `states.js` can't handle `button`
html tags. So this file contains a fix for `disabled` state for `button` html tag for form submits.

### Third party libraries

We want to follow drupal core principle in terms of third party libraries. So libraries should live in `/libraries/your-library-folder/`
in the root of project and been manageable via root `composer`. This is recommended process of managing and delivering 
third party libraries in Drupal.

However front-end world loves `package.json` and want to have control on used third party libraries in there. This topic is still
WIP and there is no "good" solution at this moment. 

What you can do today is next:
1. You can manage third party libraries in `package.json` of the theme and then `import` it normally right in your `my-component.src.js`,
same to CSS - `@import "your-lib.css"`. Imported libraries are not affecting linters and it be compiled in every target files
in every component where you did imports. <strong>We don't have chunks!</strong> - that means if you will import same library 10 times in 10
different components - library will be compiled 10 times in 10 different files. So it's a question of your architecture. If you need to call
same library several times -> create new component and put your library in there and then re-use it as a dependency in Drupal. The more times
you are using libraries via `import`, the more weight of those libs - the more `build` becomes slower.
2. Alternative way is to declare assets of third party libraries in Storybook separately in `theme_name/.storybook/preview-head.html` file. 
After theme installation you already have `jQuery` library declared out there.
So when you will run Storybook there will be already accessible libraries in DOM, and then in your javascript of components you
have to write same code as it's done in Drupal core.

For example if we are talking about `Splide` library, then JS code in your component should be like this:

```
(({ behaviors }, Splide) => {
  behaviors.someDrupalBehaviorName = {
    attach: (context) => {
      if (!Splide) {
        return;
      }
      
      // otherwise process the code.
    }
  }
})(Drupal, window.Splide);
```

Then, in the root `composer` you have to add `Splide` package again exclusively for Drupal. So once `composer require <some_library>`
will be executed - third party library will be downloaded into root `/libraries` folder.

Then, declare a new Drupal library in `theme_name.libraries.yml` with the paths to CSS and JS of your third party library, like:

```
splide:
  css:
    component:
      /libraries/splide/dist/css/splide-core.min.css: { minified: true }
  js:
    /libraries/splide/dist/js/splide.min.js: { minified: true }
```

And then link this drupal library as a dependency in your `component-name.[type_of_integration].yml`

<strong>Other solutions are currently unstable.</strong>

We are working on this subject and will try to find a good and simple solution which will make everyone happy.

## Methodology of doing Storybook

Storybook is a great specification of the current front-end state on project. Even after several years of development
if newcomer will join the project - he can just open Storybook to see the latest state of all components.

We are highly recommending to keep Storybook updated so it should be always aligned with the actual state
of Drupal web-site. <strong>Once you lose at least several minor updates - potentially you can lose a whole Storybook.</strong>

If architecture of some blocks was changed in Drupal, if new features are planning to appear - always provide them in Storybook
and then integrate in Drupal.

### How to split design system on components

Sometimes designers already can do this job on design, so it will simplify a bit work for developer. However, keep in mind
that designer is not Drupal developer. If designer have provided a list of components on figma or somewhere else - 
it doesn't really mean same components should be added in web. There is only one important thing for you before creation 
of components - is <strong>how this component will be integrated in Drupal !</strong>

Of course there is always common components on any design system, like `checkbox`, `radio`, `logo`, and so on.
But keep in mind that even component `button` is not so easy to integrate. 
Please [see above](#buttons-and-inputs) to understand why even button.

Here is several good practices regarding splitting design system on components:
- Try to use as much as possible same namings from your design system (if your design system have it). It's about everything:
naming of components, naming of modifiers of components, naming of colors and so on.
- Don't use unclear namings. For example if color name on design is `color-yellow` - ask designer to change such naming onto something more
neutral and abstract, like `color-primary` for example, or at least `color-1`. Same for modifiers - no modifier namings like
`button-green`, instead -> `button-primary` or `button-second`, etc.
- Following naming principal your components will be aligned with design, which will save you a lot of time during development.
- If your design is not splitted on components, then you have to do it by yourself. For that - start to integrate `atoms` first, then
more high-level components. Even if you are not familiar with Drupal too much - you anyway can integrate simple components like: buttons,
icons, texts, form elements, cards, teasers, etc.
- Don't create monster components with a lot of modifiers. Practice shows it will be impossible to support them in future. For example
if you have two or three similar cards with the only one or two little difference - it can be same component with modifiers. But if 
components requires different markup -> split them on different components.
- Communicate with the lead back-end developer on the project. If you don't clearly understand how exactly you have to split some elements
on components from your design - just postpone this subject if no solution at this moment, or just put your component in `uncategorized`
folder. So later, when back-end developer will start to work on this subject, you all together can re-do such component if need and 
integrate this in Drupal by the one of available types of integration.

Normally Storybook is supposed to be finished only when a whole design is embodied in components.

Here is an example of the tree of components:

Atoms
- `a-link-button`
- `a-text`
- `a-image`

Molecules
- `m-cta-field`
- - `a-link-button`
- `m-text-field`
- - `a-text`
- `m-responsive-image`
- - `a-image`
- `m-card`
- - `m-responsive-image`
- - `m-text-field`
- - `m-cta-field`

Organisms
- `o-view-items`
- - `m-card`
- - `m-card`
- - `m-card`

Templates
- `t-homepage`
- - `o-view-items`
- - `o-something-else`

Pages
- Header
- - `o-some-organisms`
- Main content
- - `t-homepage`
- Footer
- - `o-some-organisms`

## Debug in Drupal

For debugging in Drupal you need to:

1. Disable aggregation first on performance page `/admin/config/development/performance`

<img src="https://raw.githubusercontent.com/skilld-labs/drupal-theme-generator/images/images/2.png?raw=true" width="500"/>

2. Thanks to Drupal 10.1 we now have `Development settings` page `/admin/config/development/settings`. You have
to enable everything on this page

<img src="https://raw.githubusercontent.com/skilld-labs/drupal-theme-generator/images/images/3.png?raw=true" width="500"/>

3. Then open DevTools in browser on the user page and there you will see a lot of useful information for every
layer of render

<img src="https://raw.githubusercontent.com/skilld-labs/drupal-theme-generator/images/images/4.png?raw=true" width="700"/>

## License

This project is licensed under the MIT open source license.
