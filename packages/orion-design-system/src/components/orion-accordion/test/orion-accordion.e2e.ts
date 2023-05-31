import { newE2EPage } from '@stencil/core/testing';

describe('orion-accordion', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<orion-accordion></orion-accordion>');

    const element = await page.find('orion-accordion');
    expect(element).toHaveClass('hydrated');
  });
});
