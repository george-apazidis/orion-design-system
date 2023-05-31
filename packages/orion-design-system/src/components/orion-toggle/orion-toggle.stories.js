import { removeEmptyLines, getStoryControlSettings } from '../../utils/storybook-utils';

export default {
  title: 'Components/orion-toggle',
  component: 'orion-toggle',
  parameters: {
    actions: {
      handles: ['valueChanged'],
    },
    docs: {
      description: {
        component:
          'Toggle is a component that allows users to toggle between two states. It is used to switch between on and off states. Use in conjunction with the `orion-toggle-group` component to control layout of a group of toggles. Additional documentation available at [orion.united.com](https://orion.united.com/)',
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
  <orion-toggle
  ${args.checked ? 'checked' : ''}
  ${args.disabled ? 'disabled' : ''}
  ${args.value ? `value="${args.value}"` : ''}
  ${args.name ? `name="${args.name}"` : ''}
  ${args.justify ? 'justify' : ''}
  >
    ${args.slotContent}
  </orion-toggle>
`);

export const Default = Template.bind({});
Default.args = {
  value: 'value-1',
  slotContent: 'Toggle item',
};
Default.parameters = {
  docs: {
    description: {
      story: 'The default state',
    },
  },
};

export const Checked = Template.bind({});
Checked.args = {
  ...Default.args,
  checked: true,
};
Checked.parameters = {
  docs: {
    description: {
      story: 'The checked state',
    },
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true,
};
Disabled.parameters = {
  docs: {
    description: {
      story: 'The disabled state',
    },
  },
};

export const DisabledChecked = Template.bind({});
DisabledChecked.args = {
  ...Default.args,
  disabled: true,
  checked: true,
};
DisabledChecked.parameters = {
  docs: {
    description: {
      story: 'The disabled and checked state',
    },
  },
};

export const JustifyContent = Template.bind({});
JustifyContent.args = {
  ...Default.args,
  justify: true,
};
JustifyContent.parameters = {
  docs: {
    description: {
      story: 'The justify content state (aligns the toggle input to the right)',
    },
  },
};
