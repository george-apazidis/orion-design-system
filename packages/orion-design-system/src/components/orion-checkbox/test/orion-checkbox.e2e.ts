import { newE2EPage } from '@stencil/core/testing';

describe('orion-checkbox', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<orion-checkbox></orion-checkbox>');

    const element = await page.find('orion-checkbox');
    expect(element).toHaveClass('hydrated');
  });
});
