import { storiesConstuctor, removeEmptyLines, getStoryControlSettings } from '../../utils/storybook-utils';

export default {
  title: 'Modules/orion-table',
  component: 'orion-table',
  parameters: {
    docs: {
      description: {
        component: 'A table is a container that displays data in sets of columns and rows. Additional documentation available at [orion.united.com](https://orion.united.com/)',
      },
    },
  },
  argTypes: {
    headers: getStoryControlSettings('orion-table-header'),
    rows: getStoryControlSettings('orion-table-cell'),
  },
};

const Template = (args) => removeEmptyLines(`
<orion-table
  ${args.variant ? `variant="${args.variant}"` : ''}
  ${args.sortable ? 'sortable' : ''}
>
  <orion-table-row>
\t${args.headers.map((header) => `<orion-table-header align="${header.align}">${header.copy}</orion-table-header>`).join('\n\t')}
  </orion-table-row>
  ${args.rows
    .map(
      (row) => `
  <orion-table-row>
\t${row.map((cell) => `<orion-table-cell>${cell}</orion-table-cell>`).join('\n\t')}
  </orion-table-row>
      `,
    )
    .join('\n')}
</orion-table>
`);

const { defaultStory, createStoryVariant } = storiesConstuctor(
  Template,
  {
    sortable: false,
    headers: [
      { copy: 'Flight name', align: 'left' },
      { copy: 'Flight status', align: 'center' },
      { copy: 'Flight number', align: 'right' },
    ],
    rows: [
      ['London to NYC', '<i class="orion-icon orion-icon-plane_arriving"></i>', '1'],
      ['London to Toronto', '<i class="orion-icon orion-icon-plane"></i>', '3'],
      ['London to Vancouver', '<i class="orion-icon orion-icon-plane_departing"></i>', '4'],
      ['London to Berlin', '<i class="orion-icon orion-icon-plane"></i>', '2'],
    ],
  },
  'Default table',
);

export const Default = defaultStory;

export const SortableTable = createStoryVariant({ sortable: true }, 'Sortable table');

export const LinedTable = createStoryVariant({ variant: 'lined' }, 'Lined table');
