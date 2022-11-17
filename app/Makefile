.PHONY : \
	release-build

release-build:
	docker buildx build \
		--platform=linux/amd64 \
		$(OPTS) \
		.
