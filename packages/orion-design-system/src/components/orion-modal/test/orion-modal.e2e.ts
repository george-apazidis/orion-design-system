import { newE2EPage } from '@stencil/core/testing';

describe('orion-modal', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<orion-modal></orion-modal>');

    const element = await page.find('orion-modal');
    expect(element).toHaveClass('hydrated');
  });
});
