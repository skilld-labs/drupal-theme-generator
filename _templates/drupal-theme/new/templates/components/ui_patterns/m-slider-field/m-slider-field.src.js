---
to: <%= h.src() %>/<%= h.changeCase.lower(name) %>/templates/components/ui_patterns/m-slider-field/m-slider-field.src.js
---
/**
 * @file
 * This is component script template.
 */

import Splide from '@splidejs/splide';

(({ behaviors }) => {
  behaviors.<%= h.changeCase.camelCase(name) %>MoleculeSliderField = {
    attach: (context) => {
      once('m-slider-field', '.m-slider-field', context).forEach((el) => {
        const sliderEl = el.querySelector('.m-slider-field__slider');
        if (sliderEl) {
          if (el.classList.contains('m-slider-field--type-1')) {
            behaviors.<%= h.changeCase.camelCase(name) %>MoleculeSliderField.typeOne(sliderEl);
          } else if (el.classList.contains('m-slider-field--type-2')) {
            behaviors.<%= h.changeCase.camelCase(name) %>MoleculeSliderField.typeTwo(sliderEl);
          } else {
            behaviors.<%= h.changeCase.camelCase(name) %>MoleculeSliderField.typeOne(sliderEl);
          }
        }
      });
    },
    typeOne: (sliderEl) => {
      const slider = new Splide(sliderEl, {
        arrows: false,
        pagination: false,
        type: 'loop',
      });
      slider.mount();
    },
    typeTwo: (sliderEl) => {
      const slider = new Splide(sliderEl, {
        arrows: false,
        pagination: false,
        gap: '1rem',
        mediaQuery: 'min',
        omitEnd: true,
        focus: 0,
        waitForTransition: true,
        perPage: 1.5,
        padding: {
          left: '1rem',
          right: '1rem',
        },
        breakpoints: {
          769: {
            perPage: 2,
          },
          1025: {
            perPage: 3,
            padding: {
              left: 0,
              right: 0,
            },
          },
        },
      });
      slider.mount();
    },
  };
})(Drupal);
