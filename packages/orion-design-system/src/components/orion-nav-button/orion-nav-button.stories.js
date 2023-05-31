import { removeEmptyLines, getStoryControlSettings } from '../../utils/storybook-utils';

export default {
  title: 'Components/orion-nav-button',
  component: 'orion-nav-button',
  parameters: {
    docs: {
      description: {
        component: 'The orion-nav-button is a navigation button that you can use in the `orion-header` component. Labels display below the icon in desktop viewports, and default to displaying to the right of the icon in mobile. Label can be displayed to the left of the icon in mobile by using the `label-position` prop. Additional documentation available at [orion.united.com](https://orion.united.com/)',
      },
    },
  },
  // Configuring the these Storybook only controls to appear under
  // the same category in the ArgsTable
  argTypes: {
    // button label slot content
    slotContentLabel: getStoryControlSettings('label'),
  },
};

const Template = (args) => removeEmptyLines(`<div style="background-color: #024; width: fit-content;">
    <orion-nav-button
      ${args.iconName ? `icon-name="${args.iconName}"` : ''}
      ${args.labelPosition ? `label-position="${args.labelPosition}"` : ''}
      ${args.isActive ? 'is-active' : ''}
    >
      ${args.slotContentLabel ? args.slotContentLabel : ''}
    </orion-nav-button>
  </div>`
);

export const Default = Template.bind({});
Default.args = {
  iconName: 'home',
  slotContentLabel: '',
};
Default.parameters = {
  docs: {
    description: {
      story: 'The default state',
    },
  },
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  iconName: 'home',
  slotContentLabel: 'Home',
};
WithLabel.parameters = {
  docs: {
    description: {
      story: 'Label is displayed below the icon in desktop viewports, and to the right of the icon in mobile.',
    },
  },
};

export const WithLabelPositionLeft = Template.bind({});
WithLabelPositionLeft.args = {
  iconName: 'home',
  slotContentLabel: 'Home',
  labelPosition: 'left',
};
WithLabelPositionLeft.parameters = {
  docs: {
    description: {
      story: 'Label can be displayed to the left of the icon in mobile by using the `label-position` prop.',
    },
  },
};