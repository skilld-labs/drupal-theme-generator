---
sh: mkdir -p <%= h.src() %>/<%= h.changeCase.lower(name) %>/favicon && cp <%= cwd %>/_templates/to-be-copied-resources/favicon/favicon-16x16.png <%= h.src() %>/<%= h.changeCase.lower(name) %>/favicon/favicon-16x16.png
---