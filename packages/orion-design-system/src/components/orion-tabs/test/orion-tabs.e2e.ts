import { newE2EPage } from '@stencil/core/testing';

describe('orion-tabs', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<orion-tabs></orion-tabs>');

    const element = await page.find('orion-tabs');
    expect(element).toHaveClass('hydrated');
  });
});
