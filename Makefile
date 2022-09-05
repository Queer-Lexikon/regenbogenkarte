NPM=npm

.PHONY: install-deps
install-deps:
	$(NPM) ci

.PHONY: build
build: install-deps
	$(NPM) run build

.PHONY: clean
format: install-deps
	$(NPM) run format

.PHONY: test
test: install-deps
	$(NPM) run test

