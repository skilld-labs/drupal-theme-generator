---
sh: mkdir -p <%= h.src() %>/<%= h.changeCase.lower(name) %>/favicon && cp <%= cwd %>/_templates/to-be-copied-resources/favicon/apple-touch-icon.png <%= h.src() %>/<%= h.changeCase.lower(name) %>/favicon/apple-touch-icon.png
---