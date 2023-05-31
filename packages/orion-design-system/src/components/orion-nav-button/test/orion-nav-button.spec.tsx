import { newSpecPage } from '@stencil/core/testing';
import { OrionNavButton } from '../orion-nav-button';

describe('orion-nav-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [OrionNavButton],
      html: `<orion-nav-button></orion-nav-button>`,
    });
    expect(page.root).toEqualHtml(`
      <orion-nav-button>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </orion-nav-button>
    `);
  });
});
