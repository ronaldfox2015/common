## CONTAINER VARS ##
ENV                 ?= dev
INFRA_BUCKET        ?= infraestructura.neoauto.$(ENV)
APP_DIR             = /app
DEPLOY_REGION       ?= us-east-1
PROFILE             = --profile $(ENV)
ACCOUNT_ID          ?= 558705146899
DEPLOY_REGISTRY     = $(ACCOUNT_ID).dkr.ecr.$(DEPLOY_REGION).amazonaws.com
IMAGE_BUILD         ?= node:22.14.0-alpine3.20

install: ##@Global Install dependencies
	docker run \
		-it \
		--rm \
		-w /$(APP_DIR) \
		-v $(PWD):/$(APP_DIR) \
		$(IMAGE_BUILD) \
		sh -c "apk update && apk upgrade && \
				apk add --no-cache git && \
				npm install -g npm@11.6.0 && \
				npm install -g pnpm && \
				pnpm install"
build: ##@Local Build static files of papyrum website
	docker run \
		-it \
		--rm \
		-w /$(APP_DIR) \
		-v $(PWD):/$(APP_DIR) \
		$(IMAGE_BUILD) \
		sh -c "apk update && apk upgrade && \
		apk add --no-cache git && \
		npm install -g npm@11.6.0 && \
		npm install -g pnpm && \
		pnpm build"

build-packages: ##@Global Build dist of each monorepo package
	docker run \
		-it \
		--rm \
		-w /$(APP_DIR) \
		-v $(PWD):/$(APP_DIR) \
		$(IMAGE_BUILD) \
		sh -c "apk update && apk upgrade && \
		apk add --no-cache git && \
		npm install -g npm@11.6.0 && \
		npm install -g pnpm && \
		pnpm build:packages"

sync-credentials: ##@Global Sync credentials for registry. make sync-credentials
	aws s3 cp s3://$(INFRA_BUCKET)/config/publication/npm-lerna-neo/credentials . --acl private $(PROFILE)

.PHONY: get_configs
get_configs:
	$(eval NPM_TOKEN_PP := $(shell \
		cat credentials \
			| grep 'NPM_TOKEN_PP' \
			| cut -d ' ' -f 3))
	$(shell echo '//registry.npmjs.org/:_authToken=$(NPM_TOKEN_PP)' > $(PWD)/.npmrc)

publish-packages: ##@Global Publish monorepo packages
	make get_configs
	docker run \
		-it \
		--rm \
		-w /$(APP_DIR) \
		-v $(PWD):/$(APP_DIR) \
		-v ~/.gitconfig:/etc/gitconfig \
		-v ~/.ssh:/root/.ssh \
		$(IMAGE_BUILD) \
		sh -c "apk update && apk upgrade && \
		apk add --no-cache git openssh && \
		npm install -g npm@11.6.0 && \
		npm install -g pnpm && \
		pnpm publish:packages"

dev: ##@Local Up project in development mode
	@export \
		IMAGE_BUILD=$(IMAGE_BUILD) \
		WORKING_DIR=/$(APP_DIR) CONTAINER_NAME=$(APP_NAME) \
		VOLUME=$(PWD):/$(APP_DIR) && \
		docker-compose -p $(APP_NAME) up -d

down: ##@Local Down project in development mode
	@export \
		IMAGE_BUILD=$(IMAGE_BUILD) \
		WORKING_DIR=/$(APP_DIR) CONTAINER_NAME=$(APP_NAME) \
		VOLUME=$(PWD):/$(APP_DIR) && \
		docker-compose -p $(APP_NAME) down

log: ##@Local Show project logs
	docker logs -f $(APP_NAME)
