

// packages/vue-library/src/plugin.ts

import { Plugin } from 'vue';
import { applyPolyfills, defineCustomElements } from '@orion/orion-design-system/loader';

export const ComponentLibrary: Plugin = {
  async install() {
    applyPolyfills().then(() => {
      defineCustomElements();
    });
  },
};

