import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import pck from './package.json';

export default {
    input: './src/index.ts',
    output: {
        file: 'lib/index.js',
        // name: 'myBundle',
        // format: 'umd',
        format: 'cjs',
        banner: '/* @kealm/react-mobile version ' + pck.version + ' */',
        footer: '/* follow me on Twitter! @rich_harris */',
    },
    plugins: [
        resolve(),
        typescript({
            tsconfig: path.resolve(__dirname, './tsconfig.json'),
        }),
        babel({
            extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
            babelHelpers: 'bundled',
        }),
    ],
    external: ['react'],
};
