import { newE2EPage } from '@stencil/core/testing';

describe('orion-nav-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<orion-nav-button></orion-nav-button>');

    const element = await page.find('orion-nav-button');
    expect(element).toHaveClass('hydrated');
  });
});
