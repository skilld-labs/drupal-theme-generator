---
sh: mkdir -p <%= h.src() %>/<%= h.changeCase.lower(name) %>/favicon && cp <%= cwd %>/_templates/to-be-copied-resources/favicon/android-chrome-512x512.png <%= h.src() %>/<%= h.changeCase.lower(name) %>/favicon/android-chrome-512x512.png
---