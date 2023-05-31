import { removeEmptyLines, getStoryControlSettings } from '../../utils/storybook-utils';

export default {
  title: 'Components/orion-popover',
  component: 'orion-popover',
  parameters: {
    docs: {
      description: {
        component:
          'Popovers are non-modal dialogs that allow users to access additional related information or functionality without a change in context. Popovers can appear with title areas or not. Popover content is specific to the intended use and, thus, not specified in the symbology. Note that any element can be used to launch a popover, not just a link or icon. This component uses [PopperJS](https://popper.js.org/) to handle most of the functionality. Additional documentation available at [orion.united.com](https://orion.united.com/)',
      },
    },
  },
  // Configuring the these Storybook only controls to appear under
  // the same category in the ArgsTable
  argTypes: {
    showTitleSlot: getStoryControlSettings('orion-popover-title'),
    showBodySlot: getStoryControlSettings('orion-popover-body'),
    slotContentTitle: getStoryControlSettings('orion-popover-title'),
    slotContentBody: getStoryControlSettings('orion-popover-body'),
  },
};

const Template = (args) => removeEmptyLines(`
 <div style="margin: 100px 200px;">
  <orion-popover
    ${args.popperWidth ? `popper-width="${args.popperWidth}"` : ''}
    ${args.placement ? `placement="${args.placement}"` : ''}
  >
    ${
  args.showTitleSlot
    ? `
    <span slot="orion-popover-title">
      ${args.slotContentTitle}
    </span>
    `
    : ''
}
    ${
  args.showBodySlot
    ? `
    <div slot="orion-popover-body">
      ${args.slotContentBody}
    </div>
    `
    : ''
}
    <i class="orion-icon orion-icon-in_seat_power" style="font-size: 18px;"></i>
  </orion-popover>
</div>
`);

export const Default = Template.bind({});
Default.args = {
  popperWidth: '',
  placement: '',
  showTitleSlot: true,
  slotContentTitle: 'Popver title',
  showBodySlot: true,
  slotContentBody: 'Popover body',
};
Default.parameters = {
  docs: {
    description: {
      story: 'The default state',
    },
  },
};

export const CustomWidth = Template.bind({});
CustomWidth.args = {
  ...Default.args,
  popperWidth: 200,
};
CustomWidth.parameters = {
  docs: {
    description: {
      story: 'Popover with custom width',
    },
  },
};

export const HTMLPopoverContent = Template.bind({});
HTMLPopoverContent.args = {
  ...Default.args,
  popperWidth: 460,
  placement: 'right',
  slotContentTitle: 'Change of Gauge | UA2135 ORD - LAS - SFO',
  slotContentBody: `<i>Your flight from <a href='#'>Phoenix</a>, AZ, US (PHX) to Washington, DC, US (IAD) makes a stop at <a href='#'>Chicago</a>, IL, US (ORD) where you'll change planes, but will keep the same flight number.</i><br><br>

  Time on Ground in <a href='#'>Chicago</a>, IL, US (ORD) is 55m<br><br>
  
  <strong>Equipment changes in Chicago, IL, US (ORD) from a Boeing 737-900 to a Boeing 787-8 Dreamliner</strong><br><br>
  
  <strong>Arrives:</strong> ORD at 08:22 PM<br>
  <strong>Departs:</strong> ORD at 09:15 PM`,
};
HTMLPopoverContent.parameters = {
  docs: {
    description: {
      story: 'Popover with HTML content',
    },
  },
};

export const NoTitle = Template.bind({});
NoTitle.args = {
  ...Default.args,
  showTitleSlot: false,
};
NoTitle.parameters = {
  docs: {
    description: {
      story: 'Popover without title',
    },
  },
};

export const PlacementTop = Template.bind({});
PlacementTop.args = {
  ...Default.args,
  popperWidth: 100,
  placement: 'top',
  showTitleSlot: false,
};
PlacementTop.parameters = {
  docs: {
    description: {
      story: 'Popover with placement top',
    },
  },
};

export const PlacementBottom = Template.bind({});
PlacementBottom.args = {
  ...Default.args,
  popperWidth: 100,
  placement: 'bottom',
  showTitleSlot: false,
};
PlacementBottom.parameters = {
  docs: {
    description: {
      story: 'Popover with placement bottom',
    },
  },
};

export const PlacementLeft = Template.bind({});
PlacementLeft.args = {
  ...Default.args,
  popperWidth: 100,
  placement: 'left',
  showTitleSlot: false,
};
PlacementLeft.parameters = {
  docs: {
    description: {
      story: 'Popover with placement left',
    },
  },
};

export const PlacementRight = Template.bind({});
PlacementRight.args = {
  ...Default.args,
  popperWidth: 100,
  placement: 'right',
  showTitleSlot: false,
};
PlacementRight.parameters = {
  docs: {
    description: {
      story: 'Popover with placement right',
    },
  },
};
