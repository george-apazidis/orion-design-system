import { removeEmptyLines, getStoryControlSettings } from '../../utils/storybook-utils';

export default {
  title: 'Modules/orion-message',
  component: 'orion-message',
  parameters: {
    docs: {
      description: {
        component:
          'Messages are used to communicate important information to the user. They can be used to indicate information, success, warning, or error. Messages can be dismissed by the user or automatically. For dismissible/temporary alert messages, use `z-index: var(--orion-z-extreme, 9999);` to ensure the message is always on top of other elements. The highest component in the library is `orion-modal` which uses `z-index: var(--orion-z-very-high, 5000);` and temporary alert messages should always be on top of modals. Additional documentation available at [orion.united.com](https://orion.united.com/)',
      },
    },
  },
  // Configuring the these Storybook only controls to appear under
  // the same category in the ArgsTable
  argTypes: {
    slotContent: getStoryControlSettings('default'),
  },
};

const Template = (args) => removeEmptyLines(`
 <orion-message 
  ${args.variant ? `variant="${args.variant}"` : ''}
  ${args.overlayTime ? `overlay-time="${args.overlayTime}"` : ''}
  ${args.heading ? `heading="${args.heading}"` : ''}
  ${args.dismissible ? 'dismissible' : ''}
  ${args.hasIcon ? 'has-icon' : ''}
  ${args.isOpen ? 'is-open' : ''}
>
  ${args.slotContent}
</orion-message>
`);

export const Default = Template.bind({});
Default.args = {
  variant: '',
  overlayTime: '',
  heading: '',
  dismissible: false,
  hasIcon: false,
  isOpen: true,
  slotContent: '<p>This is a default message</p>',
};
Default.parameters = {
  docs: {
    description: {
      story: 'This is the default message',
    },
  },
};

export const MessageOnly = Template.bind({});
MessageOnly.args = {
  ...Default.args,
  slotContent: '<p>This is a content only message</p>',
};
MessageOnly.parameters = {
  docs: {
    description: {
      story: 'This is a content only message',
    },
  },
};

export const IconAndMessage = Template.bind({});
IconAndMessage.args = {
  ...Default.args,
  hasIcon: true,
  slotContent: '<p>This is a message with an icon and content</p>',
};
IconAndMessage.parameters = {
  docs: {
    description: {
      story: 'This is a message with an icon and content',
    },
  },
};

export const TitleAndMessage = Template.bind({});
TitleAndMessage.args = {
  ...Default.args,
  heading: 'This is a title',
  slotContent: '<p>This is a message with a title and content</p>',
};
TitleAndMessage.parameters = {
  docs: {
    description: {
      story: 'This is a message with a title and content',
    },
  },
};

export const IconTitleAndMessage = Template.bind({});
IconTitleAndMessage.args = {
  ...Default.args,
  hasIcon: true,
  heading: 'This is a title',
  slotContent: '<p>This is a message with an icon, title and content</p>',
};
IconTitleAndMessage.parameters = {
  docs: {
    description: {
      story: 'This is a message with an icon, title and content',
    },
  },
};

export const PermanentOnLoadInfo = Template.bind({});
PermanentOnLoadInfo.args = {
  ...Default.args,
  variant: 'info',
  heading: 'Info',
  hasIcon: true,
  slotContent: '<p>This is a permanent message with info variant</p>',
};
PermanentOnLoadInfo.parameters = {
  docs: {
    description: {
      story: 'This is a permanent message with info variant',
    },
  },
};

export const PermanentOnLoadSuccess = Template.bind({});
PermanentOnLoadSuccess.args = {
  ...Default.args,
  variant: 'success',
  heading: 'Success',
  hasIcon: true,
  slotContent: '<p>This is a permanent message with success variant</p>',
};
PermanentOnLoadSuccess.parameters = {
  docs: {
    description: {
      story: 'This is a permanent message with success variant',
    },
  },
};

export const PermanentOnLoadLow = Template.bind({});
PermanentOnLoadLow.args = {
  ...Default.args,
  variant: 'low',
  heading: 'Priority low',
  hasIcon: true,
  slotContent: '<p>This is a permanent warning message with low priority variant</p>',
};
PermanentOnLoadLow.parameters = {
  docs: {
    description: {
      story: 'This is a permanent warning message with low priority variant',
    },
  },
};

export const PermanentOnLoadMedium = Template.bind({});
PermanentOnLoadMedium.args = {
  ...Default.args,
  variant: 'medium',
  heading: 'Priority medium',
  hasIcon: true,
  slotContent: '<p>This is a permanent warning message with medium priority variant</p>',
};
PermanentOnLoadMedium.parameters = {
  docs: {
    description: {
      story: 'This is a permanent warning message with medium priority variant',
    },
  },
};

export const PermanentOnLoadHigh = Template.bind({});
PermanentOnLoadHigh.args = {
  ...Default.args,
  variant: 'high',
  heading: 'Priority high',
  hasIcon: true,
  slotContent: '<p>This is a permanent warning message with high priority variant</p>',
};
PermanentOnLoadHigh.parameters = {
  docs: {
    description: {
      story: 'This is a permanent warning message with high priority variant',
    },
  },
};

export const TemporaryToastInfo = Template.bind({});
TemporaryToastInfo.args = {
  ...Default.args,
  variant: 'info',
  heading: 'Info',
  hasIcon: true,
  dismissible: true,
  slotContent: '<p>This is a temporary message with info variant</p>',
};
TemporaryToastInfo.parameters = {
  docs: {
    description: {
      story: 'This is a temporary message with info variant',
    },
  },
};

export const TemporaryToastSuccess = Template.bind({});
TemporaryToastSuccess.args = {
  ...Default.args,
  variant: 'success',
  heading: 'Success',
  hasIcon: true,
  dismissible: true,
  slotContent: '<p>This is a temporary message with success variant</p>',
};
TemporaryToastSuccess.parameters = {
  docs: {
    description: {
      story: 'This is a temporary message with success variant',
    },
  },
};

export const TemporaryToastLow = Template.bind({});
TemporaryToastLow.args = {
  ...Default.args,
  variant: 'low',
  heading: 'Priority low',
  hasIcon: true,
  dismissible: true,
  slotContent: '<p>This is a temporary warning message with low priority variant</p>',
};
TemporaryToastLow.parameters = {
  docs: {
    description: {
      story: 'This is a temporary warning message with low priority variant',
    },
  },
};

export const TemporaryToastMedium = Template.bind({});
TemporaryToastMedium.args = {
  ...Default.args,
  variant: 'medium',
  heading: 'Priority medium',
  hasIcon: true,
  dismissible: true,
  slotContent: '<p>This is a temporary warning message with medium priority variant</p>',
};
TemporaryToastMedium.parameters = {
  docs: {
    description: {
      story: 'This is a temporary warning message with medium priority variant',
    },
  },
};

export const TemporaryToastHigh = Template.bind({});
TemporaryToastHigh.args = {
  ...Default.args,
  variant: 'high',
  heading: 'Priority high',
  hasIcon: true,
  dismissible: true,
  slotContent: '<p>This is a temporary warning message with high priority variant</p>',
};
TemporaryToastHigh.parameters = {
  docs: {
    description: {
      story: 'This is a temporary warning message with high priority variant',
    },
  },
};

export const MobileOverlayIconOnly = Template.bind({});
MobileOverlayIconOnly.args = {
  ...Default.args,
  variant: 'success-overlay',
  hasIcon: true,
  slotContent: '',
};
MobileOverlayIconOnly.parameters = {
  viewport: {
    defaultViewport: 'mobile',
  },
  docs: {
    description: {
      story: 'This is a mobile overlay message with icon only (mobile only). Resize the browser to see the mobile overlay, or toggle the viewport size in the Canvas view toolbar.',
    },
  },
};

export const MobileOverlayIconAndTitle = Template.bind({});
MobileOverlayIconAndTitle.args = {
  ...Default.args,
  variant: 'success-overlay',
  hasIcon: true,
  heading: 'Success',
  slotContent: '',
};
MobileOverlayIconAndTitle.parameters = {
  viewport: {
    defaultViewport: 'mobile',
  },
  docs: {
    description: {
      story:
        'This is a mobile overlay message with icon and title (mobile only). Resize the browser to see the mobile overlay, or toggle the viewport size in the Canvas view toolbar.',
    },
  },
};

export const MobileOverlayIconAndTitleAndMessage = Template.bind({});
MobileOverlayIconAndTitleAndMessage.args = {
  ...Default.args,
  variant: 'success-overlay',
  hasIcon: true,
  heading: 'Success',
  slotContent: '<p>Your submission was successful. Thank you.</p>',
};
MobileOverlayIconAndTitleAndMessage.parameters = {
  viewport: {
    defaultViewport: 'mobile',
  },
  docs: {
    description: {
      story:
        'This is a mobile overlay message with icon, title and message (mobile only). Resize the browser to see the mobile overlay, or toggle the viewport size in the Canvas view toolbar.',
    },
  },
};
