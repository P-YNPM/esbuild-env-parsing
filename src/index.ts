const parseAsEnv = ({
    env,
    name,
}: Readonly<{
    env: string | undefined;
    name: string;
}>) => {
    if (typeof env === 'string') {
        return env;
    }
    throw new Error(`Expect env of ${name} to be string, got ${env} instead`);
};

const parseAsEnvs = (
    envs: ReadonlyArray<string>
): Readonly<{
    [key: string]: string;
}> =>
    envs
        .map((env) => {
            const name = `process.env.${env}`;
            return {
                [`${name}`]: `"${parseAsEnv({
                    env: process.env[env],
                    name,
                })}"`,
            };
        })
        .reduce(
            (prev, curr) => ({
                ...prev,
                ...curr,
            }),
            {}
        );

export { parseAsEnv, parseAsEnvs };
