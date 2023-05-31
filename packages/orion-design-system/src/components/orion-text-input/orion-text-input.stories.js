import { removeEmptyLines, getStoryControlSettings } from '../../utils/storybook-utils';

export default {
  title: 'Components/orion-text-input',
  component: 'orion-text-input',
  parameters: {
    actions: {
      handles: ['valueChanged'],
    },
    docs: {
      description: {
        component:
          'Text input is a component that allows users to enter text. It is used to display text inputs in forms. Use in conjunction with `orion-label`, `orion-error` and `orion-note` components. Additional documentation available at [orion.united.com](https://orion.united.com/)',
      },
    },
  },
  // Configuring the these Storybook only controls to
  // appear under the same category in the ArgsTable
  argTypes: {
    showError: getStoryControlSettings('error', '**NOT PART OF COMPONENT API**. Toggles the `error` state in this storybook story'),
    slotContentLabel: getStoryControlSettings('label'),
    slotContentError: getStoryControlSettings('error'),
    slotContentNote: getStoryControlSettings('note'),
  },
};

const Template = (args) => removeEmptyLines(`
  <orion-label
  ${args.showError ? 'error' : ''}
  ${args.disabled ? 'disabled' : ''}
 >
    ${args.slotContentLabel}
 </orion-label>
  <orion-text-input
  ${args.type ? `type="${args.type}"` : ''}
  ${args.value ? `value="${args.value}"` : ''}
  ${args.placeholder ? `placeholder="${args.placeholder}"` : ''}
  ${args.disabled ? 'disabled' : ''}
  ${args.error ? 'error' : ''}
  ></orion-text-input>
  ${
  args.showError
    ? `<orion-error>
    ${args.slotContentError}
  </orion-error>`
    : ''
}
  <orion-note>
    ${args.slotContentNote}
  </orion-note>
`);

export const Default = Template.bind({});
Default.args = {
  value: '',
  disabled: false,
  error: false,
  showError: false,
  placeholder: '',
  type: 'text',
  slotContentLabel: 'Label',
  slotContentError: 'Error feedback',
  slotContentNote: 'This is a note',
};
Default.parameters = {
  docs: {
    description: {
      story: 'The default state',
    },
  },
};

export const DataEntered = Template.bind({});
DataEntered.args = {
  ...Default.args,
  value: 'Data entry value',
};
DataEntered.parameters = {
  docs: {
    description: {
      story: 'Value data entered',
    },
  },
};

export const Placeholder = Template.bind({});
Placeholder.args = {
  ...Default.args,
  placeholder: 'Placeholder',
};
Placeholder.parameters = {
  docs: {
    description: {
      story: 'The placeholder state',
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

export const DisabledValue = Template.bind({});
DisabledValue.args = {
  ...Default.args,
  value: 'Disabled value',
  disabled: true,
};
DisabledValue.parameters = {
  docs: {
    description: {
      story: 'The disabled state with value',
    },
  },
};

export const DisabledPlaceholder = Template.bind({});
DisabledPlaceholder.args = {
  ...Default.args,
  placeholder: 'Disabled with placeholder',
  disabled: true,
};
DisabledPlaceholder.parameters = {
  docs: {
    description: {
      story: 'The diabled state with placeholder',
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

export const ErrorValue = Template.bind({});
ErrorValue.args = {
  ...Default.args,
  value: 'Error value',
  error: true,
  showError: true,
};
ErrorValue.parameters = {
  docs: {
    description: {
      story: 'The error state with value',
    },
  },
};

export const ErrorPlaceholder = Template.bind({});
ErrorPlaceholder.args = {
  ...Default.args,
  placeholder: 'Error with placeholder',
  error: true,
  showError: true,
};
ErrorPlaceholder.parameters = {
  docs: {
    description: {
      story: 'The error state with placeholder',
    },
  },
};
