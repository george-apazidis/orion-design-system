import { newE2EPage } from '@stencil/core/testing';

describe('orion-checkbox-group', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<orion-checkbox-group></orion-checkbox-group>');

    const element = await page.find('orion-checkbox-group');
    expect(element).toHaveClass('hydrated');
  });
});
