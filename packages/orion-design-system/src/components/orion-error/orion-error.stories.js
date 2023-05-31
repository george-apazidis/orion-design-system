import { removeEmptyLines, getStoryControlSettings } from '../../utils/storybook-utils';

export default {
  title: 'Components/orion-error',
  component: 'orion-error',
  parameters: {
    docs: {
      description: {
        component:
          'Error is a component that displays an error message. It is used to display errors in forms. Use in conjunction with the `orion-text-input` component and other form components. Additional documentation available at [orion.united.com](https://orion.united.com/)',
      },
    },
  },
  // Configuring the these Storybook only controls to appear under
  // the same category in the ArgsTable
  argTypes: {
    slotContent: getStoryControlSettings('default'),
  },
};

const Template = (args) => removeEmptyLines(`
  <orion-error>
    ${args.slotContent}
  </orion-error>
`);

export const Default = Template.bind({});
Default.args = {
  slotContent: 'This is an error message',
};
Default.parameters = {
  docs: {
    description: {
      story: 'The default state',
    },
  },
};
