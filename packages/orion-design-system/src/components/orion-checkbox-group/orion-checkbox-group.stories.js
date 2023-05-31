import { getStoryControlSettings, removeEmptyLines } from '../../utils/storybook-utils';

export default {
  title: 'Components/orion-checkbox-group',
  component: 'orion-checkbox-group',
  parameters: {
    docs: {
      description: {
        component:
          'Checkbox group is a component that controls layout of a group of checkboxes. Use in conjunction with `orion-label`, `orion-error` and `orion-note` components. Additional documentation available at [orion.united.com](https://orion.united.com/)',
      },
    },
  },
  // Configuring the these Storybook only controls to
  // appear under the same category in the ArgsTable
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
 <orion-checkbox-group
 ${args.inline ? 'inline' : ''}
 ${args.disabled ? 'disabled' : ''}
 >
 <orion-checkbox name="checkbox" value="1">Checkbox item 1</orion-checkbox>
 <orion-checkbox name="checkbox" value="2">Checkbox item 2 has longer text</orion-checkbox>
 <orion-checkbox name="checkbox" value="3">Checkbox item 3</orion-checkbox>
 </orion-checkbox-group>
 ${args.showInlineError ? '<orion-error class="orion-is-hidden-mobile">Error feedback</orion-error>' : ''}
`);

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
  docs: {
    description: {
      story: 'The default state',
    },
  },
};

export const Inline = Template.bind({});
Inline.args = {
  inline: true,
};
Inline.parameters = {
  docs: {
    description: {
      story: 'The inline state (desktop only)',
    },
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
Disabled.parameters = {
  docs: {
    description: {
      story: 'The disabled group state',
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
