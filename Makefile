.PHONY: test build

NODE_BIN=node_modules/.bin/

## transpile
tsc=$(NODE_BIN)tsc
transpile:
	$(tsc) -p tsconfig.json $(arguments) 

typecheck:
	make transpile arguments=--noEmit

## build
prebuild:
	rm -rf build

build: prebuild
	make transpile

## test
test:
	$(NODE_BIN)esbuild test/index.ts --bundle --minify --target=node16.3.1 --platform=node --outfile=__test__/index.test.js &&\
		$(NODE_BIN)jest __test__
