import { newE2EPage } from '@stencil/core/testing';

describe('orion-header', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<orion-header></orion-header>');

    const element = await page.find('orion-header');
    expect(element).toHaveClass('hydrated');
  });
});
