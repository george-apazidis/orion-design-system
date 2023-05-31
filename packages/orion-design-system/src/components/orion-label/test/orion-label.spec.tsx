import { newSpecPage } from '@stencil/core/testing';
import { OrionLabel } from '../orion-label';

describe('orion-label', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [OrionLabel],
      html: `<orion-label></orion-label>`,
    });
    expect(page.root).toEqualHtml(`
      <orion-label>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </orion-label>
    `);
  });
});
