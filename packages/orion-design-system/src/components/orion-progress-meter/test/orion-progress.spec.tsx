import { newSpecPage } from '@stencil/core/testing';
import { OrionProgressMeter } from '../orion-progress-meter';

describe('orion-progress', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [OrionProgressMeter],
      html: `<orion-progress-meter></orion-progress-meter>`,
    });
    expect(page.root).toEqualHtml(`
      <orion-progress-meter>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </orion-progress-meter>
    `);
  });
});
