import { newSpecPage } from '@stencil/core/testing';
import { OrionToggleGroup } from '../orion-toggle-group';

describe('orion-toggle-group', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [OrionToggleGroup],
      html: `<orion-toggle-group></orion-toggle-group>`,
    });
    expect(page.root).toEqualHtml(`
      <orion-toggle-group>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </orion-toggle-group>
    `);
  });
});
