import { newE2EPage } from '@stencil/core/testing';

describe('orion-textarea', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<orion-textarea></orion-textarea>');

    const element = await page.find('orion-textarea');
    expect(element).toHaveClass('hydrated');
  });
});
