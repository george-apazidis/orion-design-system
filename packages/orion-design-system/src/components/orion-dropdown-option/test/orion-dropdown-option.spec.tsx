import { newSpecPage } from '@stencil/core/testing';
import { OrionDropdownOption } from '../orion-dropdown-option';

describe('orion-dropdown-option', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [OrionDropdownOption],
      html: `<orion-dropdown-option></orion-dropdown-option>`,
    });
    expect(page.root).toEqualHtml(`
      <orion-dropdown-option>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </orion-dropdown-option>
    `);
  });
});
