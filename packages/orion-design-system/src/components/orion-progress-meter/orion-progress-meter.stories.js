import { removeEmptyLines } from '../../utils/storybook-utils';

export default {
  title: 'Components/orion-progress-meter',
  component: 'orion-progress-meter',
  parameters: {
    docs: {
      description: {
        component:
          'Progress-meter is a combination of the native HTML `<progress>` and `<meter>` elements. Additional documentation available at [orion.united.com](https://orion.united.com/)',
      },
    },
  },
};

const Template = (args) => removeEmptyLines(`
  ${args.isCircle ? '<div style="display: flex; flex-direction: column; align-items: center;">' : '<div>'}
  <orion-progress-meter
    ${args.value ? `value="${args.value}"` : 'value="0"'}
    ${args.max ? `max="${args.max}"` : 'max="100"'}
    ${args.target ? `target="${args.target}"` : ''}
    ${args.percentOfTarget ? `percent-of-target="${args.percentOfTarget}"` : ''}
    ${args.isCircle ? 'is-circle' : ''}
    ${args.showValue ? 'show-value' : ''}
    ${args.size ? `size="${args.size}"` : ''}
    ${args.segments ? `segments="${args.segments}"` : ''}
  ></orion-progress-meter>
  <orion-label style="--orion-label--padding-right: 0;">Label</orion-label>
  </div>
`);

export const Default = Template.bind({});
Default.args = {
  value: 25,
  max: 100,
};
Default.parameters = {
  docs: {
    description: {
      story: 'The default state',
    },
  },
};

export const Circular = Template.bind({});
Circular.args = {
  ...Default.args,
  isCircle: true,
};
Circular.parameters = {
  docs: {
    description: {
      story: 'The circular state',
    },
  },
};

export const ShowValue = Template.bind({});
ShowValue.args = {
  ...Default.args,
  value: 50,
  isCircle: true,
  showValue: true,
};
ShowValue.parameters = {
  docs: {
    description: {
      story: 'The value is displayed',
    },
  },
};

export const TargetValueError = Template.bind({});
TargetValueError.args = {
  value: 6,
  target: 10,
  max: 10,
  percentOfTarget: 0.8,
};
TargetValueError.parameters = {
  docs: {
    description: {
      story:
        'Default colors change when target value provided. The percent of target by default is 80%. You can change it with the percent-of-target attribute. Error color is used when value is less than percent of target (80%).',
    },
  },
};

export const TargetValueWarn = Template.bind({});
TargetValueWarn.args = {
  value: 8,
  target: 10,
  max: 10,
  percentOfTarget: 0.8,
};
TargetValueWarn.parameters = {
  docs: {
    description: {
      story:
        'Default colors change when target value provided. The percent of target by default is 80%. You can change it with the percent-of-target attribute. Warn color is used when value is less than target, but greater than or equal to the percent of target.',
    },
  },
};

export const TargetValueSucess = Template.bind({});
TargetValueSucess.args = {
  value: 10,
  target: 10,
  max: 10,
  percentOfTarget: 0.8,
};
TargetValueSucess.parameters = {
  docs: {
    description: {
      story:
        'Default colors change when target value provided. The percent of target by default is 80%. You can change it with the percent-of-target attribute. Success color is used when value equals target.',
    },
  },
};

export const TargetValueErrorCircular = Template.bind({});
TargetValueErrorCircular.args = {
  value: 6,
  target: 10,
  max: 10,
  percentOfTarget: 0.8,
  isCircle: true,
  showValue: true,
};
TargetValueErrorCircular.parameters = {
  docs: {
    description: {
      story:
        'Default colors change when target value provided. The percent of target by default is 80%. You can change it with the percent-of-target attribute. Error color is used when value is less than percent of target (80%).',
    },
  },
};

export const TargetValueWarnCircular = Template.bind({});
TargetValueWarnCircular.args = {
  value: 8,
  target: 10,
  max: 10,
  percentOfTarget: 0.8,
  isCircle: true,
  showValue: true,
};
TargetValueWarnCircular.parameters = {
  docs: {
    description: {
      story:
        'Default colors change when target value provided. The percent of target by default is 80%. You can change it with the percent-of-target attribute. Warn color is used when value is less than target, but greater than or equal to the percent of target.',
    },
  },
};

export const TargetValueSucessCircular = Template.bind({});
TargetValueSucessCircular.args = {
  value: 10,
  target: 10,
  max: 10,
  percentOfTarget: 0.8,
  isCircle: true,
  showValue: true,
};
TargetValueSucessCircular.parameters = {
  docs: {
    description: {
      story:
        'Default colors change when target value provided. The percent of target by default is 80%. You can change it with the percent-of-target attribute. Success color is used when value equals target.',
    },
  },
};

export const CircularSizeMedium = Template.bind({});
CircularSizeMedium.args = {
  ...Default.args,
  isCircle: true,
  size: 'medium',
  showValue: true,
};
CircularSizeMedium.parameters = {
  docs: {
    description: {
      story: 'The circular state with medium size',
    },
  },
};

export const CircularSizeLarge = Template.bind({});
CircularSizeLarge.args = {
  ...Default.args,
  isCircle: true,
  size: 'large',
  showValue: true,
};
CircularSizeLarge.parameters = {
  docs: {
    description: {
      story: 'The circular state with large size',
    },
  },
};
