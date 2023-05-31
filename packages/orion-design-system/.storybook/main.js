module.exports = {
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@pxtrn/storybook-addon-docs-stencil',
    '@storybook/addon-a11y',
    '@storybook/addon-viewport'
  ],
  framework: '@storybook/html',
  staticDirs: [
    '../src'
  ],
}
