import { newE2EPage } from '@stencil/core/testing';

describe('orion-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<orion-button></orion-button>');

    const element = await page.find('orion-button');
    expect(element).toHaveClass('hydrated');
  });
});
