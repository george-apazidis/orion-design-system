import { removeEmptyLines, getStoryControlSettings } from '../../utils/storybook-utils';

export default {
  title: 'Modules/orion-drawer',
  component: 'orion-drawer',
  parameters: {
    docs: {
      description: {
        component:
          'Drawer is a component that allows users to display content in a temporary sidebar. Additional documentation available at [orion.united.com](https://orion.united.com/)',
      },
    },
  },
  // Configuring the these Storybook only controls to appear under
  // the same category in the ArgsTable
  argTypes: {
    showTitleSlot: getStoryControlSettings('orion-drawer-title'),
    showBodySlot: getStoryControlSettings('orion-drawer-body'),
    showFooterSlot: getStoryControlSettings('orion-drawer-footer-content'),
    showSecondaryButtonSlot: getStoryControlSettings('orion-drawer-secondary-button'),
    showPrimaryButtonSlot: getStoryControlSettings('orion-drawer-primary-button'),
    slotContentTitle: getStoryControlSettings('title'),
    slotContentBody: getStoryControlSettings('body'),
    slotContentFooter: getStoryControlSettings('footer'),
    slotContentSecondaryButton: getStoryControlSettings('secondary button'),
    slotContentPrimaryButton: getStoryControlSettings('primary button'),
  },
};

const Template = (args) => removeEmptyLines(`
  <orion-button>Open drawer</orion-button>

  <orion-drawer id="drawer1"

    ${args.openFrom ? `open-from="${args.openFrom}"` : ''}
    ${args.isOpen ? 'is-open' : ''}
  >

    ${
  args.showTitleSlot
    ? `<span slot="orion-drawer-title">
      ${args.slotContentTitle}
    </span>`
    : ''
}

    ${
  args.showBodySlot
    ? `
    <div slot="orion-drawer-body">
      ${args.slotContentBody}
    </div>
      `
    : ''
}

    ${
  args.showFooterSlot
    ? `
      <span slot="orion-drawer-footer-content">
        ${args.slotContentFooter}
      </span>
      `
    : ''
}

    ${
  args.showSecondaryButtonSlot
    ? `
      <span slot="orion-drawer-secondary-button">
        ${args.slotContentSecondaryButton}
      </span>
      `
    : ''
}

    ${
  args.showPrimaryButtonSlot
    ? `
      <span slot="orion-drawer-primary-button">
        ${args.slotContentPrimaryButton}
      </span>
      `
    : ''
}
  </orion-drawer>

  <script>
  (function () {

    const trigger = document.querySelector('orion-button');

    trigger.onclick = () => {
      const drawer = document.querySelector('orion-drawer');
      drawer.isOpen = !drawer.isOpen;
    };
  })()
  </script>

  <script>
  (function () {
      document.getElementById('drawer1').addEventListener('orionDrawerFooterBtnClicked', ev => {
      if (ev.detail.variant === 'primary') {
        console.log('primary button clicked');
      }

      if (ev.detail.variant === 'secondary') {
        console.log('secondary button clicked');
      }
    })
  })()
</script>
`);

export const Default = Template.bind({});
Default.args = {
  isOpen: false,
  showTitleSlot: true,
  showBodySlot: true,
  showFooterSlot: false,
  showSecondaryButtonSlot: true,
  showPrimaryButtonSlot: true,
  slotContentTitle: 'Drawer title',
  slotContentBody: 'Lorem ipsum dolor sit amet, consetetur adipisicing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.',
  slotContentFooter: 'Optional footer content',
  slotContentSecondaryButton: 'Secondary',
  slotContentPrimaryButton: 'Primary',
};

export const OpenFromLeft = Template.bind({});
OpenFromLeft.args = {
  ...Default.args,
  openFrom: 'left',
};

export const OpenFromBottom = Template.bind({});
OpenFromBottom.args = {
  ...Default.args,
  openFrom: 'bottom',
};
