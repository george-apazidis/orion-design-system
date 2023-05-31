import { newSpecPage } from '@stencil/core/testing';
import { OrionNavMenu } from '../orion-nav-menu';

describe('orion-nav-menu', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [OrionNavMenu],
      html: `<orion-nav-menu></orion-nav-menu>`,
    });
    expect(page.root).toEqualHtml(`
      <orion-nav-menu>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </orion-nav-menu>
    `);
  });
});
