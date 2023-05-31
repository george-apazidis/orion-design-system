import { newE2EPage } from '@stencil/core/testing';

describe('orion-radio-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<orion-radio-button></orion-radio-button>');

    const element = await page.find('orion-radio-button');
    expect(element).toHaveClass('hydrated');
  });
});
