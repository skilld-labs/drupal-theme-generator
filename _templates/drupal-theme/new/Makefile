---
to: <%= h.src() %>/<%= h.changeCase.lower(name) %>/Makefile
---
IMAGE_FRONT=node:lts-alpine
CUID := $(shell id -u)
CGID := $(shell id -g)
.PHONY: favicon

frontexec = docker run \
	--rm \
	--init \
	-u $(CUID):$(CGID) \
	-v $(CURDIR):/app \
	--workdir /app \
	$(IMAGE_FRONT) ${1}

frontexec-svg-fix = docker run \
	--rm \
	--init \
	-u $(CUID):$(CGID) \
	-v $(CURDIR):/app \
	--workdir /app \
	-e FILE=$(FILE) \
	$(IMAGE_FRONT) ${1}

frontexec-with-interactive = docker run \
	--rm \
	--init \
	-u $(CUID):$(CGID) \
	-v $(CURDIR):/app \
	--workdir /app \
	-it \
	$(IMAGE_FRONT) ${1}

exec:
	$(call frontexec-with-interactive, sh)

install:
	docker pull $(IMAGE_FRONT); \
    $(call frontexec, corepack install && corepack enable && yarn install)

build:
	$(call frontexec, corepack install && corepack enable && yarn build)

build\:watch:
	$(call frontexec, corepack install && corepack enable && yarn build\:watch)

build\:storybook:
	$(call frontexec, corepack install && corepack enable && yarn build\:storybook)

storybook:
	$(call frontexec, corepack install && corepack enable && yarn storybook)

lint:
	$(call frontexec, corepack install && corepack enable && yarn lint)

lint\:fix:
	$(call frontexec, corepack install && corepack enable && yarn lint\:fix)

favicon:
	$(call frontexec, corepack install && corepack enable && yarn favicon)

svg-fix:
	$(eval FILE := $(FILE))
	$(call frontexec-svg-fix, corepack install && corepack enable && yarn svg-fix)

svg-fix\:all:
	$(call frontexec, corepack install && corepack enable && yarn svg-fix\:all)

sprite:
	$(call frontexec, corepack install && corepack enable && yarn sprite)

cc:
	$(call frontexec-with-interactive, corepack install && corepack enable && yarn cc)
