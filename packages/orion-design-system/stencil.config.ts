import { Config } from '@stencil/core';
import { postcss } from '@stencil-community/postcss';
import autoprefixer from 'autoprefixer';
import { vueOutputTarget } from '@stencil/vue-output-target';
import { reactOutputTarget } from '@stencil/react-output-target';

export const config: Config = {
  namespace: 'orion-web-components',
  globalStyle: './src/css/orion-global.css',
  outputTargets: [
    vueOutputTarget({
      componentCorePackage: '@orion/orion-design-system', // title of stencil library package
      proxiesFile: '../orion-design-system-vue/src/components.ts',
    }),
    reactOutputTarget({
      componentCorePackage: '@orion/orion-design-system', // title of stencil library package
      proxiesFile: '../orion-design-system-react/src/components/stencil-generated/index.ts',
      includeDefineCustomElements: true,
    }),    
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      copy: [
        { src: 'assets', dest: '../assets' },
      ]
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
    {
      type: 'docs-json',
      file: 'dist/docs.json',
    },
  ],
  plugins: [
    postcss({
      plugins: [autoprefixer()],
    }),
  ],
};
