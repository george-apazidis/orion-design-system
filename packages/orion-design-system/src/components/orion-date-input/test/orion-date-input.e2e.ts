import { newE2EPage } from '@stencil/core/testing';

describe('orion-date-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<orion-date-input></orion-date-input>');

    const element = await page.find('orion-date-input');
    expect(element).toHaveClass('hydrated');
  });
});
