import { removeEmptyLines, getStoryControlSettings } from '../../utils/storybook-utils';

export default {
  title: 'Modules/orion-date-input',
  component: 'orion-date-input',
  parameters: {
    actions: {
      handles: ['orionDateSelected'],
    },
    docs: {
      description: {
        component:
          'Date inputs allow the user to enter a single date or a range between two dates.. Additional documentation available at [orion.united.com](https://orion.united.com/)',
      },
    },
  },
  // Configuring the these Storybook only controls to appear under
  // the same category in the ArgsTable
  argTypes: {
    // first label slot content
    slotContentFirstLabel: getStoryControlSettings('first label'),
    // second label slot content
    slotContentSecondLabel: getStoryControlSettings('second label'),
    // conditional slot content
    slotContentConditional: getStoryControlSettings('conditional'),
    // note slot content,
    slotContentNote: getStoryControlSettings('note'),
  },
};

const DefaultTemplate = (args) => removeEmptyLines(`
<orion-date-input
  ${args.range ? 'range' : ''}
  ${args.multiMonth ? 'multi-month' : ''}
  ${args.disabled ? 'disabled' : ''}
  ${args.inline ? 'inline' : ''}
  ${args.error ? 'error' : ''}
  ${args.placeholder ? `placeholder="${args.placeholder}"` : ''}
  ${args.dateFormat ? `date-format="${args.dateFormat}"` : ''}
  ${args.minDate ? `min-date="${args.minDate}"` : ''}
  ${args.maxDate ? `max-date="${args.maxDate}"` : ''}
  ${args.id ? `id="${args.id}"` : ''}
>
${
  args.slotContentFirstLabel
    ? `
  <orion-label slot="orion-date-input-first-label"
    ${args.error ? 'error' : ''}
    ${args.disabled ? 'disabled' : ''}
  >
    ${args.slotContentFirstLabel}
    ${args.slotContentConditional ? `<span slot="orion-label-conditional">${args.slotContentConditional}</span>` : ''}
    
  </orion-label>`
    : ''
}
${
  args.slotContentSecondLabel
    ? `
  <orion-label slot="orion-date-input-second-label"
    ${args.error ? 'error' : ''}
    ${args.disabled ? 'disabled' : ''}
  >
    ${args.slotContentSecondLabel}
  </orion-label>`
    : ''
}
</orion-date-input>
${
  args.slotContentNote
    ? `
<orion-note>
    ${args.slotContentNote}
</orion-note>
`
    : ''
}
${
  args.error
    ? `
<orion-error>
  Inline Feedback
</orion-error>
  `
    : ''
}
`);

export const Default = DefaultTemplate.bind({});
Default.args = {
  range: false,
  placeholder: '',
  dateFormat: '',
  minDate: undefined,
  maxDate: undefined,
  multiMonth: false,
  error: false,
  disabled: false,
  inline: false,
  slotContentFirstLabel: 'Depart',
  slotContentSecondLabel: '',
  slotContentConditional: '',
  slotContentNote: '',
};
Default.parameters = {
  docs: {
    description: {
      story: 'Single',
    },
  },
};

const createInput = (args, story, Template = DefaultTemplate) => {
  const input = Template.bind({});
  input.args = {
    ...Default.args,
    ...args,
  };
  input.parameters = {
    docs: {
      description: {
        story,
      },
    },
  };
  return input;
};

// min/max date
export const MinDate = createInput({ minDate: new Date() }, 'A single input with a minimum date of today');
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
export const MaxDate = createInput({ maxDate: tomorrow }, 'A single input with a maximum date of tomorrow');

const minMaxTemplate = (args) => `
${DefaultTemplate(args)}
<script>
  document.querySelector('#min-max-date').minDate = new Date();
  window.max = new Date();
  window.max.setDate(window.max.getDate() + 10);
  document.querySelector('#min-max-date').maxDate = window.max;
</script>
`;
export const MinMaxDate = createInput({ id: 'min-max-date' }, 'A single input with a min and max date', minMaxTemplate);

// disabled
export const Disabled = createInput({ disabled: true }, 'A single input in a disabled state');
export const DisabledRange = createInput({ slotContentSecondLabel: 'Return', disabled: true, range: true }, 'Two inputs in a disabled state');

// error
export const Error = createInput({ error: 'Inline feedback' }, 'A single input in an error state');
export const ErrorRange = createInput({ slotContentSecondLabel: 'Return', error: 'Inline feedback', range: true }, 'Two inputs in an error state');

// condition
export const Condition = createInput({ slotContentConditional: '(Condition)' }, 'A single input with a condition');
export const ConditionRange = createInput({ slotContentSecondLabel: 'Return', slotContentConditional: '(Condition)', range: true }, 'Two inputs with a condition');

// condition + note
export const ConditionWithNote = createInput(
  {
    slotContentConditional: '(Condition)',
    slotContentNote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dui diam, lobortis at elit in, viverra tristique ipsum.',
  },
  'A single input with a condition and a note',
);
export const ConditionWithNoteRange = createInput(
  {
    slotContentSecondLabel: 'Return',
    slotContentConditional: '(Condition)',
    slotContentNote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dui diam, lobortis at elit in, viverra tristique ipsum.',
    range: true,
  },
  'Two inputs with a condition and a note',
);

// inline
export const InlineLabel = createInput({ inline: true }, 'A single input with an inline label');
