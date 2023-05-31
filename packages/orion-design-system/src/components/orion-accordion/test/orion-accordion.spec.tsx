import { newSpecPage } from '@stencil/core/testing';
import { OrionAccordion } from '../orion-accordion';

describe('orion-accordion', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [OrionAccordion],
      html: `<orion-accordion></orion-accordion>`,
    });
    expect(page.root).toEqualHtml(`
      <orion-accordion>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </orion-accordion>
    `);
  });
});
