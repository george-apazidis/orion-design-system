import { newSpecPage } from '@stencil/core/testing';
import { OrionRadioButton } from '../orion-radio-button';

describe('orion-radio-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [OrionRadioButton],
      html: `<orion-radio-button></orion-radio-button>`,
    });
    expect(page.root).toEqualHtml(`
      <orion-radio-button>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </orion-radio-button>
    `);
  });
});
