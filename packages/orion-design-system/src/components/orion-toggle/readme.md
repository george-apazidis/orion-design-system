# orion-toggle

Toggle is a component that allows users to toggle between two states. It is used to switch between on and off states. Use in conjunction with the `orion-toggle-group` component to control layout of a group of toggles.

Additional documentation available at [orion.united.com](https://orion.united.com/)

<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                 | Type      | Default |
| ---------- | ---------- | ------------------------------------------- | --------- | ------- |
| `checked`  | `checked`  | The checked state of the toggle             | `boolean` | `false` |
| `disabled` | `disabled` | Disables interactions                       | `boolean` | `false` |
| `justify`  | `justify`  | Justify the content of the toggle and label | `boolean` | `false` |
| `name`     | `name`     | The input name                              | `string`  | `''`    |
| `required` | `required` | Required attribute                          | `boolean` | `false` |
| `value`    | `value`    | The input value                             | `string`  | `''`    |


## Events

| Event          | Description                                | Type                                                |
| -------------- | ------------------------------------------ | --------------------------------------------------- |
| `valueChanged` | CustomEvent `detail` will be the new value | `CustomEvent<{ value: string; checked: boolean; }>` |


## Slots

| Slot        | Description                       |
| ----------- | --------------------------------- |
| `"default"` | default slot for the toggle label |


## CSS Custom Properties

| Name                             | Description                                                                         |
| -------------------------------- | ----------------------------------------------------------------------------------- |
| `--orion-toggle--vertical-align` | Alignment of toggle label. Default is flex-start. Can be set to center or flex-end. |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
