import { newE2EPage } from '@stencil/core/testing';

describe('orion-dropdown-option', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<orion-dropdown-option></orion-dropdown-option>');

    const element = await page.find('orion-dropdown-option');
    expect(element).toHaveClass('hydrated');
  });
});
