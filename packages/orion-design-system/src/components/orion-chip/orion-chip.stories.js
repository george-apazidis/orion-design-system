import { removeEmptyLines, getStoryControlSettings } from '../../utils/storybook-utils';

export default {
  title: 'Components/orion-chip',
  component: 'orion-chip',
  parameters: {
    docs: {
      description: {
        component:
          'Chips are used to communicate important information to the user. They can be used to indicate information, success, warning, or error. Chips can be dismissed by the user. Additional documentation available at [orion.united.com](https://orion.united.com/)',
      },
    },
  },
  // Configuring the these Storybook only controls to appear under
  // the same category in the ArgsTable
  argTypes: {
    slotContent: getStoryControlSettings('Default Slot'),
    showCustomColor: getStoryControlSettings('Show Custom Color'),
    slotCustomColor: getStoryControlSettings('Custom Color CSS'),
  },
};

const Template = (args) => removeEmptyLines(`
 <orion-chip 
  ${args.variant ? `variant="${args.variant}"` : ''}
  ${args.dismissible ? 'dismissible' : ''}
  ${args.isOpen ? 'is-open' : ''}
  ${args.solidBg ? 'solid-bg' : ''}
  ${args.showCustomColor ? `style="${args.slotCustomColor}"` : ''}
>
  ${args.slotContent}
</orion-chip>
`);

export const Default = Template.bind({});
Default.args = {
  variant: '',
  dismissible: false,
  isOpen: true,
  solidBg: false,
  slotContent: 'Chip label',
};
Default.parameters = {
  docs: {
    description: {
      story: 'This is the default chip',
    },
  },
};

export const OutlinedHigh = Template.bind({});
OutlinedHigh.args = {
  ...Default.args,
  variant: 'high',
};
OutlinedHigh.parameters = {
  docs: {
    description: {
      story: 'Outlined High',
    },
  },
};

export const OutlinedHighWithCancel = Template.bind({});
OutlinedHighWithCancel.args = {
  ...Default.args,
  variant: 'high',
  dismissible: true,
};
OutlinedHighWithCancel.parameters = {
  docs: {
    description: {
      story: 'Outlined High With Cancel',
    },
  },
};

export const SolidHigh = Template.bind({});
SolidHigh.args = {
  ...Default.args,
  variant: 'high',
  solidBg: true,
};
SolidHigh.parameters = {
  docs: {
    description: {
      story: 'Solid High',
    },
  },
};

export const SolidHighWithCancel = Template.bind({});
SolidHighWithCancel.args = {
  ...Default.args,
  variant: 'high',
  dismissible: true,
  solidBg: true,
};
SolidHighWithCancel.parameters = {
  docs: {
    description: {
      story: 'Solid High With Cancel',
    },
  },
};

export const OutlinedLow = Template.bind({});
OutlinedLow.args = {
  ...Default.args,
  variant: 'low',
};
OutlinedLow.parameters = {
  docs: {
    description: {
      story: 'Outlined Low',
    },
  },
};

export const OutlinedLowWithCancel = Template.bind({});
OutlinedLowWithCancel.args = {
  ...Default.args,
  variant: 'low',
  dismissible: true,
};
OutlinedLowWithCancel.parameters = {
  docs: {
    description: {
      story: 'Outlined Low With Cancel',
    },
  },
};

export const SolidLow = Template.bind({});
SolidLow.args = {
  ...Default.args,
  variant: 'low',
  solidBg: true,
};
SolidLow.parameters = {
  docs: {
    description: {
      story: 'Solid Low',
    },
  },
};

export const SolidLowWithCancel = Template.bind({});
SolidLowWithCancel.args = {
  ...Default.args,
  variant: 'low',
  dismissible: true,
  solidBg: true,
};
SolidLowWithCancel.parameters = {
  docs: {
    description: {
      story: 'Solid Low With Cancel',
    },
  },
};

export const CustomColorOutlined = Template.bind({});
CustomColorOutlined.args = {
  ...Default.args,
  variant: 'custom',
  showCustomColor: true,
  slotCustomColor: '--orion-chip-color__bg: #41748d; --orion-chip-color__text: #41748d;',
};
CustomColorOutlined.parameters = {
  docs: {
    description: {
      story: 'Custom Color Outlined (using CSS variables)',
    },
  },
};

export const CustomColorSolidWithCancel = Template.bind({});
CustomColorSolidWithCancel.args = {
  ...Default.args,
  variant: 'custom',
  dismissible: true,
  solidBg: true,
  showCustomColor: true,
  slotCustomColor: '--orion-chip-color__bg: #572c5f; --orion-chip-color__text: #fff;',
};
CustomColorSolidWithCancel.parameters = {
  docs: {
    description: {
      story: 'Custom Color Solid With Cancel (using CSS variables)',
    },
  },
};
