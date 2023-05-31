import { removeEmptyLines, getStoryControlSettings } from '../../utils/storybook-utils';

export default {
  title: 'Components/orion-accordion',
  component: 'orion-accordion',
  parameters: {
    docs: {
      description: {
        component:
          'Accordion is a component that allows users to expand and collapse sections of content. Additional documentation available at [orion.united.com](https://orion.united.com/)',
      },
    },
    actions: {
      handles: ['toggle'],
    },
  },
  // Configuring the these Storybook only controls to appear under
  // the same category in the ArgsTable
  argTypes: {
    // header slot content
    slotContentHeader: getStoryControlSettings('header'),
    // panel slot content
    slotContentPanel: getStoryControlSettings('panel'),
  },
};

const Template = (args) => removeEmptyLines(`
  <orion-accordion
    ${args.open ? 'open' : ''}
    ${args.chevronLeft ? 'chevron-left' : ''}
    ${args.hasContainer ? 'has-container' : ''}
  >
    <span slot="orion-accordion-header">
      ${args.slotContentHeader}
    </span>
    <div slot="orion-accordion-panel">
      ${args.slotContentPanel}
    </div>
  </orion-accordion>
`);

export const Default = Template.bind({});
Default.args = {
  chevronLeft: false,
  hasContainer: false,
  open: false,
  slotContentHeader: 'Title',
  slotContentPanel:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
};
Default.parameters = {
  docs: {
    description: {
      story: 'The default state',
    },
  },
};

export const chevronLeft = Template.bind({});
chevronLeft.args = {
  ...Default.args,
  chevronLeft: true,
};
chevronLeft.parameters = {
  docs: {
    description: {
      story: 'The chevron left state (desktop only)',
    },
  },
};

export const openByDefault = Template.bind({});
openByDefault.args = {
  ...Default.args,
  open: true,
};
openByDefault.parameters = {
  docs: {
    description: {
      story: 'The open by default state',
    },
  },
};

export const Container = Template.bind({});
Container.args = {
  ...Default.args,
  hasContainer: true,
};
Container.parameters = {
  docs: {
    description: {
      story: 'The container state',
    },
  },
};

export const containerChevronLeft = Template.bind({});
containerChevronLeft.args = {
  ...Default.args,
  hasContainer: true,
  chevronLeft: true,
};
containerChevronLeft.parameters = {
  docs: {
    description: {
      story: 'The container state with chevron left (desktop only)',
    },
  },
};

export const containerOpenByDefault = Template.bind({});
containerOpenByDefault.args = {
  ...Default.args,
  hasContainer: true,
  open: true,
};
containerOpenByDefault.parameters = {
  docs: {
    description: {
      story: 'The container state open by default',
    },
  },
};
