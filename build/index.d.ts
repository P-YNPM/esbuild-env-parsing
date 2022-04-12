declare const parseAsEnv: ({ env, name, }: Readonly<{
    env: string | undefined;
    name: string;
}>) => string;
declare const parseAsEnvs: (envs: ReadonlyArray<string>) => Readonly<{
    [key: string]: string;
}>;
export { parseAsEnv, parseAsEnvs };
//# sourceMappingURL=index.d.ts.map