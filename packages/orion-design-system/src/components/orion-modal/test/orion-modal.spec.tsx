import { newSpecPage } from '@stencil/core/testing';
import { OrionModal } from '../orion-modal';

describe('orion-modal', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [OrionModal],
      html: `<orion-modal></orion-modal>`,
    });
    expect(page.root).toEqualHtml(`
      <orion-modal>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </orion-modal>
    `);
  });
});
