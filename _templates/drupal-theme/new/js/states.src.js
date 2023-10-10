---
to: <%= h.src() %>/<%= h.changeCase.lower(name) %>/js/states.src.js
---
// Since we are using SVG sprite technology in `a-input-submit`
// component, we have switched <input> tag on <button> for that.
// However, drupal's core states.js can't handle button tags.
// https://git.drupalcode.org/project/drupal/-/blob/11.x/core/misc/states.js#L688
// This is a fix for `disabled` state for button html tag for form submits.
(($) => {
  $(document).on('state:disabled', (e) => {
    if (e.trigger) {
      $(e.target)
        .closest('button.js-form-submit')
        .toggleClass('form-disabled', e.value)
        .prop('disabled', e.value);
    }
  });
})(jQuery);
