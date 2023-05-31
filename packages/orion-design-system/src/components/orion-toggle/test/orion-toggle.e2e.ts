import { newE2EPage } from '@stencil/core/testing';

describe('orion-toggle', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<orion-toggle></orion-toggle>');

    const element = await page.find('orion-toggle');
    expect(element).toHaveClass('hydrated');
  });
});
