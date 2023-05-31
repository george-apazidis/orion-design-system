import { removeEmptyLines, getStoryControlSettings } from '../../utils/storybook-utils';

export default {
  title: 'Components/orion-checkbox',
  component: 'orion-checkbox',
  parameters: {
    actions: {
      handles: ['valueChanged'],
    },
    docs: {
      description: {
        component:
          'Checkbox is a component that allows users to select one or more options from a set. Use in conjunction with the `orion-checkbox-group` component to control layout. Use in conjunction with `orion-label`, `orion-error` and `orion-note` components. Additional documentation available at [orion.united.com](https://orion.united.com/)',
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
  <orion-checkbox
  ${args.checked ? 'checked' : ''}
  ${args.disabled ? 'disabled' : ''}
  ${args.indeterminate ? 'indeterminate' : ''}
  >
    ${args.slotContent}
  </orion-checkbox>
`);

export const Default = Template.bind({});
Default.args = {
  checked: false,
  disabled: false,
  indeterminate: false,
  slotContent: 'Checkbox item',
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
  checked: true,
  disabled: true,
};
DisabledChecked.parameters = {
  docs: {
    description: {
      story: 'The disabled and checked state',
    },
  },
};

export const Indeterminate = Template.bind({});
Indeterminate.args = {
  ...Default.args,
  indeterminate: true,
};
Indeterminate.parameters = {
  docs: {
    description: {
      story: 'The indeterminate state',
    },
  },
};

export const IndeterminateDisabled = Template.bind({});
IndeterminateDisabled.args = {
  ...Default.args,
  indeterminate: true,
  disabled: true,
};
IndeterminateDisabled.parameters = {
  docs: {
    description: {
      story: 'The indeterminate and disabled state',
    },
  },
};

export const IndeterminateChecked = Template.bind({});
IndeterminateChecked.args = {
  ...Default.args,
  indeterminate: true,
  checked: true,
};
IndeterminateChecked.parameters = {
  docs: {
    description: {
      story: 'The indeterminate and checked state',
    },
  },
};
