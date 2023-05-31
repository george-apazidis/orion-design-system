import { newE2EPage } from '@stencil/core/testing';

describe('orion-label', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<orion-label></orion-label>');

    const element = await page.find('orion-label');
    expect(element).toHaveClass('hydrated');
  });
});
