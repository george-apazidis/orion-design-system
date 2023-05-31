import { newSpecPage } from '@stencil/core/testing';
import { OrionHeader } from '../orion-header';

describe('orion-header', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [OrionHeader],
      html: `<orion-header></orion-header>`,
    });
    expect(page.root).toEqualHtml(`
      <orion-header>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </orion-header>
    `);
  });
});
