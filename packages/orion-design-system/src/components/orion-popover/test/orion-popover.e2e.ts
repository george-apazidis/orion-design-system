import { newE2EPage } from '@stencil/core/testing';

describe('orion-popover', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<orion-popover></orion-popover>');

    const element = await page.find('orion-popover');
    expect(element).toHaveClass('hydrated');
  });
});
