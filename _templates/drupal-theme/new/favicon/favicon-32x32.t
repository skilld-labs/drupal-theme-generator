---
sh: mkdir -p <%= h.src() %>/<%= h.changeCase.lower(name) %>/favicon && cp <%= cwd %>/_templates/to-be-copied-resources/favicon/favicon-32x32.png <%= h.src() %>/<%= h.changeCase.lower(name) %>/favicon/favicon-32x32.png
---