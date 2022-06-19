import { parseAsBooleanEnv, parseAsEnvs, parseAsNumEnv } from '../src';
import dotenv from 'dotenv';

describe('Environment Parser', () => {
    dotenv.config({});
    it('should parse subset of env variables that are presented in `env` file', () =>
        expect(parseAsEnvs(['TRUE_STRING', 'TRUE_BOOL', 'NUM'])).toStrictEqual({
            'process.env.TRUE_STRING': '"TRUE"',
            'process.env.TRUE_BOOL': '"true"',
            'process.env.NUM': '"1"',
        }));
    it('should failed because env is not listed in `env` file', () =>
        expect(() => parseAsEnvs(['I_DONT_EXIST'])).toThrowError());
    it('should parse env as number', () =>
        expect(parseAsNumEnv({ name: 'NUM', env: process.env.NUM })).toBe(1));
    it('should parse env as true', () =>
        expect(
            parseAsBooleanEnv({ name: 'TRUE_BOOL', env: process.env.TRUE_BOOL })
        ).toBe(true));
    it('should parse env as fals', () =>
        expect(
            parseAsBooleanEnv({
                name: 'FALSE_BOOL',
                env: process.env.FALSE_BOOL,
            })
        ).toBe(false));
});
