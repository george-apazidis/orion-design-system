import { newSpecPage } from '@stencil/core/testing';
import { OrionToggle } from '../orion-toggle';

describe('orion-toggle', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [OrionToggle],
      html: `<orion-toggle></orion-toggle>`,
    });
    expect(page.root).toEqualHtml(`
      <orion-toggle>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </orion-toggle>
    `);
  });
});
