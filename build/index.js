const parseAsEnv = ({ env, name, }) => {
    if (typeof env === 'string') {
        return env;
    }
    throw new Error(`Expect env of ${name} to be string, got ${env} instead`);
};
const parseAllEnvAsString = (envs) => envs
    .map((env) => {
    const name = `process.env.${env}`;
    return {
        [`${name}`]: `"${parseAsEnv({
            env: process.env[env],
            name,
        })}"`,
    };
})
    .reduce((prev, curr) => ({
    ...prev,
    ...curr,
}), {});
export default parseAllEnvAsString;
//# sourceMappingURL=index.js.map