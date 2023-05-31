import { newSpecPage } from '@stencil/core/testing';
import { OrionLink } from '../orion-link';

describe('orion-link', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [OrionLink],
      html: `<orion-link></orion-link>`,
    });
    expect(page.root).toEqualHtml(`
      <orion-link>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </orion-link>
    `);
  });
});
