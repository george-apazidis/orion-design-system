import { newSpecPage } from '@stencil/core/testing';
import { OrionListItem } from '../orion-list-item';

describe('orion-list-item', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [OrionListItem],
      html: `<orion-list-item></orion-list-item>`,
    });
    expect(page.root).toEqualHtml(`
      <orion-list-item>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </orion-list-item>
    `);
  });
});
