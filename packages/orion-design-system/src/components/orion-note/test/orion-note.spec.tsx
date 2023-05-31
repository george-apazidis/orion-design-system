import { newSpecPage } from '@stencil/core/testing';
import { OrionNote } from '../orion-note';

describe('orion-note', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [OrionNote],
      html: `<orion-note></orion-note>`,
    });
    expect(page.root).toEqualHtml(`
      <orion-note>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </orion-note>
    `);
  });
});
