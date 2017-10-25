import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

import packageInfo from './package.json';

const baseConfig = {
  input: 'src/index.js',
  external: ['react', 'react-dom', 'prop-types'],
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
  ],
};

const commonjsConfig = Object.assign({}, baseConfig, {
  output: {
    file: packageInfo.main,
    format: 'cjs',
  },
});

const esConfig = Object.assign({}, baseConfig, {
  output: {
    file: packageInfo.module,
    format: 'es',
  },
});

const umdConfig = Object.assign({}, baseConfig, {
  name: 'ReactDynamicFont',
  globals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    'prop-types': 'PropTypes',
  },
  output: {
    file: packageInfo.umd,
    format: 'umd',
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
      plugins: [['transform-react-remove-prop-types', {
        removeImport: true,
      }]],
    }),
    uglify(),
  ],
});

export default [
  commonjsConfig,
  esConfig,
  umdConfig,
];
