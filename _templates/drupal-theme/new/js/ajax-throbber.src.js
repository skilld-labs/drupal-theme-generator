---
to: <%= h.src() %>/<%= h.changeCase.lower(name) %>/js/ajax-throbber.src.js
---
/**
 * @file
 * Ajax throbber overrides.
 */

(($, Drupal, drupalSettings) => {
  const throbberHandler = (obj) => {
    if ($(obj.element).hasClass('h-button')) {
      const $iconStart = $(obj.element).find(
        '.h-button__icon-container--start',
      );
      const $iconEnd = $(obj.element).find('.h-button__icon-container--end');
      if (
        (!$iconStart.length && !$iconEnd.length) ||
        ($iconStart.length && $iconEnd.length)
      ) {
        obj.progress.element = $(Drupal.theme('throbberButtonFull'));
        $(obj.element).prepend(obj.progress.element);
      } else if ($iconStart.length || $iconEnd.length) {
        obj.progress.element = $(Drupal.theme('throbberButton'));
        if ($iconStart.length) {
          $iconStart.prepend(obj.progress.element);
        } else {
          $iconEnd.prepend(obj.progress.element);
        }
      }
    } else if ($(obj.element).hasClass('h-boolean__element')) {
      obj.progress.element = $(Drupal.theme('throbberBoolean'));
      $(obj.element).after(obj.progress.element);
    } else {
      obj.progress.element = $(Drupal.theme('throbberFullScreen'));
      $('body').append(obj.progress.element);
    }
  };

  const buildThrobberIcon = (classes = undefined) => `
    <svg class="a-icon a-icon--throbber-circle${
      classes ? ` ${classes}` : ''
    }" aria-hidden="true">
      <use xlink:href="${
        drupalSettings.<%= h.changeCase.camelCase(name) %>SvgSprite
      }#svg-throbber-circle"></use>
    </svg>
  `;

  // eslint-disable-next-line func-names
  Drupal.Ajax.prototype.setProgressIndicatorThrobber = function () {
    throbberHandler(this);
  };

  // eslint-disable-next-line func-names
  Drupal.Ajax.prototype.setProgressIndicatorFullscreen = function () {
    throbberHandler(this);
  };

  Drupal.theme.throbberBoolean = () =>
    buildThrobberIcon(
      'h-boolean__icon h-boolean__icon--throbber a-throbber a-throbber--circle',
    );

  Drupal.theme.throbberButton = () =>
    buildThrobberIcon(
      'h-button__icon h-button__icon--throbber a-throbber a-throbber--circle',
    );

  Drupal.theme.throbberButtonFull = () => `
    <span class="h-button__icon-container h-button__icon-container--throbber-full">
      ${buildThrobberIcon('h-button__icon')}
    </span>
  `;

  Drupal.theme.throbberFullScreen = () => `
    <div class="a-throbber a-throbber--fullscreen">
      <div class="a-throbber__line"></div>
    </div>
  `;
})(jQuery, Drupal, window.drupalSettings);
