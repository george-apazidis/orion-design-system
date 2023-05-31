import { newE2EPage } from '@stencil/core/testing';

describe('orion-dropdown', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<orion-dropdown></orion-dropdown>');

    const element = await page.find('orion-dropdown');
    expect(element).toHaveClass('hydrated');
  });
});
