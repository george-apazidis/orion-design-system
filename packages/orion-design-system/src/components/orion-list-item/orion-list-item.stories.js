import { removeEmptyLines, getStoryControlSettings } from '../../utils/storybook-utils';

export default {
  title: 'Components/orion-list-item',
  component: 'orion-list-item',
  parameters: {
    docs: {
      description: {
        component:
          'List item is a container for list items. It is also known as `li` or `List Item`. This component is styled to resemble a list item and semantically renders an `<li>`. Use in conjunction with `orion-list` component. Additional documentation available at [orion.united.com](https://orion.united.com/)',
      },
    },
  },
  argTypes: {
    slotContent: getStoryControlSettings('default slot'),
    showImageSlot: getStoryControlSettings('orion-list-item-image'),
    showHeadingSlot: getStoryControlSettings('orion-list-item-heading'),
    showSubheadingSlot: getStoryControlSettings('orion-list-item-subheading'),
    showBodySlot: getStoryControlSettings('orion-list-item-body'),
    slotContentListItemImage: getStoryControlSettings('orion-list-item-image'),
    slotContentListItemHeading: getStoryControlSettings('orion-list-item-heading'),
    slotContentListItemSubheading: getStoryControlSettings('orion-list-item-subheading'),
    slotContentListItemBody: getStoryControlSettings('orion-list-item-body'),
  },
};

const Template = (args) => removeEmptyLines(`
    <orion-list-item
      ${args.disabled ? 'disabled' : ''}
      ${args.hasMarker ? 'has-marker' : ''}
      ${args.hasIcon ? 'has-icon' : ''}
      ${args.iconName ? `icon-name="${args.iconName}"` : ''}
      ${args.hasTrailingIcon ? 'has-trailing-icon' : ''}
      ${args.trailingIconName ? `trailing-icon-name="${args.trailingIconName}"` : ''}
      ${args.href ? `href="${args.href}"` : ''}
    >
      ${args.showImageSlot ? `<span slot="orion-list-item-image">${args.slotContentListItemImage}</span>` : ''}
      ${args.showHeadingSlot ? `<span slot="orion-list-item-heading">${args.slotContentListItemHeading}</span>` : ''}
      ${args.showSubheadingSlot ? `<span slot="orion-list-item-subheading">${args.slotContentListItemSubheading}</span>` : ''}
      ${args.showBodySlot ? `<span slot="orion-list-item-body">${args.slotContentListItemBody}</span>` : ''}
      ${args.slotContent}
    </orion-list-item>
  `);

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  href: '',
  hasMarker: false,
  hasIcon: false,
  iconName: '',
  hasTrailingIcon: false,
  trailingIconName: '',
  slotContent: 'List item text',
  showImageSlot: false,
  showHeadingSlot: false,
  showSubheadingSlot: false,
  showBodySlot: false,
  slotContentListItemImage: '',
  slotContentListItemHeading: '',
  slotContentListItemSubheading: '',
  slotContentListItemBody: '',
};
Default.parameters = {
  docs: {
    description: {
      story: 'Default list item',
    },
  },
};

export const TitleOnly = Template.bind({});
TitleOnly.args = {
  ...Default.args,
  slotContent: '',
  showHeadingSlot: true,
  slotContentListItemHeading: 'List item title',
};
TitleOnly.parameters = {
  docs: {
    description: {
      story: 'List item with title only',
    },
  },
};

export const BodyOnly = Template.bind({});
BodyOnly.args = {
  ...Default.args,
  slotContent: '',
  showBodySlot: true,
  slotContentListItemBody: 'List item body',
};
BodyOnly.parameters = {
  docs: {
    description: {
      story: 'List item with body only',
    },
  },
};

export const TitleAndBody = Template.bind({});
TitleAndBody.args = {
  ...Default.args,
  slotContent: '',
  showHeadingSlot: true,
  slotContentListItemHeading: 'List item title',
  showBodySlot: true,
  slotContentListItemBody: 'Lorem ipsum dolor sit amet, consec tetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros.',
};
TitleAndBody.parameters = {
  docs: {
    description: {
      story: 'List item with title and body',
    },
  },
};

export const TitleAndSubtitle = Template.bind({});
TitleAndSubtitle.args = {
  ...Default.args,
  slotContent: '',
  showHeadingSlot: true,
  slotContentListItemHeading: 'List item title',
  showSubheadingSlot: true,
  slotContentListItemSubheading: 'List item subtitle',
};
TitleAndSubtitle.parameters = {
  docs: {
    description: {
      story: 'List item with title and subtitle',
    },
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true,
  slotContent: 'List item text',
};
Disabled.parameters = {
  docs: {
    description: {
      story: 'Disabled list item',
    },
  },
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  ...Default.args,
  hasIcon: true,
  iconName: 'location',
  slotContent: 'List item text',
};
WithIcon.parameters = {
  docs: {
    description: {
      story: 'List item with icon',
    },
  },
};

export const WithIconDisabled = Template.bind({});
WithIconDisabled.args = {
  ...Default.args,
  hasIcon: true,
  iconName: 'location',
  disabled: true,
  slotContent: '',
  showBodySlot: true,
  slotContentListItemBody: 'Lorem ipsum dolor sit amet, consec tetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros.',
};
WithIconDisabled.parameters = {
  docs: {
    description: {
      story: 'Disabled list item with icon',
    },
  },
};

export const WithMarker = Template.bind({});
WithMarker.args = {
  ...Default.args,
  hasMarker: true,
  slotContent: '',
  showHeadingSlot: true,
  slotContentListItemHeading: 'List item title',
  showBodySlot: true,
  slotContentListItemBody: 'Lorem ipsum dolor sit amet, consec tetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros.',
};
WithMarker.parameters = {
  docs: {
    description: {
      story: 'List item with marker',
    },
  },
};

export const WithMarkerDisabled = Template.bind({});
WithMarkerDisabled.args = {
  ...Default.args,
  hasMarker: true,
  disabled: true,
  slotContent: '',
  showHeadingSlot: true,
  slotContentListItemHeading: 'List item title',
  showSubheadingSlot: true,
  slotContentListItemSubheading: 'List item subtitle',
};
WithMarkerDisabled.parameters = {
  docs: {
    description: {
      story: 'Disabled list item with marker',
    },
  },
};

export const WithImage = Template.bind({});
WithImage.args = {
  ...Default.args,
  slotContent: '',
  showImageSlot: true,
  slotContentListItemImage: '<img src="http://via.placeholder.com/56x56/00b2a9/fff" />',
  showHeadingSlot: true,
  slotContentListItemHeading: 'List item title',
  showBodySlot: true,
  slotContentListItemBody: 'Lorem ipsum dolor sit amet, consec tetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros.',
};
WithImage.parameters = {
  docs: {
    description: {
      story: 'List item with image',
    },
  },
};

export const WithImageDisabled = Template.bind({});
WithImageDisabled.args = {
  ...WithImage.args,
  disabled: true,
};
WithImageDisabled.parameters = {
  docs: {
    description: {
      story: 'Disabled list item with image',
    },
  },
};

export const WithLink = Template.bind({});
WithLink.args = {
  ...Default.args,
  href: '#',
  slotContent: 'List item text',
};
WithLink.parameters = {
  docs: {
    description: {
      story: 'List item with link and chevron right. Use `href` to add link to list item. Default trailing icon is chevron right.',
    },
  },
};

export const WithLinkDisabled = Template.bind({});
WithLinkDisabled.args = {
  ...WithLink.args,
  disabled: true,
};
WithLinkDisabled.parameters = {
  docs: {
    description: {
      story: 'Disabled list item with link and chevron right. Use `href` to add link to list item. Default trailing icon is chevron right.',
    },
  },
};

export const WithTrailingIcon = Template.bind({});
WithTrailingIcon.args = {
  ...Default.args,
  hasTrailingIcon: true,
  trailingIconName: 'arrow_right',
  slotContent: 'List item text',
};
WithTrailingIcon.parameters = {
  docs: {
    description: {
      story: 'List item with trailing icon. Use `has-trailing-icon` to add trailing icon to list item. Default trailing icon is chevron right.',
    },
  },
};
