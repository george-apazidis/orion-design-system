import { newSpecPage } from '@stencil/core/testing';
import { OrionTextInput } from '../orion-text-input';

describe('orion-text-input', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [OrionTextInput],
      html: `<orion-text-input></orion-text-input>`,
    });
    expect(page.root).toEqualHtml(`
      <orion-text-input>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </orion-text-input>
    `);
  });
});
