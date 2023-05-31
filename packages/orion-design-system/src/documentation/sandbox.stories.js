import { removeEmptyLines, getStoryControlSettings } from '../utils/storybook-utils';

export default {
  title: 'Sandbox/Sandbox',
  component: 'sandbox',
  parameters: {
    docs: {
      description: {
        component: 'This is a blank canvas for testing components and general experimentation.',
      },
    },
  },
  // Configuring the these Storybook only controls to appear under
  // the same category in the ArgsTable
  argTypes: {
    // slot content
    slotContent: getStoryControlSettings('slot content'),
  },
};

const Template = (args) => removeEmptyLines(`
  ${args.slotContent ? `
    ${args.slotContent}
  ` : ''}
`);

export const Sandbox = Template.bind({});
Sandbox.args = {
  slotContent: '',
};
Sandbox.parameters = {
  docs: {
    description: {
      story: 'This is a blank canvas for testing components and general experimentation.',
    },
  },
};