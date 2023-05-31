import { removeEmptyLines, getStoryControlSettings } from '../../utils/storybook-utils';

export default {
  title: 'Modules/orion-header',
  component: 'orion-header',
  parameters: {
    docs: {
      description: {
        component: `The header component spans the full width of the viewport and is the topmost element in the UI shell. It typically contains the product logo, navigation, and other utilities. Use the orion-nav-button component for icon buttons in the header. Additional documentation available at <a href="https://orion.united.com/">orion.united.com</a>`,
      },
    },
  },
  // Configuring the these Storybook only controls to appear under
  // the same category in the ArgsTable
  argTypes: {
    // header left slot content
    slotContentHeaderLeft: getStoryControlSettings('header-left'),
    // header center slot content
    slotContentHeaderCenter: getStoryControlSettings('header-center'),
    // header right slot content
    slotContentHeaderRight: getStoryControlSettings('header-right'),
    // default slot content
    slotContent: getStoryControlSettings('default slot content'),
    // header styles
    slotStyle: getStoryControlSettings('css variables'),
    // subheader slot content
    slotContentSubheader: getStoryControlSettings('subheader'),
    // nav menu slot content
    slotContentNavMenu: getStoryControlSettings('nav menu'),
  },
};

const Template = (args) => removeEmptyLines(`
  <orion-header
    ${args.heading ? `heading="${args.heading}"` : ''}
    ${args.subheading ? `subheading="${args.subheading}"` : ''}
    ${args.headingPlacement ? `heading-placement="${args.headingPlacement}"` : ''}
    ${args.noLogo ? 'no-logo' : ''}
    ${args.logoHref ? `logo-href="${args.logoHref}"` : ''}
    ${args.logoAlt ? `logo-alt="${args.logoAlt}"` : ''}
    ${args.logoPlacement ? `logo-placement="${args.logoPlacement}"` : ''}
    ${args.slotStyle ? `style="${args.slotStyle}"` : ''}
  >
    ${args.slotContentHeaderLeft ? `<span slot="orion-header-left">${args.slotContentHeaderLeft}</span>` : ''}
    ${args.slotContentHeaderCenter ? `<span slot="orion-header-center">${args.slotContentHeaderCenter}</span>` : ''}
    ${args.slotContentHeaderRight ? `<span slot="orion-header-right">${args.slotContentHeaderRight}</span>` : ''}
    ${args.slotContent ? `${args.slotContent}` : ''}
  </orion-header>
  ${args.slotContentSubheader ? `
    ${args.slotContentSubheader}
    <script>
    (function () {
      const trigger = document.querySelector('#toggle-subheader');

      trigger.onclick = () => {
        const subheader = document.querySelector('orion-subheader');
        const btnSubheader = document.querySelector('#toggle-subheader');
        subheader.isOpen = !subheader.isOpen;
        btnSubheader.isActive = !btnSubheader.isActive;
      };

      const subheader = document.querySelector('orion-subheader');
      subheader.addEventListener('subheaderClose', () => {
        const btnSubheader = document.querySelector('#toggle-subheader');
        btnSubheader.isActive = false;
      });
    })()
  </script>
  ` : ''}
  ${args.slotContentNavMenu ? `
    ${args.slotContentNavMenu}
    <script>
    (function () {
      const trigger = document.querySelector('#toggle-nav-menu');

      trigger.onclick = () => {
        const navMenu = document.querySelector('orion-nav-menu');
        const btnNavMenu = document.querySelector('#toggle-nav-menu');
        navMenu.isOpen = !navMenu.isOpen;
        btnNavMenu.isActive = !btnNavMenu.isActive;
      };

      const navMenu = document.querySelector('orion-nav-menu');
      navMenu.addEventListener('navMenuClose', () => {
        const btnNavMenu = document.querySelector('#toggle-nav-menu');
        btnNavMenu.isActive = false;
      });
    })()
  </script>
  ` : ''}
  `
);

export const Default = Template.bind({});
Default.args = {
  slotContentHeaderLeft: '',
  slotContentHeaderCenter: '',
  slotContentHeaderRight: '',
  slotContent: '',
  slotStyle: '',
};
Default.parameters = {
  docs: {
    description: {
      story: 'The default state',
    },
  },
};

export const WithHeading = Template.bind({});
WithHeading.args = {
  ...Default.args,
  heading: 'App/page text',
};
WithHeading.parameters = {
  docs: {
    description: {
      story: 'The header can have a heading',
    },
  },
};

export const WithSubheading = Template.bind({});
WithSubheading.args = {
  ...Default.args,
  heading: 'App/page text',
  subheading: 'Subheading text',
};
WithSubheading.parameters = {
  docs: {
    description: {
      story: 'The header can have a subheading',
    },
  },
};

export const LogoCentered = Template.bind({});
LogoCentered.args = {
  ...Default.args,
  logoPlacement: 'center',
};
LogoCentered.parameters = {
  docs: {
    description: {
      story: 'The logo can be centered',
    },
  },
};

export const LogoRight = Template.bind({});
LogoRight.args = {
  ...Default.args,
  logoPlacement: 'right',
};
LogoRight.parameters = {
  docs: {
    description: {
      story: 'The logo can be right aligned',
    },
  },
};

export const HeadingCenterNoLogo = Template.bind({});
HeadingCenterNoLogo.args = {
  ...Default.args,
  heading: 'Application text',
  headingPlacement: 'center',
  noLogo: true,
};
HeadingCenterNoLogo.parameters = {
  docs: {
    description: {
      story: 'The header can have text centered and no logo',
    },
  },
};

export const HeadingLeft = Template.bind({});
HeadingLeft.args = {
  ...Default.args,
  heading: 'Application text',
  headingPlacement: 'left',
  noLogo: true,
};
HeadingLeft.parameters = {
  docs: {
    description: {
      story: 'The header can have text left aligned',
    },
  },
};

export const WithIconButtons = Template.bind({});
WithIconButtons.args = {
  ...Default.args,
  slotContentHeaderLeft: `<orion-nav-button icon-name="menu"></orion-nav-button>`,
  slotContentHeaderRight: `<orion-nav-button icon-name="search"></orion-nav-button>`,
};
WithIconButtons.parameters = {
  docs: {
    description: {
      story: 'The header can have icon buttons',
    },
  },
};

export const IconButtonsWithLabels = Template.bind({});
IconButtonsWithLabels.args = {
  ...Default.args,
  slotContentHeaderLeft: `<orion-nav-button icon-name="menu">Menu</orion-nav-button>`,
  slotContentHeaderRight: `<orion-nav-button icon-name="search" label-position="left">Search</orion-nav-button>`,
};
IconButtonsWithLabels.parameters = {
  docs: {
    description: {
      story: 'The header can have icon buttons with labels',
    },
  },
};

export const TwoRightButtons = Template.bind({});
TwoRightButtons.args = {
  ...Default.args,
  slotContentHeaderLeft: `
      <orion-nav-button icon-name="menu"></orion-nav-button>
    `,
  slotContentHeaderRight: `
      <orion-nav-button icon-name="notifications" label-position="left"></orion-nav-button>
      <orion-nav-button icon-name="search" label-position="left"></orion-nav-button>
    `,
};
TwoRightButtons.parameters = {
  docs: {
    description: {
      story: 'The header can have two buttons on the right side of the header',
    },
  },
};

export const WithSubheaderComponent = Template.bind({});
WithSubheaderComponent.args = {
  ...Default.args,
  slotContentHeaderLeft: '',
  slotContentHeaderRight: `
      <orion-nav-button icon-name="search" label-position="left" id="toggle-subheader"></orion-nav-button>
    `,
  slotContentSubheader: `
  <orion-subheader has-close-icon>
    <span slot="orion-subheader-left">
      <i class="orion-icon orion-icon-search" style="font-size: 24px;"></i>
      <h3 style="font-weight: 600;">Search</h3>
      <orion-text-input placeholder="Search for a fare" style="width: 190px;"></orion-text-input>
    </span>
  </orion-subheader>
  `,
};
WithSubheaderComponent.parameters = {
  docs: {
    description: {
      story: 'The header can be used with a subheader component',
    },
  },
};

export const WithNavMenuComponent = Template.bind({});
WithNavMenuComponent.args = {
  ...Default.args,
  slotContentHeaderLeft: `
      <orion-nav-button icon-name="menu" id="toggle-nav-menu"></orion-nav-button>
    `,
  slotContentHeaderRight: '',
  slotContentNavMenu: `
  <orion-nav-menu id="nav-menu"
    has-close-icon
  >
    <span slot="orion-nav-menu-title">
      Menu title
    </span>
  </orion-nav-menu>
  `,
};
WithNavMenuComponent.parameters = {
  docs: {
    description: {
      story: 'The header can be used with a nav menu component',
    },
  },
};
