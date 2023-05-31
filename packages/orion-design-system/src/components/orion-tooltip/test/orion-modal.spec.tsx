import { newSpecPage } from '@stencil/core/testing';
import { OrionTooltip } from '../orion-tooltip';

describe('orion-tooltip', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [OrionTooltip],
      html: `<orion-tooltip></orion-tooltip>`,
    });
    expect(page.root).toEqualHtml(`
      <orion-tooltip>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </orion-tooltip>
    `);
  });
});
