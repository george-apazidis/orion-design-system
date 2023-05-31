import { newE2EPage } from '@stencil/core/testing';

describe('orion-toggle-group', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<orion-toggle-group></orion-toggle-group>');

    const element = await page.find('orion-toggle-group');
    expect(element).toHaveClass('hydrated');
  });
});
