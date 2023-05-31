import { newSpecPage } from '@stencil/core/testing';
import { OrionDateInput } from '../orion-date-input';

describe('orion-date-input', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [OrionDateInput],
      html: `<orion-date-input></orion-date-input>`,
    });
    expect(page.root).toEqualHtml(`
      <orion-date-input>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </orion-date-input>
    `);
  });
});
