# **Esbuild environment parsing**

I want something that will throw an error immediately before any environment variable with undefined value can squeeze into my program

So if you have a lot of optional environment variables, this is not for you

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

```js
// CommonJS
const { build } = require('esbuild');
require('dotenv').config({});
const { parseAsEnvs } = require('esbuild-env-parsing');

// ESModule
import { build } from 'esbuild';
import dotenv from 'dotenv';
const { parseAsEnvs } = require('esbuild-env-parsing');

dotenv.config({});

// this is how you use it for esbuild
const options = {
    stdio: 'inherit',
    entryPoints: ['./src/main.ts'],
    outfile: './dist/main.js',
    bundle: true,
    // explicit about the variable passed in
    define: parseAsEnvs(['NODE_ENV', 'WHAT_NOT', 'API']),
    // or if u rather not be explicit, as it can be exhausting to whitelist environment variables yourself
    // just throw everything in
    define: parseAsEnvs(Object.keys(process.env)),
};

build(options).catch(() => process.exit(1));
```

### Can I use it without esbuild

Sort of can, but you will not be able to use `parseAsEnvs`, instead you will be using `parseAsStringEnv`, `parseAsNumEnv` or `parseAsBooleanEnv`

Here's an example

```js
import { parseAsStringEnv } from 'esbuild-env-parsing';

// if it has to be boolean or number, use `parseAsBooleanEnv` and `parseAsNumEnv` respectively
const apiKey = parseAsStringEnv({
    env: process.env.API_KEY,
    name: 'API_KEY',
});
```

Now you may be wondering why do you need to pass `name`? It's something that can help you to identify which environment variable is missing, because I will throw an error when an environment variable is undefined

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

OR

```sh
pnpm add esbuild-env-parsing
```
