import { newE2EPage } from '@stencil/core/testing';

describe('orion-tooltip', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<orion-tooltip></orion-tooltip>');

    const element = await page.find('orion-tooltip');
    expect(element).toHaveClass('hydrated');
  });
});
