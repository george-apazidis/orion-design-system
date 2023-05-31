import { newE2EPage } from '@stencil/core/testing';

describe('orion-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<orion-list></orion-list>');

    const element = await page.find('orion-list');
    expect(element).toHaveClass('hydrated');
  });
});
