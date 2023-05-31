import { removeEmptyLines, getStoryControlSettings } from '../../utils/storybook-utils';

export default {
  title: 'Modules/orion-subheader',
  component: 'orion-subheader',
  parameters: {
    docs: {
      description: {
        component: 'The subheader component spans the full width of the viewport and is the second element in the UI shell. Additional documentation available at <a href="https://orion.united.com/">orion.united.com</a>',
      },
    },
  },
  // Configuring the these Storybook only controls to appear under
  // the same category in the ArgsTable
  argTypes: {
    // subheader left slot content
    slotContentSubheaderLeft: getStoryControlSettings('orion-subheader-left'),
    // subheader center slot content
    slotContentSubheaderCenter: getStoryControlSettings('orion-subheader-center'),
    // subheader right slot content
    slotContentSubheaderRight: getStoryControlSettings('orion-subheader-right'),
    // default slot content
    slotContent: getStoryControlSettings('default slot content'),
    // subheader style
    slotStyle: getStoryControlSettings('css variables'),
  },
};

const Template = (args) => removeEmptyLines(`
  <orion-button id="toggle-subheader">Open/close subheader</orion-button>
  <orion-subheader 
    ${args.isOpen ? 'is-open' : ''}
    ${args.hasCloseIcon ? 'has-close-icon' : ''}
    ${args.slotStyle ? `style="${args.slotStyle}"` : ''}
  >
    ${args.slotContentSubheaderLeft ? `
    <span slot="orion-subheader-left">
      ${args.slotContentSubheaderLeft}
    </span>
    ` : ''}
    ${args.slotContentSubheaderCenter ? `
    <span slot="orion-subheader-center">
      ${args.slotContentSubheaderCenter}
    </span>
    ` : ''}
    ${args.slotContentSubheaderRight ? `
    <span slot="orion-subheader-right">
      ${args.slotContentSubheaderRight}
    </span>
    ` : ''}
    ${args.slotContent ? `${args.slotContent}` : ''}
  </orion-subheader>

  <script>
  (function () {
    const trigger = document.querySelector('#toggle-subheader');

    trigger.onclick = () => {
      const subheader = document.querySelector('orion-subheader');
      subheader.isOpen = !subheader.isOpen;
    };
  })()
  </script>
`);

export const Default = Template.bind({});
Default.args = {
  slotContentSubheaderLeft: 'Subheader left',
  slotContentSubheaderCenter: 'Subheader center',
  slotContentSubheaderRight: 'Subheader right',
  isOpen: false,
  hasCloseIcon: false,
};
Default.parameters = {
  docs: {
    description: {
      story: 'The default subheader component',
    },
  },
};

export const HasCloseIcon = Template.bind({});
HasCloseIcon.args = {
  ...Default.args,
  hasCloseIcon: true,
  slotContentSubheaderLeft: `
      <i class="orion-icon orion-icon-search" style="font-size: 24px;"></i>
      <h3 style="font-weight: 600;">Search</h3>
      <orion-text-input placeholder="Search for a fare" style="width: 190px;"></orion-text-input>
  `,
  slotContentSubheaderCenter: '',
  slotContentSubheaderRight: '',
  slotContent: '',
};
HasCloseIcon.parameters = {
  docs: {
    description: {
      story: 'The subheader component with a close icon and form content',
    },
  },
};

export const CustomSubheader = Template.bind({});
CustomSubheader.args = {
  ...Default.args,
  slotContentSubheaderLeft: '',
  slotContentSubheaderCenter: '',
  slotContentSubheaderRight: '',
  slotContent: `
    <div class="orion-container-fluid">
      <div class="orion-row">
        <div class="orion-col-3 orion-col-xs-4">
          <orion-label>Station</orion-label>
          <orion-text-input placeholder="Station code"></orion-text-input>
        </div>
        <div class="orion-col-3 orion-col-xs-4">
          <orion-label>Zone</orion-label>
          <orion-dropdown placeholder="Select zone">
            <orion-dropdown-option value="1">Zone 1</orion-dropdown-option>
            <orion-dropdown-option value="2">Zone 2</orion-dropdown-option>
            <orion-dropdown-option value="3">Zone 3</orion-dropdown-option>
          </orion-dropdown>
        </div>
        <div class="orion-col-4 orion-is-hidden-mobile">
        </div>
        <div class="orion-col-2 orion-col-xs-4" style="align-self: flex-end;">
          <orion-button variant="primary">Filter flights</orion-button>
        </div>
      </div>
    </div>
  `,
  slotStyle: '--orion-subheader-bg-color: #fff; --orion-subheader-color:#333; --orion-subheader-vertical-align: flex-end;',
};
CustomSubheader.parameters = {
  docs: {
    description: {
      story: 'The subheader component with custom content and background color. Example uses the unnamed slot and the css grid system',
    },
  },
};
