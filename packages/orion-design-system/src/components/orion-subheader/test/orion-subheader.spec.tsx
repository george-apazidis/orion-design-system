import { newSpecPage } from '@stencil/core/testing';
import { OrionSubheader } from '../orion-subheader';

describe('orion-subheader', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [OrionSubheader],
      html: `<orion-subheader></orion-subheader>`,
    });
    expect(page.root).toEqualHtml(`
      <orion-subheader>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </orion-subheader>
    `);
  });
});
