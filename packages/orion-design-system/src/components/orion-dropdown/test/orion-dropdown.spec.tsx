import { newSpecPage } from '@stencil/core/testing';
import { OrionDropdown } from '../orion-dropdown';

describe('orion-dropdown', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [OrionDropdown],
      html: `<orion-dropdown></orion-dropdown>`,
    });
    expect(page.root).toEqualHtml(`
      <orion-dropdown>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </orion-dropdown>
    `);
  });
});
