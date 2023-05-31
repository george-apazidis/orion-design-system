import {defineCustomElements} from '../loader';
import { setStencilDocJson } from '@pxtrn/storybook-addon-docs-stencil';
import prism from 'prismjs';
import 'prismjs/themes/prism-twilight.min.css'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'; 
import docJson from '../dist/docs.json';
import './../src/css/orion-global.css';
import './code.css';
import { transformHTMLTagsToReact, removeScriptTags } from '../src/utils/storybook-utils';
import { generateUUID }  from '../src/utils/utils';

const CUSTOM_VIEWPORTS = {
  mobileSmall: {
    name: 'Mobile Small',
    styles: {
      width: '375px',
      height: '667px',
    },
  },
  mobile : {
    name: 'Mobile',
    styles: {
      width: '414px',
      height: '736px',
    },
  },
  tabletPortrait: {
    name: 'Tablet Portrait',
    styles: {
      width: '768px',
      height: '1024px',
    },
  },
  tabletLandscapeDesktop: {
    name: 'Tablet Landscape / Desktop',
    styles: {
      width: '1024px',
      height: '768px',
    },
  },
}

// Define component library
defineCustomElements();

// Setup automated docs generation from component code
if(docJson) setStencilDocJson(docJson);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    hideNoControlsWarning: true,
    expanded: true,
  },
  options: {
    storySort: {
      order: ['Style guide', 'Components', 'Modules', 'Sandbox'],
    },
  },
  viewport: {
    viewports: CUSTOM_VIEWPORTS,
  },
}


/**
* Storybook decorators - global modifiers to stories
*/
export const decorators = [
  (story) => {
    const html = story();
    const react = removeScriptTags(transformHTMLTagsToReact(html));
    const cleanHTML = removeScriptTags(html);
    const uuid = generateUUID();
    return `
      ${html}
      <br />
      <div class="CodePreview">
        <input aria-label="Show react code" class="CodePreview__input CodePreview__input--react" type="radio" name="code-${uuid}" id="react-${uuid}" />
          <span class="CodePreview__code"><label for="react-${uuid}" class="CodePreview__label CodePreview__label--react">React</label><pre class="PrismCode__outer-wrapper"><code class="PrismCode__inner-wrapper">${prism.highlight(react, Prism.languages.html)}</code></pre><button class="CodePreview__copy">Copy</button></span>
        <input aria-label="Show angular code" class="CodePreview__input CodePreview__input--angular" type="radio" name="code-${uuid}" id="angular-${uuid}" />
          <span class="CodePreview__code"><label for="angular-${uuid}" class="CodePreview__label CodePreview__label--angular">Angular</label><pre class="PrismCode__outer-wrapper"><code class="PrismCode__inner-wrapper">${prism.highlight(cleanHTML, Prism.languages.html)}</code></pre><button class="CodePreview__copy">Copy</button></span>
        <input aria-label="Show html code" class="CodePreview__input CodePreview__input--html" type="radio" name="code-${uuid}" id="html-${uuid}" />
          <span class="CodePreview__code"><label for="html-${uuid}" class="CodePreview__label CodePreview__label--html">HTML</label><pre class="PrismCode__outer-wrapper"><code class="PrismCode__inner-wrapper">${prism.highlight(cleanHTML, Prism.languages.html)}</code></pre><button class="CodePreview__copy">Copy</button></span>
        <input aria-label="Hide code" class="CodePreview__input CodePreview__input--hide" type="radio" name="code-${uuid}" id="hide-${uuid}" />
        <label for="hide-${uuid}" class="CodePreview__label CodePreview__label--hide">Hide</label>
      </div>

      <script>
        document.querySelectorAll('.CodePreview__copy').forEach(button => {
          button.onclick = function() {
            const code = this.parentNode.querySelector('pre').innerText;
            navigator.clipboard.writeText(code);
            this.innerText = "Copied";
            setTimeout(() => {
              this.innerText = "Copy";
            }, 1000);
          }
        });
      </script>
      `;
  }
]