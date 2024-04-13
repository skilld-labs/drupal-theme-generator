---
  to: <%= h.src() %>/<%= h.changeCase.lower(name) %>/templates/components/suggestions/a-select/a-select.src.js
---
// /**
//  * @file
//  * This is component script template.
//  */
//
// (({ behaviors }) => {
//   behaviors.<%= h.changeCase.camelCase(name) %>AtomSelect = {
//     attach: (context) => {
//       once('a-select', '.a-select', context).forEach((el) => {
//         behaviors.<%= h.changeCase.camelCase(name) %>AtomSelect.handler(el);
//       });
//     },
//     handler: (el) => {
//       // eslint-disable-next-line no-console
//       console.log(el);
//     },
//   };
// })(Drupal);
