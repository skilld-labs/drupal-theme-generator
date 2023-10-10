---
sh: mkdir -p <%= h.src() %>/<%= h.changeCase.lower(name) %>/favicon && cp <%= cwd %>/_templates/to-be-copied-resources/favicon/mstile-144x144.png <%= h.src() %>/<%= h.changeCase.lower(name) %>/favicon/mstile-144x144.png
---