import path from 'path';

import replace from 'rollup-plugin-replace';
import NodeResolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
// eslint-disable-next-line import/no-unresolved
import closure from '@ampproject/rollup-plugin-closure-compiler';

import camelCase from 'camelcase';
import autoprefixer from 'autoprefixer';

import packageInfo from './package.json';

const isProd = process.env.NODE_ENV === 'production';

const baseExternalDependencies = {
  react: 'React',
  'react-dom': 'ReactDOM',
  // currently we use TypeScript so we don't need `PropTypes`
  // 'prop-types': 'PropTypes',
};

const modularExternalDependencies = [
  ...Object.keys(baseExternalDependencies),
  ...Object.keys(packageInfo.dependencies || {}),
];

const browserExternalDependencies = Object.keys(baseExternalDependencies);

const baseConfig = {
  input: 'src/index.ts',
  plugins: [
    NodeResolve({
      module: true,
      jsnext: true,
      main: true,
      modulesOnly: true,
    }),
    replace({
      clsprefix: packageInfo.name,
    }),
    typescript({
      cacheRoot: '.typescript-compile-cache',
      clean: isProd,
      useTsconfigDeclarationDir: isProd,
      tsconfigOverride: Object.assign(
        {},
        isProd
          ? {
              compilerOptions: {
                declaration: true,
                declarationDir: './types',
              },
            }
          : {
              compilerOptions: { declaration: true },
            },
        /**
         * only exclude test code in rollup config,
         * rather than exclude them in tsconfig.json,
         * because when run tests,
         * they still need the compiler info in tsconfig.json
         */
        {
          exclude: ['node_modules', 'src/__tests__/**'],
        },
      ),
    }),
    postcss({
      extensions: ['.css', '.styl', '.stylus'],
      plugins: [autoprefixer],
      extract: isProd
        ? path.resolve(__dirname, './styles.css')
        : path.resolve(__dirname, './examples/src/lib/styles.css'),
    }),
  ],
};

const devConfig = Object.assign({}, baseConfig, {
  external: modularExternalDependencies,
  output: {
    file: 'examples/src/lib/index.js',
    format: 'es',
    sourcemap: 'inline',
  },
});

const commonjsConfig = Object.assign({}, baseConfig, {
  external: modularExternalDependencies,
  output: {
    file: packageInfo.main,
    format: 'cjs',
  },
});

const esConfig = Object.assign({}, baseConfig, {
  external: modularExternalDependencies,
  output: {
    file: packageInfo.module,
    format: 'es',
  },
});

const browserConfig = Object.assign({}, baseConfig, {
  external: browserExternalDependencies,
  output: {
    name: camelCase(packageInfo.name, { pascalCase: true }),
    file: packageInfo.unpkg,
    format: 'iife',
    globals: baseExternalDependencies,
  },
  plugins: [
    ...baseConfig.plugins,
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    closure(),
  ],
});

const config = isProd ? [commonjsConfig, esConfig, browserConfig] : devConfig;

export default config;
