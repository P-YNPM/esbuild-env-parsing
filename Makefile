.PHONY: test build
MAKEFLAGS += --silent

NODE_BIN=node_modules/.bin/

## setup
install:
	yarn install --frozen-lockfile

## build
tsc=$(NODE_BIN)tsc
build-dts:
	$(tsc) -p tsconfig.json $(arguments) 

build-mjs:
	$(tsc) -p tsconfig.mjs.json $(arguments) 

build-cjs:
	$(tsc) -p tsconfig.cjs.json $(arguments) 

prebuild:
	rm -rf build

build: prebuild
	make build-dts && make build-mjs && make build-cjs && node script/package.js

## typecheck
typecheck:
	make build-dts arguments=--noEmit

## test
test:
	$(NODE_BIN)esbuild test/index.ts --bundle --minify --target=node16.3.1 --platform=node --outfile=__test__/index.test.js &&\
		$(NODE_BIN)jest __test__
