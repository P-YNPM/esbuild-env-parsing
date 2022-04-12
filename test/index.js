import parseAllEnvAsString from '../src';
import dotenv from 'dotenv';

describe('Portfolio Data', () => {
    dotenv.config({});
    it('should work because all env is present', () => {
        expect(
            parseAllEnvAsString([
                'NODE_ENV',
                'PUBLIC_URL',
                'API',
                'MAPS_API_KEY',
            ])
        ).toStrictEqual({
            'process.env.API': '"http://localhost:5000"',
            'process.env.MAPS_API_KEY': '"MAPS BOI"',
            'process.env.NODE_ENV': '"test"',
            'process.env.PUBLIC_URL': '"http://localhost:3000"',
        });
    });
    it('should failed because some env is not defined', () => {
        expect(() =>
            parseAllEnvAsString([
                'NODE_ENV',
                'PUBLIC_URL',
                'API',
                'MAPS_API_KEY',
                'I_DONT_EXIST',
            ])
        ).toThrowError();
    });
});
