import { removeEmptyLines, getStoryControlSettings } from '../../utils/storybook-utils';

export default {
  title: 'Components/orion-label',
  component: 'orion-label',
  // Configuring the these Storybook only controls to appear under
  // the same category in the ArgsTable
  argTypes: {
    showConditionalSlot: getStoryControlSettings('orion-label-conditional'),
    slotContentConditional: getStoryControlSettings('orion-label-conditional'),
    slotContentDefault: getStoryControlSettings('default'),
  },
};

const Template = (args) => removeEmptyLines(`
  <orion-label
    ${args.disabled ? 'disabled' : ''}
    ${args.error ? 'error' : ''}
  >
    ${args.slotContentDefault}
  ${
  args.showConditionalSlot
    ? `
      <span slot="orion-label-conditional">
        ${args.slotContentConditional}
      </span>
    `
    : ''
}
  </orion-label>
`);

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  error: false,
  slotContentDefault: 'Label',
  showConditionalSlot: false,
  slotContentConditional: '',
};
Default.parameters = {
  docs: {
    description: {
      story: 'The default state',
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

export const Error = Template.bind({});
Error.args = {
  ...Default.args,
  error: true,
};
Error.parameters = {
  docs: {
    description: {
      story: 'The error state',
    },
  },
};

export const Conditional = Template.bind({});
Conditional.args = {
  ...Default.args,
  showConditionalSlot: true,
  slotContentConditional: '(Conditional)',
};
Conditional.parameters = {
  docs: {
    description: {
      story: 'Conditional text displayed',
    },
  },
};
