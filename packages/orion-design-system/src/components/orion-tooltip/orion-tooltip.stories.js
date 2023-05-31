import { removeEmptyLines, getStoryControlSettings } from '../../utils/storybook-utils';

export default {
  title: 'Components/orion-tooltip',
  component: 'orion-tooltip',
  parameters: {
    docs: {
      description: {
        component:
          'Tooltip is a component that displays a tooltip message. It is used to display additional information about an element. Additional documentation available at [orion.united.com](https://orion.united.com/)',
      },
    },
  },
  // Configuring the these Storybook only controls to appear under
  // the same category in the ArgsTable
  argTypes: {
    slotContent: getStoryControlSettings('orion-tooltip-body'),
  },
};

const Template = (args) => removeEmptyLines(`
<div style="margin: 100px;">
  <orion-tooltip
    ${args.tooltipPosition ? `tooltip-position="${args.tooltipPosition}"` : ''}
    ${args.tooltipWidth ? `tooltip-width="${args.tooltipWidth}"` : ''}
  >
    <svg style="height: 18px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M96 0C113.7 0 128 14.33 128 32V128H64V32C64 14.33 78.33 0 96 0zM288 0C305.7 0 320 14.33 320 32V128H256V32C256 14.33 270.3 0 288 0zM352 160C369.7 160 384 174.3 384 192C384 209.7 369.7 224 352 224V256C352 333.4 297 397.1 224 412.8V512H160V412.8C86.97 397.1 32 333.4 32 256V224C14.33 224 0 209.7 0 192C0 174.3 14.33 160 32 160H352z"/></svg>
    <span slot="orion-tooltip-body">
      ${args.slotContent}
    </span>
  </orion-tooltip>
</div>
`);

export const Default = Template.bind({});
Default.args = {
  tooltipPosition: '',
  tooltipWidth: '',
  slotContent: 'Power outlets are available in all rows. These 110v power outlets accept plugs from the U.S. and other select countries.',
};
Default.parameters = {
  docs: {
    description: {
      story: 'The default state',
    },
  },
};

export const TooltipBelow = Template.bind({});
TooltipBelow.args = {
  tooltipPosition: 'bottom',
  tooltipWidth: '',
  slotContent: 'Power outlets are available in all rows. These 110v power outlets accept plugs from the U.S. and other select countries.',
};
TooltipBelow.parameters = {
  docs: {
    description: {
      story: 'Tooltip positioned below the trigger',
    },
  },
};

export const TooltipAbove = Template.bind({});
TooltipAbove.args = {
  tooltipPosition: 'top',
  tooltipWidth: '',
  slotContent: 'Power outlets are available in all rows. These 110v power outlets accept plugs from the U.S. and other select countries.',
};
TooltipAbove.parameters = {
  docs: {
    description: {
      story: 'Tooltip positioned above the trigger',
    },
  },
};

export const CustomWidth = Template.bind({});
CustomWidth.args = {
  tooltipPosition: '',
  tooltipWidth: 500,
  slotContent: 'Power outlets are available in all rows. These 110v power outlets accept plugs from the U.S. and other select countries.',
};
CustomWidth.parameters = {
  docs: {
    description: {
      story: 'Tooltip with custom width',
    },
  },
};

export const HTMLTooltipContent = Template.bind({});
HTMLTooltipContent.args = {
  tooltipPosition: '',
  tooltipWidth: 456,
  slotContent: `
  SEA - Seattle-Tacoma International Airport - Seattle, WA USA<br>
  SFO - San Francisco Intl Airport - San Francisco, CA USA<br>
  SPC - La Palma Airport - Santa Cruz de la Palma, Spain<br>
  GRU - São Paulo–Guarulhos International Airport - São Paulo, Brazil
  `,
};
HTMLTooltipContent.parameters = {
  docs: {
    description: {
      story: 'Tooltip with HTML content',
    },
  },
};
