type Params = Readonly<{
    env: string | undefined;
    name: string;
}>;
const generateError = (
    { name, env }: Params,
    type: 'string' | 'number' | 'boolean'
) =>
    new TypeError(
        `Expect process.env.${name} to be ${type}, got typeof "${typeof env}" with value of "${env}" instead`
    );

/**
 * @deprecated Since version 1.1.0. Will be deleted in version 2.0. Use `parseAsStringEnv` instead.
 */
const parseAsEnv = (params: Params) => params;

const parseAsStringEnv = ({ env, name }: Params) => {
    if (typeof env === 'string') {
        return env;
    }
    throw generateError({ env, name }, 'string');
};

const parseAsBooleanEnv = ({ env, name }: Params) => {
    if (env === 'true') {
        return true;
    }
    if (env === 'false') {
        return false;
    }
    throw generateError({ env, name }, 'boolean');
};

const parseAsNumEnv = ({ env, name }: Params) => {
    // @ts-ignore
    if (env && !isNaN(env)) {
        return Number(env);
    }
    throw generateError({ env, name }, 'number');
};

const parseAsEnvs = (
    envs: ReadonlyArray<string>
): Readonly<{
    [key: string]: string;
}> =>
    envs
        .map((env) => ({
            [`process.env.${env}`]: `"${parseAsStringEnv({
                name: env,
                env: process.env[env],
            })}"`,
        }))
        .reduce(
            (prev, curr) => ({
                ...prev,
                ...curr,
            }),
            {}
        );

export {
    parseAsEnv,
    parseAsNumEnv,
    parseAsBooleanEnv,
    parseAsStringEnv,
    parseAsEnvs,
};
