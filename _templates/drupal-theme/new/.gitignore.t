---
to: <%= h.src() %>/<%= h.changeCase.lower(name) %>/.gitignore
---
node_modules
storybook-static
!composer.json
composer.lock
.idea
vendor
yarn-error.log
.yarn
.DS_Store
