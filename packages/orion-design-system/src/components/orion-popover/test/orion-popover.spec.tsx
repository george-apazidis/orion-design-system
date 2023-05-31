import { newSpecPage } from '@stencil/core/testing';
import { OrionPopover } from '../orion-popover';

describe('orion-popover', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [OrionPopover],
      html: `<orion-popover></orion-popover>`,
    });
    expect(page.root).toEqualHtml(`
      <orion-popover>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </orion-popover>
    `);
  });
});
