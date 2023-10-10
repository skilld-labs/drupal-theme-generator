---
to: <%= h.src() %>/<%= h.changeCase.lower(name) %>/templates/components/uncategorized/h-wrapper-as-link/h-wrapper-as-link.src.js
---
/**
 * @file
 * This javascript can be used to simulate
 * link wrapper around whole entity.
 */

(({ behaviors }, $) => {
  behaviors.<%= h.changeCase.camelCase(name) %>HelperWrapperAsLink = {
    attach: (context) => {
      once('wrapper-as-link', '[wrapper-as-link-container]', context).forEach(
        (el) => {
          // It's not expected to have multiple different links in your container,
          // since simulation of link will be done on the whole container,
          // so you can lose your other links.
          // You can have several links with same [href] in your container.
          const link =
            el.querySelector(`a[wrapper-as-link-target][href]`) ||
            el.querySelector('a[href]');
          if (link) {
            behaviors.<%= h.changeCase.camelCase(name) %>HelperWrapperAsLink.handler(el, link);
          }
        },
      );
    },
    handler: (el, link) => {
      const isAjaxLink = link.classList.contains('use-ajax');
      link.setAttribute('wrapper-as-link-target-built', '');
      el.setAttribute('wrapper-as-link-built', '');
      el.setAttribute('tabindex', '0');
      el.setAttribute('role', 'link');
      el.querySelectorAll('a[href]').forEach((innerLink) => {
        innerLink.setAttribute('tabindex', '-1');
      });

      if (isAjaxLink) {
        el.addEventListener('mousedown', (e) => {
          behaviors.<%= h.changeCase.camelCase(name) %>HelperWrapperAsLink.fakeLinkEvents(
            el,
            link,
            e,
            isAjaxLink,
          );
        });
      } else {
        el.setAttribute(
          'aria-label',
          link.hasAttribute('title')
            ? link.getAttribute('title')
            : link.textContent.replace(/\s+/g, ' ').trim(),
        );
        el.addEventListener('click', (e) => {
          behaviors.<%= h.changeCase.camelCase(name) %>HelperWrapperAsLink.fakeLinkEvents(el, link, e);
        });
      }

      el.addEventListener('keydown', (e) => {
        behaviors.<%= h.changeCase.camelCase(name) %>HelperWrapperAsLink.fakeLinkEvents(
          el,
          link,
          e,
          isAjaxLink,
        );
      });
    },
    fakeLinkEvents: (el, link, e, isAjax = false) => {
      if (isAjax) {
        if (
          (e.type === 'mousedown' || e.key === 'Enter') &&
          e.target &&
          e.target.tagName !== 'A' &&
          !e.target.closest('[wrapper-as-link-target-built]')
        ) {
          $(link).trigger('click');
        }
      } else if (
        (e.type === 'click' || e.key === 'Enter') &&
        e.target &&
        e.target.tagName !== 'A' &&
        !e.target.closest('[wrapper-as-link-target-built]')
      ) {
        window.open(
          link.getAttribute('href'),
          link.hasAttribute('target') ? link.getAttribute('target') : '_self',
        );
      }
    },
  };
})(Drupal, jQuery);
