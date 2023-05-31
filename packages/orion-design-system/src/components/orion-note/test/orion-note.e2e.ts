import { newE2EPage } from '@stencil/core/testing';

describe('orion-note', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<orion-note></orion-note>');

    const element = await page.find('orion-note');
    expect(element).toHaveClass('hydrated');
  });
});
