# orion-radio-button-group

Radio button group is a component that controls layout of a group of radio buttons and allows for a single selection. Use in conjunction with `orion-label`, `orion-error` and `orion-note` components.

Additional documentation available at [orion.united.com](https://orion.united.com/)

<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                             | Type      | Default        |
| ---------- | ---------- | --------------------------------------- | --------- | -------------- |
| `disabled` | `disabled` | Disabled radio group                    | `boolean` | `false`        |
| `inline`   | `inline`   | The inline display of the radio group   | `boolean` | `false`        |
| `name`     | `name`     | form name of radio buttons              | `string`  | `'radiogroup'` |
| `required` | `required` | Required attribute                      | `boolean` | `false`        |
| `value`    | `value`    | value of currently checked radio button | `string`  | `''`           |


## Events

| Event          | Description                          | Type                              |
| -------------- | ------------------------------------ | --------------------------------- |
| `valueChanged` | Emits event that users can listen to | `CustomEvent<{ value: string; }>` |


## CSS Custom Properties

| Name                             | Description                                                                                                  |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `--orion-radio-group-column-gap` | value of the column-gap property. Default is 56px. Inline group only displays for desktop (769px and above). |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
