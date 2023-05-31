import { newSpecPage } from '@stencil/core/testing';
import { OrionError } from '../orion-error';

describe('orion-error', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [OrionError],
      html: `<orion-error></orion-error>`,
    });
    expect(page.root).toEqualHtml(`
      <orion-error>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </orion-error>
    `);
  });
});
