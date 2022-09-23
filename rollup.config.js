import withSolid from 'rollup-preset-solid'

export default withSolid({
  input: 'src/index.tsx',
  external: ['solid-js', 'solid-js/web'],
  targets: ['esm', 'cjs'],
})
