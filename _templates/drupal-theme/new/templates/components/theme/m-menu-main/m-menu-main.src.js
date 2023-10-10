---
to: <%= h.src() %>/<%= h.changeCase.lower(name) %>/templates/components/theme/m-menu-main/m-menu-main.src.js
---
/**
 * @file
 * This is component script template.
 */
(({ behaviors }) => {
  behaviors.<%= h.changeCase.camelCase(name) %>MoleculeMenuMain = {
    attach: (context) => {
      once('m-menu-main', '.m-menu-main', context).forEach((el) => {
        behaviors.<%= h.changeCase.camelCase(name) %>MoleculeMenuMain.handler(el);
      });
    },
    handler: (el) => {
      el.querySelectorAll(
        '.m-menu-main__list--level-1 > .m-menu-main__item--has-menu > .m-menu-main__link',
      ).forEach((link) => {
        link.addEventListener('click', (e) => {
          if (window.matchMedia('(hover: none)').matches) {
            e.preventDefault();
            link.parentElement.classList.toggle('m-menu-main__item--active');
          }
        });
      });
    },
  };
})(Drupal);
