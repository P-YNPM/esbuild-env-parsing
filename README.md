# **Esbuild environment parsing**

I want something that will throw an error immediately before any environment variable with undefined value can squeeze into my program

I like to use esbuild, although it's possible to do as the following according to this [issue](https://github.com/evanw/esbuild/issues/69)

```js
const { build } = require('esbuild');
const define = {};

for (const k in process.env) {
    define[`process.env.${k}`] = JSON.stringify(process.env[k]);
}

const options = {
    stdio: 'inherit',
    entryPoints: ['./src/main.ts'],
    outfile: './dist/main.js',
    bundle: true,
    define,
};

build(options).catch(() => process.exit(1));
```

I wanna be explicit about the environment variable(s) I passed into esbuild without mutation

Since I need to be explicit, I **must** ensure that each environment variable I passed is defined

Hence, I built this package

### How do I use it?

##### CommonJS

```js
const { build } = require('esbuild');
require('dotenv').config();
const { parseAsEnvs } = require('esbuild-env-parsing');

const options = {
    stdio: 'inherit',
    entryPoints: ['./src/main.ts'],
    outfile: './dist/main.js',
    bundle: true,
    define: parseAsEnvs(['NODE_ENV', 'WHAT_NOT', 'API', 'APS_API_KEY']),
};

build(options).catch(() => process.exit(1));
```

##### ESModule

```js
import { build } from 'esbuild';
import dotenv from 'dotenv';
const { parseAsEnvs } = require('esbuild-env-parsing');

const options = {
    stdio: 'inherit',
    entryPoints: ['./src/main.ts'],
    outfile: './dist/main.js',
    bundle: true,
    define: parseAsEnvs(['NODE_ENV', 'WHAT_NOT', 'API', 'APS_API_KEY']),
};

build(options).catch(() => process.exit(1));
```

### Can I use it without esbuild

Sort of can, but you will not be able to use `parseAsEnvs`, instead you will be using `parseAsEnv`

Here's an example

```js
import { parseAsEnv } from 'esbuild-env-parsing';

const apiKey = parseAsEnv({
    env: process.env.API_KEY,
    name: 'api',
});
```

Now you may be wondering why do you need to pass `name`? Well name is something that can help you to identify which environment variable is undefined, because I will throw an error when an environment variable is undefined

### Can I raise an issue?

Why not? Feel free to raise an issue if you have a question, an enhancement, or a bug report.

### Can I contribute

I am glad that you are willing to contribute
However, before that, I'd like to have a few words about contribution.

-   Use TypeScript
-   Write Test Code

### Changes

Kindly refer to [CHANGELOG](https://github.com/P-YNPM/esbuild-env-parsing/blob/main/CHANGELOG.md)

### How to install

```sh
yarn add esbuild-env-parsing
```

OR

```sh
npm i esbuild-env-parsing
```
