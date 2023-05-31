import { removeEmptyLines, getStoryControlSettings } from '../../utils/storybook-utils';

export default {
  title: 'Components/orion-textarea',
  component: 'orion-textarea',
  parameters: {
    actions: {
      handles: ['valueChanged'],
    },
    docs: {
      description: {
        component:
          'Textarea is a component that displays a textarea. It is used to display textareas in forms. Use in conjunction with `orion-label`, `orion-error` and `orion-note` components. Additional documentation available at [orion.united.com](https://orion.united.com/)',
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
  <orion-textarea
  ${args.value ? `value="${args.value}"` : ''}
  ${args.placeholder ? `placeholder="${args.placeholder}"` : ''}
  ${args.disabled ? 'disabled' : ''}
  ${args.error ? 'error' : ''}
  ${args.resize ? `resize="${args.resize}"` : ''}
  ${args.resizeHorizontal ? 'resize-horizontal' : ''}
  ${args.resizeVertical ? 'resize-vertical' : ''}
  ></orion-textarea>
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
  resize: false,
  resizeHorizontal: false,
  resizeVertical: false,
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
      story: 'The disabled state. Resize functionality is disabled in this state.',
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
      story: 'The disabled state with value. Resize functionality is disabled in this state.',
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
      story: 'The diabled state with placeholder. Resize functionality is disabled in this state.',
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

export const Resize = Template.bind({});
Resize.args = {
  ...Default.args,
  resize: true,
};
Resize.parameters = {
  docs: {
    description: {
      story: 'The resize state',
    },
  },
};

export const ResizeHorizontal = Template.bind({});
ResizeHorizontal.args = {
  ...Default.args,
  resizeHorizontal: true,
};
ResizeHorizontal.parameters = {
  docs: {
    description: {
      story: 'The resize state, horizontal only',
    },
  },
};

export const ResizeVertical = Template.bind({});
ResizeVertical.args = {
  ...Default.args,
  resizeVertical: true,
};
ResizeVertical.parameters = {
  docs: {
    description: {
      story: 'The resize state, vertical only',
    },
  },
};

export const ResizeError = Template.bind({});
ResizeError.args = {
  ...Default.args,
  error: true,
  showError: true,
  resize: true,
};
ResizeError.parameters = {
  docs: {
    description: {
      story: 'The resize state with error',
    },
  },
};
