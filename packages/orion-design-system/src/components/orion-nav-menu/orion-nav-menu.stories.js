/**
 * This function creates a Storybook ArgsTable settings object.
 * The goal is to organize the Storybook only controls under
 * the same category in the ArgsTable
 * @param {string} slotName
 */
const getTableSettings = slotName => ({
  description: `**NOT PART OF COMPONENT API**. Modify the \`${slotName}\` slot content in this storybook story`,
  table: {
    category: `Story Controls. Not component API`,
  },
});

export default {
  title: 'Modules/orion-nav-menu',
  component: 'orion-nav-menu',
  parameters: {
    docs: {
      description: {
        component: `The nav menu component enables the user to navigate throughout the website or application. Additional documentation available at <a href="https://orion.united.com/">orion.united.com</a>`,
      },
    },
  },
  // Configuring the these Storybook only controls to appear under
  // the same category in the ArgsTable
  argTypes: {
    // nav menu title slot content
    slotContentNavMenuTitle: getTableSettings('orion-nav-menu-title'),
    // nav menu body slot content
    slotContentNavMenuBody: getTableSettings('orion-nav-menu-body'),
    // nav menu style
    slotStyle: getTableSettings('css variables'),
  },
};

/**
 * This function will remove empty lines from the template string
 * @param {string} text
 * @returns {string} text without empty lines
 */
const removeEmptyLines = (text = '') =>
  text
    .split('\n')
    .filter(textPart => Boolean(textPart.trim()))
    .join('\n');

const Template = args =>
  removeEmptyLines(`
  <orion-button id="toggle-nav-menu">Open/close nav-menu</orion-button>

  <orion-nav-menu id="nav-menu"
    ${args.isOpen ? 'is-open' : ''}
    ${args.hasCloseIcon ? 'has-close-icon' : ''}
    ${args.hideHeaderDivider ? 'hide-header-divider' : ''}
    ${args.slotStyle ? `style="${args.slotStyle}"` : ''}
  >
    ${args.slotContentNavMenuTitle ? `
    <span slot="orion-nav-menu-title">
      ${args.slotContentNavMenuTitle}
    </span>
    ` : ''}
    ${args.slotContentNavMenuBody ? `
    <span slot="orion-nav-menu-body">
      ${args.slotContentNavMenuBody}
    </span>
    ` : ''}
  </orion-nav-menu>

  <script>
  (function () {
    const trigger = document.querySelector('#toggle-nav-menu');

    trigger.onclick = () => {
      const nav = document.querySelector('#nav-menu');
      nav.isOpen = !nav.isOpen;
    };
  })()
  </script>
`);

export const Default = Template.bind({});
Default.args = {
  slotContentNavMenuTitle: 'Menu title',
  slotContentNavMenuBody: '',
  isOpen: false,
  hasCloseIcon: false,
  hideHeaderDivider: false,
  slotStyle: '',
};
Default.parameters = {
  docs: {
    description: {
      story: 'The default nav menu',
    },
  },
};

export const WithCloseIcon = Template.bind({});
WithCloseIcon.args = {
  ...Default.args,
  hasCloseIcon: true,
};
WithCloseIcon.parameters = {
  docs: {
    description: {
      story: 'The nav menu with close icon',
    },
  },
};

export const NoMenuTitleWithCloseIcon = Template.bind({});
NoMenuTitleWithCloseIcon.args = {
  ...Default.args,
  slotContentNavMenuTitle: '',
  hasCloseIcon: true,
};
NoMenuTitleWithCloseIcon.parameters = {
  docs: {
    description: {
      story: 'The nav menu with close icon and no menu title',
    },
  },
};

export const NoMenuTitleNoCloseIcon = Template.bind({});
NoMenuTitleNoCloseIcon.args = {
  ...Default.args,
  slotContentNavMenuTitle: '',
  hasCloseIcon: false,
};
NoMenuTitleNoCloseIcon.parameters = {
  docs: {
    description: {
      story: 'The nav menu with no close icon and no menu title',
    },
  },
};
