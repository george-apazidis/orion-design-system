import { newSpecPage } from '@stencil/core/testing';
import { OrionButton } from '../orion-button';

describe('orion-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [OrionButton],
      html: `<orion-button></orion-button>`,
    });
    expect(page.root).toEqualHtml(`
      <orion-button>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </orion-button>
    `);
  });
});
