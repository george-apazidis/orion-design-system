import { removeEmptyLines, getStoryControlSettings } from '../../utils/storybook-utils';

export default {
  title: 'Components/orion-button',
  component: 'orion-button',
  parameters: {
    docs: {
      description: {
        component: 'Button is a clickable element that can be used to trigger actions. Additional documentation available at [orion.united.com](https://orion.united.com/)',
      },
    },
  },
  argTypes: {
    slotContentLabel: getStoryControlSettings('button label'),
    buttonWidth: getStoryControlSettings('button width'),
  },
};

const Template = (args) => removeEmptyLines(`
  <orion-button ${args.buttonWidth ? `style="--orion-button-width: ${args.buttonWidth};"` : ''}
    ${args.type ? `type="${args.type}"` : ''}
    ${args.variant ? `variant="${args.variant}"` : ''}
    ${args.disabled ? 'disabled' : ''}
    ${args.small ? 'small' : ''}
    ${args.sticky ? 'sticky' : ''}
    ${args.stickyMobile ? 'sticky-mobile' : ''}
    ${args.iconName ? `icon-name="${args.iconName}"` : ''}
    ${args.iconRight ? 'icon-right' : ''}
  >
    ${args.slotContentLabel}
  </orion-button>
`);

export const Default = Template.bind({});
Default.args = {
  variant: '',
  slotContentLabel: 'Button',
};
Default.parameters = {
  docs: {
    description: {
      story: 'The default state',
    },
  },
};

export const Primary = Template.bind({});
Primary.args = {
  ...Default.args,
  variant: 'primary',
  slotContentLabel: 'Primary',
};
Primary.parameters = {
  docs: {
    description: {
      story: 'The primary state',
    },
  },
};

export const Secondary = Template.bind({});
Secondary.args = {
  ...Default.args,
  variant: 'secondary',
  slotContentLabel: 'Secondary',
};
Secondary.parameters = {
  docs: {
    description: {
      story: 'The secondary state',
    },
  },
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  ...Default.args,
  variant: 'tertiary',
  slotContentLabel: 'Tertiary',
};
Tertiary.parameters = {
  docs: {
    description: {
      story: 'The tertiary state',
    },
  },
};

export const PrimaryDisabled = Template.bind({});
PrimaryDisabled.args = {
  ...Default.args,
  variant: 'primary',
  disabled: true,
  slotContentLabel: 'Primary',
};
PrimaryDisabled.parameters = {
  docs: {
    description: {
      story: 'The primary disabled state',
    },
  },
};

export const SecondaryDisabled = Template.bind({});
SecondaryDisabled.args = {
  ...Default.args,
  variant: 'secondary',
  disabled: true,
  slotContentLabel: 'Secondary',
};
SecondaryDisabled.parameters = {
  docs: {
    description: {
      story: 'The secondary disabled state',
    },
  },
};

export const TertiaryDisabled = Template.bind({});
TertiaryDisabled.args = {
  ...Default.args,
  variant: 'tertiary',
  disabled: true,
  slotContentLabel: 'Tertiary',
};
TertiaryDisabled.parameters = {
  docs: {
    description: {
      story: 'The tertiary disabled state',
    },
  },
};

export const PrimarySmall = Template.bind({});
PrimarySmall.args = {
  ...Default.args,
  variant: 'primary',
  small: true,
  slotContentLabel: 'Primary',
};
PrimarySmall.parameters = {
  docs: {
    description: {
      story: 'The small primary state',
    },
  },
};

export const SecondarySmall = Template.bind({});
SecondarySmall.args = {
  ...Default.args,
  variant: 'secondary',
  small: true,
  slotContentLabel: 'Secondary',
};
SecondarySmall.parameters = {
  docs: {
    description: {
      story: 'The small secondary state',
    },
  },
};

export const TertiarySmall = Template.bind({});
TertiarySmall.args = {
  ...Default.args,
  variant: 'tertiary',
  small: true,
  slotContentLabel: 'Tertiary',
};
TertiarySmall.parameters = {
  docs: {
    description: {
      story: 'The small tertiary state',
    },
  },
};

export const PrimarySmallDisabled = Template.bind({});
PrimarySmallDisabled.args = {
  ...Default.args,
  variant: 'primary',
  disabled: true,
  small: true,
  slotContentLabel: 'Primary',
};
PrimarySmallDisabled.parameters = {
  docs: {
    description: {
      story: 'The small primary disabled state',
    },
  },
};

export const SecondarySmallDisabled = Template.bind({});
SecondarySmallDisabled.args = {
  ...Default.args,
  variant: 'secondary',
  disabled: true,
  small: true,
  slotContentLabel: 'Secondary',
};
SecondarySmallDisabled.parameters = {
  docs: {
    description: {
      story: 'The small secondary disabled state',
    },
  },
};

export const TertiarySmallDisabled = Template.bind({});
TertiarySmallDisabled.args = {
  ...Default.args,
  variant: 'tertiary',
  disabled: true,
  small: true,
  slotContentLabel: 'Tertiary',
};
TertiarySmallDisabled.parameters = {
  docs: {
    description: {
      story: 'The small tertiary disabled state',
    },
  },
};

export const StickyPrimary = Template.bind({});
StickyPrimary.args = {
  ...Default.args,
  variant: 'primary',
  sticky: true,
  slotContentLabel: 'Primary',
};
StickyPrimary.parameters = {
  viewport: {
    defaultViewport: 'mobile',
  },
  docs: {
    description: {
      story:
        'Sticky primary button (mobile only). Resize the browser to see the mobile sticky button, or toggle the viewport size in the Canvas view toolbar. Use the `sticky-mobile` attribute to hide the button on desktop.',
    },
  },
};

export const StickySecondary = Template.bind({});
StickySecondary.args = {
  ...Default.args,
  variant: 'secondary',
  sticky: true,
  slotContentLabel: 'Secondary',
};
StickySecondary.parameters = {
  viewport: {
    defaultViewport: 'mobile',
  },
  docs: {
    description: {
      story:
        'Sticky secondary button (mobile only). Resize the browser to see the mobile sticky button, or toggle the viewport size in the Canvas view toolbar. Use the `sticky-mobile` attribute to hide the button on desktop.',
    },
  },
};

export const StickyPrimaryDisabled = Template.bind({});
StickyPrimaryDisabled.args = {
  ...Default.args,
  variant: 'primary',
  sticky: true,
  disabled: true,
  slotContentLabel: 'Primary',
};
StickyPrimaryDisabled.parameters = {
  viewport: {
    defaultViewport: 'mobile',
  },
  docs: {
    description: {
      story:
        'Sticky primary disabled button (mobile only). Resize the browser to see the mobile sticky button, or toggle the viewport size in the Canvas view toolbar. Use the `sticky-mobile` attribute to hide the button on desktop.',
    },
  },
};

export const StickySecondaryDisabled = Template.bind({});
StickySecondaryDisabled.args = {
  ...Default.args,
  variant: 'secondary',
  sticky: true,
  disabled: true,
  slotContentLabel: 'Secondary',
};
StickySecondaryDisabled.parameters = {
  viewport: {
    defaultViewport: 'mobile',
  },
  docs: {
    description: {
      story:
        'Sticky secondary disabled button (mobile only). Resize the browser to see the mobile sticky button, or toggle the viewport size in the Canvas view toolbar. Use the `sticky-mobile` attribute to hide the button on desktop.',
    },
  },
};

export const PrimaryWithIcon = Template.bind({});
PrimaryWithIcon.args = {
  ...Default.args,
  variant: 'primary',
  iconName: 'edit',
  slotContentLabel: 'Primary',
};
PrimaryWithIcon.parameters = {
  docs: {
    description: {
      story: 'The primary state with an icon',
    },
  },
};

export const SecondaryWithIcon = Template.bind({});
SecondaryWithIcon.args = {
  ...Default.args,
  variant: 'secondary',
  iconName: 'edit',
  slotContentLabel: 'Secondary',
};
SecondaryWithIcon.parameters = {
  docs: {
    description: {
      story: 'The secondary state with an icon',
    },
  },
};

export const TertiaryWithIcon = Template.bind({});
TertiaryWithIcon.args = {
  ...Default.args,
  variant: 'tertiary',
  iconName: 'edit',
  slotContentLabel: 'Tertiary',
};
TertiaryWithIcon.parameters = {
  docs: {
    description: {
      story: 'The tertiary state with an icon',
    },
  },
};

export const PrimaryWithIconDisabled = Template.bind({});
PrimaryWithIconDisabled.args = {
  ...Default.args,
  variant: 'primary',
  iconName: 'edit',
  disabled: true,
  slotContentLabel: 'Primary',
};
PrimaryWithIconDisabled.parameters = {
  docs: {
    description: {
      story: 'The primary disabled state with an icon',
    },
  },
};

export const SecondaryWithIconDisabled = Template.bind({});
SecondaryWithIconDisabled.args = {
  ...Default.args,
  variant: 'secondary',
  iconName: 'edit',
  disabled: true,
  slotContentLabel: 'Secondary',
};
SecondaryWithIconDisabled.parameters = {
  docs: {
    description: {
      story: 'The secondary disabled state with an icon',
    },
  },
};

export const TertiaryWithIconDisabled = Template.bind({});
TertiaryWithIconDisabled.args = {
  ...Default.args,
  variant: 'tertiary',
  iconName: 'edit',
  disabled: true,
  slotContentLabel: 'Tertiary',
};
TertiaryWithIconDisabled.parameters = {
  docs: {
    description: {
      story: 'The tertiary disabled state with an icon',
    },
  },
};

export const PrimaryWithIconRight = Template.bind({});
PrimaryWithIconRight.args = {
  ...Default.args,
  variant: 'primary',
  iconName: 'chevron_right',
  iconRight: true,
  slotContentLabel: 'Primary',
};
PrimaryWithIconRight.parameters = {
  docs: {
    description: {
      story: 'The primary state with an icon on the right',
    },
  },
};

export const SecondaryWithIconRight = Template.bind({});
SecondaryWithIconRight.args = {
  ...Default.args,
  variant: 'secondary',
  iconName: 'chevron_right',
  iconRight: true,
  slotContentLabel: 'Secondary',
};
SecondaryWithIconRight.parameters = {
  docs: {
    description: {
      story: 'The secondary state with an icon on the right',
    },
  },
};

export const TertiaryWithIconRight = Template.bind({});
TertiaryWithIconRight.args = {
  ...Default.args,
  variant: 'tertiary',
  iconName: 'chevron_right',
  iconRight: true,
  slotContentLabel: 'Tertiary',
};
TertiaryWithIconRight.parameters = {
  docs: {
    description: {
      story: 'The tertiary state with an icon on the right',
    },
  },
};

export const PrimaryWithIconRightDisabled = Template.bind({});
PrimaryWithIconRightDisabled.args = {
  ...Default.args,
  variant: 'primary',
  iconName: 'chevron_right',
  iconRight: true,
  disabled: true,
  slotContentLabel: 'Primary',
};
PrimaryWithIconRightDisabled.parameters = {
  docs: {
    description: {
      story: 'The primary disabled state with an icon on the right',
    },
  },
};

export const SecondaryWithIconRightDisabled = Template.bind({});
SecondaryWithIconRightDisabled.args = {
  ...Default.args,
  variant: 'secondary',
  iconName: 'chevron_right',
  iconRight: true,
  disabled: true,
  slotContentLabel: 'Secondary',
};
SecondaryWithIconRightDisabled.parameters = {
  docs: {
    description: {
      story: 'The secondary disabled state with an icon on the right',
    },
  },
};

export const TertiaryWithIconRightDisabled = Template.bind({});
TertiaryWithIconRightDisabled.args = {
  ...Default.args,
  variant: 'tertiary',
  iconName: 'chevron_right',
  iconRight: true,
  disabled: true,
  slotContentLabel: 'Tertiary',
};
TertiaryWithIconRightDisabled.parameters = {
  docs: {
    description: {
      story: 'The tertiary disabled state with an icon on the right',
    },
  },
};

export const PrimaryIconOnly = Template.bind({});
PrimaryIconOnly.args = {
  ...Default.args,
  variant: 'primary',
  iconName: 'movies',
  slotContentLabel: '',
  buttonWidth: 'fit-content',
};
PrimaryIconOnly.parameters = {
  docs: {
    description: {
      story: 'The primary state with an icon only',
    },
  },
};

export const SecondaryIconOnly = Template.bind({});
SecondaryIconOnly.args = {
  ...Default.args,
  variant: 'secondary',
  iconName: 'movies',
  slotContentLabel: '',
  buttonWidth: 'fit-content',
};
SecondaryIconOnly.parameters = {
  docs: {
    description: {
      story: 'The secondary state with an icon only',
    },
  },
};

export const TertiaryIconOnly = Template.bind({});
TertiaryIconOnly.args = {
  ...Default.args,
  variant: 'tertiary',
  iconName: 'movies',
  slotContentLabel: '',
  buttonWidth: 'fit-content',
};
TertiaryIconOnly.parameters = {
  docs: {
    description: {
      story: 'The tertiary state with an icon only',
    },
  },
};

export const PrimaryIconOnlyDisabled = Template.bind({});
PrimaryIconOnlyDisabled.args = {
  ...Default.args,
  variant: 'primary',
  iconName: 'movies',
  slotContentLabel: '',
  buttonWidth: 'fit-content',
  disabled: true,
};
PrimaryIconOnlyDisabled.parameters = {
  docs: {
    description: {
      story: 'The primary disabled state with an icon only',
    },
  },
};

export const SecondaryIconOnlyDisabled = Template.bind({});
SecondaryIconOnlyDisabled.args = {
  ...Default.args,
  variant: 'secondary',
  iconName: 'movies',
  slotContentLabel: '',
  buttonWidth: 'fit-content',
  disabled: true,
};
SecondaryIconOnlyDisabled.parameters = {
  docs: {
    description: {
      story: 'The secondary disabled state with an icon only',
    },
  },
};

export const TertiaryIconOnlyDisabled = Template.bind({});
TertiaryIconOnlyDisabled.args = {
  ...Default.args,
  variant: 'tertiary',
  iconName: 'movies',
  slotContentLabel: '',
  buttonWidth: 'fit-content',
  disabled: true,
};
TertiaryIconOnlyDisabled.parameters = {
  docs: {
    description: {
      story: 'The tertiary disabled state with an icon only',
    },
  },
};

export const PrimaryIconOnlySmall = Template.bind({});
PrimaryIconOnlySmall.args = {
  ...Default.args,
  variant: 'primary',
  iconName: 'movies',
  slotContentLabel: '',
  buttonWidth: 'fit-content',
  small: true,
};
PrimaryIconOnlySmall.parameters = {
  docs: {
    description: {
      story: 'The primary state with an icon only and small size',
    },
  },
};

export const SecondaryIconOnlySmall = Template.bind({});
SecondaryIconOnlySmall.args = {
  ...Default.args,
  variant: 'secondary',
  iconName: 'movies',
  slotContentLabel: '',
  buttonWidth: 'fit-content',
  small: true,
};
SecondaryIconOnlySmall.parameters = {
  docs: {
    description: {
      story: 'The secondary state with an icon only and small size',
    },
  },
};

export const TertiaryIconOnlySmall = Template.bind({});
TertiaryIconOnlySmall.args = {
  ...Default.args,
  variant: 'tertiary',
  iconName: 'movies',
  slotContentLabel: '',
  buttonWidth: 'fit-content',
  small: true,
};
TertiaryIconOnlySmall.parameters = {
  docs: {
    description: {
      story: 'The tertiary state with an icon only and small size',
    },
  },
};

export const PrimaryIconOnlySmallDisabled = Template.bind({});
PrimaryIconOnlySmallDisabled.args = {
  ...Default.args,
  variant: 'primary',
  iconName: 'movies',
  slotContentLabel: '',
  buttonWidth: 'fit-content',
  small: true,
  disabled: true,
};
PrimaryIconOnlySmallDisabled.parameters = {
  docs: {
    description: {
      story: 'The primary disabled state with an icon only and small size',
    },
  },
};

export const SecondaryIconOnlySmallDisabled = Template.bind({});
SecondaryIconOnlySmallDisabled.args = {
  ...Default.args,
  variant: 'secondary',
  iconName: 'movies',
  slotContentLabel: '',
  buttonWidth: 'fit-content',
  small: true,
  disabled: true,
};
SecondaryIconOnlySmallDisabled.parameters = {
  docs: {
    description: {
      story: 'The secondary disabled state with an icon only and small size',
    },
  },
};

export const TertiaryIconOnlySmallDisabled = Template.bind({});
TertiaryIconOnlySmallDisabled.args = {
  ...Default.args,
  variant: 'tertiary',
  iconName: 'movies',
  slotContentLabel: '',
  buttonWidth: 'fit-content',
  small: true,
  disabled: true,
};
TertiaryIconOnlySmallDisabled.parameters = {
  docs: {
    description: {
      story: 'The tertiary disabled state with an icon only and small size',
    },
  },
};
