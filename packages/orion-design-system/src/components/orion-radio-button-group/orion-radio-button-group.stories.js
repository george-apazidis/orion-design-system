import { getStoryControlSettings, removeEmptyLines } from '../../utils/storybook-utils';

export default {
  title: 'Components/orion-radio-button-group',
  component: 'orion-radio-button-group',
  parameters: {
    actions: {
      handles: ['valueChanged'],
    },
    docs: {
      description: {
        component:
          'Radio button group is a component that controls layout of a group of radio buttons and allows for a single selection. Use in conjunction with `orion-label`, `orion-error` and `orion-note` components. Additional documentation available at [orion.united.com](https://orion.united.com/)',
      },
    },
  },
  argTypes: {
    showError: getStoryControlSettings('error', '**NOT PART OF COMPONENT API**. Toggles the `error` state in this storybook story'),
    showInlineError: getStoryControlSettings('inline', '**NOT PART OF COMPONENT API**. Toggles the `inline` state in this storybook story'),
  },
};

const Template = (args) => removeEmptyLines(`
  <orion-label
  ${args.showError || args.showInlineError ? 'error' : ''}
  ${args.disabled ? 'disabled' : ''}
 >Label</orion-label>
 ${args.showError ? '<orion-error>Error feedback</orion-error>' : ''}
 ${args.showInlineError ? '<orion-error class="orion-is-hidden-desktop">Error feedback</orion-error>' : ''}
<orion-radio-button-group 
${args.inline ? 'inline' : ''}
${args.disabled ? 'disabled' : ''}
${args.value ? `value="${args.value}"` : ''}
${args.name ? `name="${args.name}"` : ''}
>
 <orion-radio-button value="value-1">Radio button item 1</orion-radio-button>
 <orion-radio-button value="value-2">Radio button item 2 has longer text</orion-radio-button>
 <orion-radio-button value="value-3">Radio button item 3</orion-radio-button>
</orion-radio-button-group>
${args.showInlineError ? '<orion-error class="orion-is-hidden-mobile">Error feedback</orion-error>' : ''}
<orion-note>This is a note</orion-note>
`);

export const Default = Template.bind({});
Default.args = {
  name: 'radio-button-group',
};
Default.parameters = {
  docs: {
    description: {
      story: 'The default state',
    },
  },
};

export const Inline = Template.bind({});
Inline.args = {
  name: 'radio-button-group',
  inline: true,
};
Inline.parameters = {
  docs: {
    description: {
      story: 'The inline state',
    },
  },
};

export const GroupDisabled = Template.bind({});
GroupDisabled.args = {
  name: 'radio-button-group',
  disabled: true,
};
GroupDisabled.parameters = {
  docs: {
    description: {
      story: 'The group disabled state',
    },
  },
};

export const Error = Template.bind({});
Error.args = {
  showError: true,
  showInlineError: false,
};
Error.parameters = {
  docs: {
    description: {
      story: 'The error state',
    },
  },
};

export const InlineGroupWithError = Template.bind({});
InlineGroupWithError.args = {
  showError: false,
  showInlineError: true,
  inline: true,
};
InlineGroupWithError.parameters = {
  docs: {
    description: {
      story: 'The inline group with error state',
    },
  },
};

export const OptionPreselected = Template.bind({});
OptionPreselected.args = {
  ...Default.args,
  value: 'value-2',
};
OptionPreselected.parameters = {
  docs: {
    description: {
      story: 'The radio button group with preselected option',
    },
  },
};
