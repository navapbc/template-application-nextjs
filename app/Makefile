.PHONY: release-build dev storybook stop pre-dev

# Docker user configuration
# This logic is to avoid issues with permissions and mounting local volumes,
# which should be owned by the same UID for Linux distros. Mac OS can use root,
# but it is best practice to run things as with least permission where possible

# Can be set by adding user=<username> and/ or uid=<id> after the make command
# If variables are not set explicitly: try looking up values from current
# environment, otherwise fixed defaults.
# uid= defaults to 0 if user= set (which makes sense if user=root, otherwise you
# probably want to set uid as well).
ifeq ($(user),)
RUN_USER ?= $(or $(strip $(USER)),nodummy)
RUN_UID ?= $(or $(strip $(shell id -u)),4000)
else
RUN_USER = $(user)
RUN_UID = $(or $(strip $(uid)),0)
endif

export RUN_USER
export RUN_UID

##################################################
# Release
##################################################
release-build:
	docker buildx build \
	  --target release \
		--platform=linux/amd64 \
		--build-arg RUN_USER=$(RUN_USER) \
		--build-arg RUN_UID=$(RUN_UID) \
		$(OPTS) \
		.

##################################################
# Local development
##################################################
dev: pre-dev
	docker compose up --detach nextjs
	docker compose logs --follow nextjs

storybook: pre-dev
	docker compose up --detach storybook
	docker compose logs --follow storybook

stop:
	docker compose down

pre-dev:
	@# Check for existing "next-dev" container and remove it if it exists
	@if docker ps -a --format '{{.Names}}' | grep -Eq '^next-dev$$'; then \
		echo "Removing existing 'next-dev' container..."; \
		docker rm -f next-dev; \
	fi
	@# Check for existing "storybook" container and remove it if it exists
	@if docker ps -a --format '{{.Names}}' | grep -Eq '^storybook$$'; then \
		echo "Removing existing 'storybook' container..."; \
		docker rm -f storybook; \
	fi
	@# Install npm packages using Docker if node_modules doesn't exist
	@if [ ! -d "node_modules" ]; then \
		echo "Installing npm packages using Docker..."; \
		docker run --rm -v "$(PWD)":/usr/src/app -w /usr/src/app node:latest npm install; \
	else \
		echo "node_modules directory already exists, skipping npm install"; \
	fi
