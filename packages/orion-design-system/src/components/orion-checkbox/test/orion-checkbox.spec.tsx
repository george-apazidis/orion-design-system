import { newSpecPage } from '@stencil/core/testing';
import { OrionCheckbox } from '../orion-checkbox';

describe('orion-checkbox', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [OrionCheckbox],
      html: `<orion-checkbox></orion-checkbox>`,
    });
    expect(page.root).toEqualHtml(`
      <orion-checkbox>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </orion-checkbox>
    `);
  });
});
