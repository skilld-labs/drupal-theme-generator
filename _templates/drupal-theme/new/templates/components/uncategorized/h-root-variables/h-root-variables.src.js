---
to: <%= h.src() %>/<%= h.changeCase.lower(name) %>/templates/components/uncategorized/h-root-variables/h-root-variables.src.js
---
const rootVariablesHandler = () => {
  document.documentElement.style.setProperty(
    '--viewport-width',
    `${document.documentElement.clientWidth}px`,
  );
  document.documentElement.style.setProperty(
    '--viewport-height',
    `${window.innerHeight}px`,
  );
};

(({ behaviors }) => {
  behaviors.<%= h.changeCase.camelCase(name) %>HelperRootVariables = {
    attach: (context) => {
      const body = once(
        'root-variables',
        document.documentElement,
        context,
      ).unshift();
      if (body) {
        rootVariablesHandler();
        ['DOMContentLoaded', 'load', 'resize'].forEach((event) =>
          window.addEventListener(event, () => rootVariablesHandler()),
        );
      }
    },
  };
})(Drupal);
