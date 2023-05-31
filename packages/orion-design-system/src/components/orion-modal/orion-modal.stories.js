import { removeEmptyLines, getStoryControlSettings } from '../../utils/storybook-utils';

export default {
  title: 'Modules/orion-modal',
  parameters: {
    docs: {
      description: {
        component:
          'Modal is a component that displays a modal dialog. It is used to display content that requires user interaction. Additional documentation available at [orion.united.com](https://orion.united.com/)',
      },
    },
    // Listen to the "keyup" and "orionModalFooterBtnClicked" events in the Actions tab
    actions: {
      handles: ['keyup', 'orionModalFooterBtnClicked', 'modalClose'],
    },
  },
  component: 'orion-modal',
  // Configuring the these Storybook only controls to appear under
  // the same category in the ArgsTable
  argTypes: {
    showTitleSlot: getStoryControlSettings('orion-modal-title'),
    showBodySlot: getStoryControlSettings('orion-modal-body'),
    showSecondaryButtonSlot: getStoryControlSettings('orion-modal-secondary-button'),
    showPrimaryButtonSlot: getStoryControlSettings('orion-modal-primary-button'),
    showFooterLeftSlot: getStoryControlSettings('orion-modal-footer-left'),
    showFooterCenterSlot: getStoryControlSettings('orion-modal-footer-center'),
    showFooterRightSlot: getStoryControlSettings('orion-modal-footer-right'),
    slotContentIcon: getStoryControlSettings('icon'),
    slotContentTitle: getStoryControlSettings('title'),
    slotContentBody: getStoryControlSettings('body'),
    slotContentSecondaryButton: getStoryControlSettings('secondary button'),
    slotContentPrimaryButton: getStoryControlSettings('primary button'),
    slotContentFooterLeft: getStoryControlSettings('footer left'),
    slotContentFooterCenter: getStoryControlSettings('footer center'),
    slotContentFooterRight: getStoryControlSettings('footer right'),
  },
};

const Template = (args) => removeEmptyLines(`
  <orion-button>Open modal</orion-button>

  <orion-modal
    ${args.hasIcon ? 'has-icon' : ''}
    ${args.iconName ? `icon-name="${args.iconName}"` : ''}
    ${args.hasCancelIcon ? 'has-cancel-icon' : ''}
    ${args.isFullscreen ? 'is-fullscreen' : ''}
    ${args.isOpen ? 'is-open' : ''}
    ${args.isTitleCentered ? 'is-title-centered' : ''}
  >
    ${
  args.showTitleSlot
    ? `<span slot="orion-modal-title">
      ${args.slotContentTitle}
    </span>`
    : ''
}

    ${
  args.showBodySlot
    ? `
    <div slot="orion-modal-body">
      ${args.slotContentBody}
    </div>
      `
    : ''
}

    ${
  args.showSecondaryButtonSlot
    ? `
    <span slot="orion-modal-secondary-button">
      ${args.slotContentSecondaryButton}
    </span>
    `
    : ''
}

    ${
  args.showPrimaryButtonSlot
    ? `
    <span slot="orion-modal-primary-button">
      ${args.slotContentPrimaryButton}
    </span>
    `
    : ''
}

    ${
  args.showFooterLeftSlot
    ? `
    <span slot="orion-modal-footer-left">
      ${args.slotContentFooterLeft}
    </span>
    `
    : ''
}

    ${
  args.showFooterCenterSlot
    ? `
    <span slot="orion-modal-footer-center">
      ${args.slotContentFooterCenter}
    </span>
    `
    : ''
}

    ${
  args.showFooterRightSlot
    ? `
    <span slot="orion-modal-footer-right">
      ${args.slotContentFooterRight}
    </span>
    `
    : ''
}
  </orion-modal>

  <script>
  (function () {
    const trigger = document.querySelector('orion-button');

    trigger.onclick = () => {
      const modal = document.querySelector('orion-modal');
      modal.isOpen = !modal.isOpen;
    };
  })()
  </script>
`);

export const Default = Template.bind({});
Default.args = {
  hasCancelIcon: false,
  isFullscreen: false,
  isOpen: false,
  showTitleSlot: true,
  showBodySlot: true,
  showSecondaryButtonSlot: false,
  showPrimaryButtonSlot: true,
  slotContentTitle: 'Modal title',
  slotContentBody: 'Lorem ipsum dolor sit amet, consetetur adipisicing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.',
  slotContentSecondaryButton: 'Secondary',
  slotContentPrimaryButton: 'Primary',
};
Default.parameters = {
  docs: {
    description: {
      story: 'The default modal.',
    },
  },
};

export const TitleOnlyOneButton = Template.bind({});
TitleOnlyOneButton.args = {
  ...Default.args,
  showBodySlot: false,
};
TitleOnlyOneButton.parameters = {
  docs: {
    description: {
      story: 'The modal with only the title and one button.',
    },
  },
};

export const TitleOnlyTwoButtons = Template.bind({});
TitleOnlyTwoButtons.args = {
  ...Default.args,
  showBodySlot: false,
  showSecondaryButtonSlot: true,
};
TitleOnlyTwoButtons.parameters = {
  docs: {
    description: {
      story: 'The modal with only the title and two buttons.',
    },
  },
};

export const MessageOnlyOneButton = Template.bind({});
MessageOnlyOneButton.args = {
  ...Default.args,
  showTitleSlot: false,
};
MessageOnlyOneButton.parameters = {
  docs: {
    description: {
      story: 'The modal with only the message and one button.',
    },
  },
};

export const MessageOnlyTwoButtons = Template.bind({});
MessageOnlyTwoButtons.args = {
  ...Default.args,
  showTitleSlot: false,
  showSecondaryButtonSlot: true,
};
MessageOnlyTwoButtons.parameters = {
  docs: {
    description: {
      story: 'The modal with only the message and two buttons.',
    },
  },
};

export const TitleAndMessageOneButton = Template.bind({});
TitleAndMessageOneButton.args = {
  ...Default.args,
};
TitleAndMessageOneButton.parameters = {
  docs: {
    description: {
      story: 'The modal with the title, message and one button.',
    },
  },
};

export const TitleAndMessageTwoButtons = Template.bind({});
TitleAndMessageTwoButtons.args = {
  ...Default.args,
  showSecondaryButtonSlot: true,
};
TitleAndMessageTwoButtons.parameters = {
  docs: {
    description: {
      story: 'The modal with the title, message and two buttons.',
    },
  },
};

export const IconTitleAndMessageOneButton = Template.bind({});
IconTitleAndMessageOneButton.args = {
  ...Default.args,
  hasIcon: true,
  iconName: 'alert',
};
IconTitleAndMessageOneButton.parameters = {
  docs: {
    description: {
      story: 'The modal with the icon, title, message and one button.',
    },
  },
};

export const IconTitleAndMessageTwoButtons = Template.bind({});
IconTitleAndMessageTwoButtons.args = {
  ...Default.args,
  hasIcon: true,
  iconName: 'alert',
  showSecondaryButtonSlot: true,
};
IconTitleAndMessageTwoButtons.parameters = {
  docs: {
    description: {
      story: 'The modal with the icon, title, message and two buttons.',
    },
  },
};

export const HasCancelIcon = Template.bind({});
HasCancelIcon.args = {
  ...Default.args,
  hasIcon: true,
  iconName: 'alert',
  showSecondaryButtonSlot: true,
  hasCancelIcon: true,
};
HasCancelIcon.parameters = {
  docs: {
    description: {
      story: 'The modal with a cancel icon.',
    },
  },
};

export const Fullscreen = Template.bind({});
Fullscreen.args = {
  ...Default.args,
  hasIcon: true,
  iconName: 'alert',
  showSecondaryButtonSlot: true,
  hasCancelIcon: true,
  isFullscreen: true,
  slotContentBody: `
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nullam non nisi est sit amet facilisis magna etiam. Turpis in eu mi bibendum neque. Sapien faucibus et molestie ac. Blandit libero volutpat sed cras ornare arcu dui. Cursus metus aliquam eleifend mi. Luctus venenatis lectus magna fringilla urna porttitor. Ut tellus elementum sagittis vitae et. Congue eu consequat ac felis donec et odio pellentesque diam. At auctor urna nunc id cursus metus aliquam eleifend mi. Id volutpat lacus laoreet non curabitur gravida arcu ac. Volutpat blandit aliquam etiam erat velit scelerisque in dictum.</p><p>Blandit libero volutpat sed cras ornare arcu. Tellus orci ac auctor augue. Tortor aliquam nulla facilisi cras. Mauris pellentesque pulvinar pellentesque habitant morbi. Erat velit scelerisque in dictum non consectetur a. Faucibus turpis in eu mi bibendum. Suspendisse sed nisi lacus sed viverra. Nulla facilisi etiam dignissim diam quis enim lobortis scelerisque. Adipiscing elit pellentesque habitant morbi tristique senectus et netus. Volutpat ac tincidunt vitae semper quis lectus nulla. Praesent semper feugiat nibh sed pulvinar proin gravida hendrerit. Integer vitae justo eget magna. Vitae justo eget magna fermentum iaculis. Suspendisse in est ante in nibh mauris cursus mattis. Ac odio tempor orci dapibus ultrices. Quis ipsum suspendisse ultrices gravida dictum fusce ut placerat. Eget egestas purus viverra accumsan in nisl. Elit scelerisque mauris pellentesque pulvinar pellentesque habitant.</p><p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames. Id cursus metus aliquam eleifend mi. Morbi quis commodo odio aenean sed adipiscing diam. Velit euismod in pellentesque massa placerat. Mauris pellentesque pulvinar pellentesque habitant morbi. Tellus mauris a diam maecenas sed enim ut sem viverra. Quis hendrerit dolor magna eget est lorem ipsum. Nunc sed id semper risus in hendrerit gravida rutrum. Cursus vitae congue mauris rhoncus aenean. Leo duis ut diam quam nulla porttitor massa.</p>`,
};
Fullscreen.parameters = {
  docs: {
    description: {
      story: 'The fullscreen modal is 100% of the viewport height and width in mobile. In desktop, it is 80% of the viewport height and width.',
    },
  },
};

export const CustomFooter = Template.bind({});
CustomFooter.args = {
  ...Default.args,
  showPrimaryButtonSlot: false,
  hasCancelIcon: true,
  isFullscreen: true,
  showFooterLeftSlot: true,
  showFooterCenterSlot: true,
  showFooterRightSlot: true,
  slotContentFooterLeft: '<orion-button variant="tertiary" icon-name="chevron_left">Previous</orion-button>',
  slotContentFooterCenter: '3 of 5',
  slotContentFooterRight: '<orion-button variant="tertiary" icon-name="chevron_right" icon-right>Next</orion-button>',
};
CustomFooter.parameters = {
  docs: {
    description: {
      story: 'The modal with a custom footer.',
    },
  },
};
