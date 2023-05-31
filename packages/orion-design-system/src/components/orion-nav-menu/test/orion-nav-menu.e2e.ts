import { newE2EPage } from '@stencil/core/testing';

describe('orion-nav-menu', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<orion-nav-menu></orion-nav-menu>');

    const element = await page.find('orion-nav-menu');
    expect(element).toHaveClass('hydrated');
  });
});
