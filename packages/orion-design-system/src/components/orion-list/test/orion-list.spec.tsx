import { newSpecPage } from '@stencil/core/testing';
import { OrionList } from '../orion-list';

describe('orion-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [OrionList],
      html: `<orion-list></orion-list>`,
    });
    expect(page.root).toEqualHtml(`
      <orion-list>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </orion-list>
    `);
  });
});
