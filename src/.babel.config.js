export default const babelConfig = {
  babelrc: false,
  exclude: 'node_modules/**',
  presets: ['es2015-rollup'],
  plugins: ['transform-object-rest-spread'],
  env: { coverage: { plugins: ['istanbul'] } }
}
