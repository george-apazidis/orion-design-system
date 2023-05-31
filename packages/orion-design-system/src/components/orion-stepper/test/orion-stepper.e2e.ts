import { newE2EPage } from '@stencil/core/testing';

describe('orion-stepper', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<orion-stepper></orion-stepper>');

    const element = await page.find('orion-stepper');
    expect(element).toHaveClass('hydrated');
  });
});
