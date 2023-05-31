import { removeEmptyLines, getStoryControlSettings } from '../../utils/storybook-utils';

export default {
  title: 'Components/orion-stepper',
  parameters: {
    actions: {
      handles: ['valueChanged', 'keydown'],
    },
  },
  component: 'orion-stepper',
  parameters: {
    docs: {
      description: {
        component: 'Stepper is a component that displays a number stepper. Additional documentation available at [orion.united.com](https://orion.united.com/)',
      },
    },
  },
  // Configuring the these Storybook only controls to
  // appear under the same category in the ArgsTable
  argTypes: {
    showError: getStoryControlSettings('error'),
    changeTallyWidth: getStoryControlSettings('tallyWidth'),
    tallyWidth: getStoryControlSettings('tallyWidth'),
  },
};

const Template = (args) => removeEmptyLines(`
  <orion-label
  ${args.showError ? 'error' : ''}
  ${args.disabled ? 'disabled' : ''}
 >Label</orion-label>
  <orion-stepper
    ${args.disabled ? 'disabled' : ''}
    ${args.error ? 'error' : ''}
    ${args.hideTally ? 'hide-tally' : ''}
    ${args.value ? `value="${args.value}"` : 'value="0"'}
    ${args.step ? `step="${args.step}"` : ''}
    ${args.min ? `min="${args.min}"` : ''}
    ${args.max ? `max="${args.max}"` : ''}
    ${args.changeTallyWidth ? `style="--orion-stepper-tally-width: ${args.tallyWidth};"` : ''}
  ></orion-stepper>
  ${args.showError ? '<orion-error>Error feedback</orion-error>' : ''}
  <orion-note>This is a note</orion-note>
`);

export const Default = Template.bind({});
Default.args = {
  value: 5,
  disabled: false,
  error: false,
  showError: false,
  hideTally: false,
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

export const Error = Template.bind({});
Error.args = {
  ...Default.args,
  error: true,
  showError: true,
};
Error.parameters = {
  docs: {
    description: {
      story: 'The error state',
    },
  },
};

export const HideTally = Template.bind({});
HideTally.args = {
  ...Default.args,
  hideTally: true,
};
HideTally.parameters = {
  docs: {
    description: {
      story: 'The current tally is hidden',
    },
  },
};

export const MaxReached = Template.bind({});
MaxReached.args = {
  ...Default.args,
  value: 2,
  max: 2,
};
MaxReached.parameters = {
  docs: {
    description: {
      story: 'When the `max` value is reached. The increment button will be disabled',
    },
  },
};

export const MinReached = Template.bind({});
MinReached.args = {
  ...Default.args,
  value: 2,
  min: 2,
};
MinReached.parameters = {
  docs: {
    description: {
      story: 'When the `min` value is reached. The decrement button will be disabled',
    },
  },
};

export const VariableTallyWidth = Template.bind({});
VariableTallyWidth.args = {
  ...Default.args,
  changeTallyWidth: true,
  tallyWidth: '100%',
};
VariableTallyWidth.parameters = {
  docs: {
    description: {
      story: 'The tally width can be changed using the `--orion-stepper-tally-width` CSS variable',
    },
  },
};
