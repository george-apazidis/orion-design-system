import { removeEmptyLines, getStoryControlSettings } from '../../utils/storybook-utils';

export default {
  title: 'Components/orion-link',
  component: 'orion-link',
  parameters: {
    docs: {
      description: {
        component:
          'Link is an accessible element used for navigation. It is also known as `Anchor`, `<a>`, `Text Link` or `Hyperlink`. Using an `<a>` tag is an acceptable way to render a text link, but this component is also available with additional options. This component is styled to resemble a hyperlink and semantically renders an `<a>`. Links are visually similar to tertiary buttons, but are semantically different, which matters for accessibility. Use a link when you want to navigate the user to a different location. Use a button when you want to cause a change in either back-end or the front-end of the website. (A "Log in" link will navigate the user to a form, a "Log in" button will submit the form and log the user into the application.). Additional documentation available at [orion.united.com](https://orion.united.com/)',
      },
    },
  },
  argTypes: {
    slotContentLabel: getStoryControlSettings('link text'),
    iconLeftPosition: getStoryControlSettings('iconLeftPosition'),
    iconTopPosition: getStoryControlSettings('iconTopPosition'),
  },
};

const Template = (args) => removeEmptyLines(`
    <orion-link 
    ${args.href ? `href="${args.href}"` : ''}
    ${args.disabled ? 'disabled' : ''}
    ${args.target ? `target="${args.target}"` : ''}
    ${args.rel ? `rel="${args.rel}"` : ''}
    ${args.download ? `download="${args.download}"` : ''}
    ${args.iconName ? `icon-name="${args.iconName}"` : ''}
    ${args.iconLeft ? 'icon-left' : ''}
    ${args.noUnderline ? 'no-underline' : ''}
    ${args.iconTopPosition ? `style="--orion-link-icon-top: ${args.iconTopPosition};"` : ''}
    ${args.iconLeftPosition ? `style="--orion-link-icon-left: ${args.iconLeftPosition};"` : ''}
    >
      ${args.slotContentLabel}
    </orion-link>
  `);

export const Default = Template.bind({});
Default.args = {
  slotContentLabel: 'Text link',
  href: '#',
};
Default.parameters = {
  docs: {
    description: {
      story: 'The default state',
    },
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true,
};
Disabled.parameters = {
  docs: {
    description: {
      story: 'The disabled state. The link is not clickable. A link can be disabled by removing the `href` or adding the `disabled` prop.',
    },
  },
};

export const withIcon = Template.bind({});
withIcon.args = {
  ...Default.args,
  iconName: 'chevron_right',
  iconTopPosition: '2px',
};
withIcon.parameters = {
  docs: {
    description: {
      story: 'The link with an icon',
    },
  },
};

export const withIconDisabled = Template.bind({});
withIconDisabled.args = {
  ...Default.args,
  href: '',
  iconName: 'detach',
  iconTopPosition: '1px',
};
withIconDisabled.parameters = {
  docs: {
    description: {
      story: 'The link with an icon and disabled. The link is not clickable. A link can be disabled by removing the `href` or adding the `disabled` prop.',
    },
  },
};

export const withIconLeft = Template.bind({});
withIconLeft.args = {
  ...Default.args,
  iconName: 'chevron_left',
  iconLeft: true,
  iconTopPosition: '2px',
  iconLeftPosition: '-4px',
};
withIconLeft.parameters = {
  docs: {
    description: {
      story: 'The link with an icon on the left',
    },
  },
};

export const noUnderline = Template.bind({});
noUnderline.args = {
  ...Default.args,
  noUnderline: true,
};
noUnderline.parameters = {
  docs: {
    description: {
      story:
        'The link without underline. This style should only be used when the placement and context of the link is explicit enough that a visible underline is not necessary. Color alone is not enough context to meet accessibility requirements. Commonly used in footer navigation.',
    },
  },
};
