import { newSpecPage } from '@stencil/core/testing';
import { OrionTextarea } from '../orion-textarea';

describe('orion-textarea', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [OrionTextarea],
      html: `<orion-textarea></orion-textarea>`,
    });
    expect(page.root).toEqualHtml(`
      <orion-textarea>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </orion-textarea>
    `);
  });
});
