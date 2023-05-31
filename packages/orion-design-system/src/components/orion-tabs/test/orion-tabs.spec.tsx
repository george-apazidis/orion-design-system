import { newSpecPage } from '@stencil/core/testing';
import { OrionTabs } from '../orion-tabs';

describe('orion-tabs', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [OrionTabs],
      html: `<orion-tabs></orion-tabs>`,
    });
    expect(page.root).toEqualHtml(`
      <orion-tabs>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </orion-tabs>
    `);
  });
});
