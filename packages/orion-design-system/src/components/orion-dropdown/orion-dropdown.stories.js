import { getStoryControlSettings, removeEmptyLines } from '../../utils/storybook-utils';

export default {
  title: 'Components/orion-dropdown',
  component: 'orion-dropdown',
  parameters: {
    actions: {
      handles: ['valueChanged'],
    },
    docs: {
      description: {
        component: 'Dropdown is a component that allows users to select one option from a set. Additional documentation available at [orion.united.com](https://orion.united.com/)',
      },
    },
  },
  argTypes: {
    showError: getStoryControlSettings('error', '**NOT PART OF COMPONENT API**. Toggles the `error` state in this storybook story'),
    summary: {
      table: {
        disable: true,
      },
    },
    isOpen: {
      table: {
        disable: true,
      },
    },
  },
};

const Template = (args) => removeEmptyLines(`
  <orion-label ${args.showError ? 'error' : ''} ${args.disabled ? 'disabled' : ''}>Label</orion-label>
  <orion-dropdown 
  ${args.name ? `name="${args.name}"` : ''}
  ${args.value ? `value="${args.value}"` : ''}
  ${args.disabled ? 'disabled' : ''}
  ${args.required ? 'required' : ''}
  ${args.error ? 'error' : ''}
  ${args.placeholder ? `placeholder="${args.placeholder}"` : ''}
  >
    <orion-dropdown-option value="ORD">Chicago</orion-dropdown-option>
    <orion-dropdown-option value="CLE" disabled>Cleveland</orion-dropdown-option>
    <orion-dropdown-option value="DEN">Denver</orion-dropdown-option>
    <orion-dropdown-option value="IAH">Houston</orion-dropdown-option>
    <orion-dropdown-option value="LAX">Los Angeles</orion-dropdown-option>
    <orion-dropdown-option value="EWR">New York/Newark</orion-dropdown-option>
    <orion-dropdown-option value="SFO">San Francisco</orion-dropdown-option>
    <orion-dropdown-option value="IAD">Washington D.C.</orion-dropdown-option>
  </orion-dropdown>
  ${args.showError ? '<orion-error>Error feedback</orion-error>' : ''}
  <orion-note>This is a note</orion-note>
  `);

export const Default = Template.bind({});
Default.args = {
  name: 'dropdown',
  value: '',
  placeholder: 'Select one',
};
Default.parameters = {
  docs: {
    description: {
      story: 'The default state',
    },
  },
};

export const OptionPreselected = Template.bind({});
OptionPreselected.args = {
  ...Default.args,
  value: 'DEN',
};
OptionPreselected.parameters = {
  docs: {
    description: {
      story: 'An option is preselected',
    },
  },
};

export const DisabledWithPlaceholder = Template.bind({});
DisabledWithPlaceholder.args = {
  ...Default.args,
  disabled: true,
  placeholder: 'Disabled with placeholder',
};
DisabledWithPlaceholder.parameters = {
  docs: {
    description: {
      story: 'The dropdown is disabled with a placeholder',
    },
  },
};

export const DisabledWithOptionPreselected = Template.bind({});
DisabledWithOptionPreselected.args = {
  ...Default.args,
  disabled: true,
  placeholder: '',
  value: 'SFO',
};
DisabledWithOptionPreselected.parameters = {
  docs: {
    description: {
      story: 'The dropdown is disabled with an option preselected',
    },
  },
};

export const Error = Template.bind({});
Error.args = {
  ...Default.args,
  error: true,
  showError: true,
  placeholder: '',
};
Error.parameters = {
  docs: {
    description: {
      story: 'The dropdown is in error state',
    },
  },
};
