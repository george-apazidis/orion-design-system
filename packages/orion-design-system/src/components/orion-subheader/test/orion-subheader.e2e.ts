import { newE2EPage } from '@stencil/core/testing';

describe('orion-subheader', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<orion-subheader></orion-subheader>');

    const element = await page.find('orion-subheader');
    expect(element).toHaveClass('hydrated');
  });
});
