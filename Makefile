.PHONY: test

## test
test:
	node_modules/.bin/esbuild test/index.js --bundle --minify --target=node16.3.1 --platform=node --outfile=__test__/index.test.js &&\
		node_modules/.bin/jest __test__
