import { newSpecPage } from '@stencil/core/testing';
import { OrionStepper } from '../orion-stepper';

describe('orion-stepper', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [OrionStepper],
      html: `<orion-stepper></orion-stepper>`,
    });
    expect(page.root).toEqualHtml(`
      <orion-stepper>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </orion-stepper>
    `);
  });
});
