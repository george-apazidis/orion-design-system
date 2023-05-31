import { newE2EPage } from '@stencil/core/testing';

describe('orion-error', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<orion-error></orion-error>');

    const element = await page.find('orion-error');
    expect(element).toHaveClass('hydrated');
  });
});
