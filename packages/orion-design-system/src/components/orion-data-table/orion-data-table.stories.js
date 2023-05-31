import { storiesConstuctor, removeEmptyLines, getStoryControlSettings } from '../../utils/storybook-utils';

export default {
  title: 'Modules/orion-data-table',
  component: 'orion-data-table',
  parameters: {
    actions: {
      handles: ['orionTableUpdated', 'orionCheckboxColumnToggled'],
    },
    docs: {
      description: {
        component: 'A table is a container that displays data in sets of columns and rows. Additional documentation available at [orion.united.com](https://orion.united.com/)',
      },
    },
  },
  argTypes: {
    id: getStoryControlSettings('id', '**NOT PART OF COMPONENT API**. Adds an id to the component for script purposes.'),
  },
};

const Template = (args) => removeEmptyLines(`
<orion-data-table
  ${args.variant ? `variant="${args.variant}"` : ''}
  ${args.pin ? `pin="${args.pin}"` : ''}
  ${args.sortable ? `sortable="${args.sortable}"` : ''}
  ${args.checkbox ? `checkbox="${args.checkbox}"` : ''}
  id="${args.id}"
></orion-data-table>

<script>
(function() {
  const table = document.querySelector('#${args.id}');
  table.headers = ${JSON.stringify(args.headers)};
  table.rows = ${JSON.stringify(args.rows)};
  table.hiddenColumns = ${JSON.stringify(args.hiddenColumns)};
})()
</script>

`);

const headers = [
  {
    name: 'checkbox',
    type: 'checkbox',
    align: 'center',
  },
  'Flight name',
  {
    name: 'Departure time',
    type: 'number',
  },
  {
    name: 'Fog level',
    type: 'icon',
    align: 'center',
  },
  {
    name: 'Priority',
    type: 'select',
    selectOptions: [
      { text: 'Critical', value: 4 },
      { text: 'High', value: 3 },
      { text: 'Medium', value: 2 },
      { text: 'Low', value: 1 },
    ],
  },
  { name: 'Fees', align: 'right' },
];

const rows = [
  [false, 'Toronto to London', { value: '14:00', sortValue: 14 }, { iconName: 'fog', iconCount: 1 }, { default: 'High' }, '$0.00'],
  [true, 'London to Toronto', { value: '04:00', sortValue: 4 }, { iconName: 'fog', iconCount: 3 }, { default: 'Low' }, '$10.00'],
  [true, 'Toronto to NYC', { value: '12:00', sortValue: 12 }, { iconName: 'fog', iconCount: 4 }, { default: 'Medium' }, '$100.00'],
  [false, 'London to Dublin', { value: '21:00', sortValue: 21 }, { iconName: 'fog', iconCount: 2 }, { default: 4 }, '$1,200.00'],
];

const hiddenColumns = [];

const { defaultStory, createStoryVariant } = storiesConstuctor(
  Template,
  {
    headers,
    rows,
    hiddenColumns,
    pin: 0,
    sortable: true,
    checkbox: false,
    id: 'table',
  },
  'Table striped rows',
);

export const Default = defaultStory;

export const LinedTable = createStoryVariant({ variant: 'lined', id: 'lined-table' }, 'Table lined rows');

const expandedHeaders = [...headers, ...new Array(10).fill({ name: 'Label', sortable: false })];
const expandedRows = rows.map((row) => [...row, ...new Array(10).fill('data')]);
export const PinnedTable = createStoryVariant(
  {
    pin: 6,
    headers: expandedHeaders,
    rows: expandedRows,
    id: 'pinned-table',
  },
  'Table with many columns, and the first 6 columns pinned',
);

const noCheckmarkHeaders = [...headers];
noCheckmarkHeaders.shift();
const noCheckmarkRows = rows.map((row) => {
  const newRow = [...row];
  newRow.shift();
  return newRow;
});
export const CheckboxTable = createStoryVariant(
  {
    headers: noCheckmarkHeaders,
    rows: noCheckmarkRows,
    pin: 1,
    checkbox: true,
    id: 'checkbox-table',
  },
  'Table without a checkbox in the headers/rows, but with the checkbox prop added',
);
