import { newE2EPage } from '@stencil/core/testing';

describe('orion-link', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<orion-link></orion-link>');

    const element = await page.find('orion-link');
    expect(element).toHaveClass('hydrated');
  });
});
