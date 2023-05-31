import { removeEmptyLines, getStoryControlSettings } from '../../utils/storybook-utils';

export default {
  title: 'Components/orion-note',
  component: 'orion-note',
  parameters: {
    docs: {
      description: {
        component:
          'Note is a component that displays a note message. It is used to display notes in forms. Use in conjunction with the `orion-text-input` component and other form components. Additional documentation available at [orion.united.com](https://orion.united.com/)',
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
  <orion-note>
    ${args.slotContent}
  </orion-note>
`);

export const Default = Template.bind({});
Default.args = {
  slotContent: 'This is a note',
};
Default.parameters = {
  docs: {
    description: {
      story: 'The default state',
    },
  },
};
