import { newE2EPage } from '@stencil/core/testing';

describe('orion-list-item', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<orion-list-item></orion-list-item>');

    const element = await page.find('orion-list-item');
    expect(element).toHaveClass('hydrated');
  });
});
