import { newE2EPage } from '@stencil/core/testing';

describe('orion-progress', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<orion-progress></orion-progress>');

    const element = await page.find('orion-progress');
    expect(element).toHaveClass('hydrated');
  });
});
