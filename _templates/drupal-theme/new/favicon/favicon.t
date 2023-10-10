---
sh: mkdir -p <%= h.src() %>/<%= h.changeCase.lower(name) %>/favicon && cp <%= cwd %>/_templates/to-be-copied-resources/favicon/favicon.ico <%= h.src() %>/<%= h.changeCase.lower(name) %>/favicon/favicon.ico
---