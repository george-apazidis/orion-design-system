import { removeEmptyLines } from '../../utils/storybook-utils';

export default {
  title: 'Components/orion-tabs',
  component: 'orion-tabs',
  parameters: {
    actions: {
      handles: ['orionTabSelected'],
    },
    docs: {
      description: {
        component:
          'Tabs is a component that will display tabs that can be selected. It will automatically hide overflow, but provides click+drag scrolling alongside buttons that will scroll. Additional documentation available at [orion.united.com](https://orion.united.com/)',
      },
    },
  },
};

const Template = (args) => removeEmptyLines(`
<orion-tabs
  id="${args.id}"
  min-tab-width="${args.minTabWidth}"
  active-tab="${args.activeTab}"
  ${args.scrollToStartingActiveTab ? 'scroll-to-starting-active-tab' : ''}
>
${args.slots}
</orion-tabs>
`);

const buildTabs = (count = 1, content = '') => [...Array(count)].map((_, i) => `  <orion-tab>${content || `tab ${i + 1}`}</orion-tab>`).join('\n');
const buildIconTabs = (count = 1, icon = 'alert') => [...Array(count)].map(() => `  <orion-tab><i class="orion-icon orion-icon-${icon}"></i></orion-tab>`).join('\n');
const buildTabPanels = (count = 1) => [...Array(count)].map((_, i) => `  <orion-tab-panel>panel ${i + 1}</orion-tab-panel>`).join('\n');

export const Default = Template.bind({});
Default.args = {
  id: 'tabs1',
  minTabWidth: '308px',
  activeTab: 0,
  slots: buildTabs(2),
  scrollToStartingActiveTab: false,
};
Default.parameters = {
  docs: {
    description: {
      story: '2 options',
    },
  },
};

export const ThreeTabs = Template.bind({});
ThreeTabs.args = {
  ...Default.args,
  slots: `${buildTabs(3)}`,
  minTabWidth: '231px',
};
ThreeTabs.parameters = {
  docs: {
    description: {
      story: '3 options',
    },
  },
};

export const TruncatedTabs = Template.bind({});
TruncatedTabs.args = {
  ...Default.args,
  slots: `${buildTabs(3, 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque ipsa ducimus, nobis suscipit consectetur voluptatem amet?')}`,
  minTabWidth: '30ch',
};
TruncatedTabs.parameters = {
  docs: {
    description: {
      story: '3 options',
    },
  },
};

export const IconTabs = Template.bind({});
IconTabs.args = {
  ...Default.args,
  minTabWidth: '231px',
  slots: buildIconTabs(1, 'email') + buildIconTabs(1, 'mileageplus') + buildIconTabs(1, 'wrench'),
};
IconTabs.parameters = {
  docs: {
    description: {
      story: 'Tabs with icons',
    },
  },
};

export const ManyTabs = Template.bind({});
ManyTabs.args = {
  ...Default.args,
  minTabWidth: '185px',
  activeTab: 10,
  slots: buildTabs(12),
  scrollToStartingActiveTab: true,
};
ManyTabs.parameters = {
  docs: {
    description: {
      story: 'Tabs with overflow tabs',
    },
  },
};

export const ContentExample = Template.bind({});
ContentExample.args = {
  ...Default.args,
  id: 'content-example',
  slots: `${buildTabs(5)}\n${buildTabPanels(5)}`,
  minTabWidth: '185px',
};
ContentExample.parameters = {
  docs: {
    description: {
      story: 'Tabs with example content panel',
    },
  },
};
