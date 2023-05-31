module.exports = {
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  extends: ['eslint:recommended', 'airbnb-base'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'html', 'jsx-a11y', 'prettier'],
  rules: {
    'class-methods-use-this': 0,
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'import/prefer-default-export': 0,
    'no-param-reassign': [
      2,
      {
        props: false,
      },
    ],
    'no-underscore-dangle': 0,
    'radix': 0,
    'no-undef': 0,
    'import/no-extraneous-dependencies': 0,
    'no-dupe-keys': 1,
    'no-unused-vars': 1,
    'eqeqeq': 1
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:jsx-a11y/recommended',
        'plugin:prettier/recommended'
      ],
      rules: {
        '@typescript-eslint/no-unsafe-return': 1,
        '@typescript-eslint/no-unsafe-assignment': 1,
        '@typescript-eslint/no-floating-promises': 1,
        'jsx-a11y/click-events-have-key-events': 1,
        'jsx-a11y/no-static-element-interactions': 1,
        'jsx-a11y/aria-role': 1        
      }
    }
  ],
  ignorePatterns: ['.eslintrc.js', 'stencil.config.ts']
};
