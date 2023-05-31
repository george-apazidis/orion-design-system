import { newSpecPage } from '@stencil/core/testing';
import { OrionCheckboxGroup } from '../orion-checkbox-group';

describe('orion-checkbox-group', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [OrionCheckboxGroup],
      html: `<orion-checkbox-group></orion-checkbox-group>`,
    });
    expect(page.root).toEqualHtml(`
      <orion-checkbox-group>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </orion-checkbox-group>
    `);
  });
});
