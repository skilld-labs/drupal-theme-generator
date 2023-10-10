---
sh: mkdir -p <%= h.src() %>/<%= h.changeCase.lower(name) %>/fonts && cp <%= cwd %>/_templates/to-be-copied-resources/fonts/roboto-700.woff2 <%= h.src() %>/<%= h.changeCase.lower(name) %>/fonts/roboto-700.woff2
---