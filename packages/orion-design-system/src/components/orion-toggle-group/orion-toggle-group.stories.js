import { removeEmptyLines } from '../../utils/storybook-utils';

export default {
  title: 'Components/orion-toggle-group',
  component: 'orion-toggle-group',
  parameters: {
    docs: {
      description: {
        component: 'Toggle group is a component that controls layout of a group of toggles. Additional documentation available at [orion.united.com](https://orion.united.com/)',
      },
    },
  },
};

const Template = (args) => removeEmptyLines(`
 <orion-toggle-group
 ${args.inline ? 'inline' : ''}
 ${args.disabled ? 'disabled' : ''}
 ${args.justify ? 'justify' : ''}
 >
 <orion-toggle name="toggle" value="1">Toggle item 1</orion-toggle>
 <orion-toggle name="toggle" value="2">Toggle item 2 has longer text</orion-toggle>
 <orion-toggle name="toggle" value="3">Toggle item 3</orion-toggle>
 </orion-toggle-group>
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

export const Justify = Template.bind({});
Justify.args = {
  justify: true,
};
Justify.parameters = {
  docs: {
    description: {
      story: 'The justify group state (all items will have the same width)',
    },
  },
};
