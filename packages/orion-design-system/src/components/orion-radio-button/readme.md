# orion-radio-button

Radio button is a component that displays a radio button. It is used to select a single option from a set of options. Use in conjunction with the `orion-radio-group` component.

Additional documentation available at [orion.united.com](https://orion.united.com/)

<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description                                                                                                                                                                         | Type      | Default   |
| ----------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | --------- |
| `checked`   | `checked`   | The checked state of the radio button                                                                                                                                               | `boolean` | `false`   |
| `disabled`  | `disabled`  | Disables interactions                                                                                                                                                               | `boolean` | `false`   |
| `focusable` | `focusable` | Focuses the radio button. This method is used internally by the `orion-radio-button-group` component. Do not use it directly. Use the `orion-radio-button-group` component instead. | `boolean` | `false`   |
| `name`      | `name`      | The input name                                                                                                                                                                      | `string`  | `'radio'` |
| `required`  | `required`  | Required attribute                                                                                                                                                                  | `boolean` | `false`   |
| `value`     | `value`     | The input value                                                                                                                                                                     | `string`  | `''`      |


## Events

| Event                | Description                                                                    | Type                              |
| -------------------- | ------------------------------------------------------------------------------ | --------------------------------- |
| `radioButtonChanged` | Emit `radioButtonChanged` event that `orion-radio-button-group` can listen for | `CustomEvent<{ value: string; }>` |


## Slots

| Slot        | Description                             |
| ----------- | --------------------------------------- |
| `"default"` | default slot for the radio button label |


## CSS Custom Properties

| Name                            | Description                                                                        |
| ------------------------------- | ---------------------------------------------------------------------------------- |
| `--orion-radio--vertical-align` | Alignment of radio label. Default is flex-start. Can be set to center or flex-end. |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
