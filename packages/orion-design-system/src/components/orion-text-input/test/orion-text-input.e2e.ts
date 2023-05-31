import { newE2EPage } from '@stencil/core/testing';

describe('orion-text-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<orion-text-input></orion-text-input>');

    const element = await page.find('orion-text-input');
    expect(element).toHaveClass('hydrated');
  });
});
