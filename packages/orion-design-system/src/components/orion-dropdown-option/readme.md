# orion-dropdown-option



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description                                         | Type      | Default             |
| ----------- | ----------- | --------------------------------------------------- | --------- | ------------------- |
| `checked`   | `checked`   | The checked state of the dropdown option            | `boolean` | `false`             |
| `disabled`  | `disabled`  | Disables interactions                               | `boolean` | `false`             |
| `focusable` | `focusable` | Focuses the dropdown option                         | `boolean` | `false`             |
| `label`     | `label`     | The label for the input element passed in as a slot | `string`  | `''`                |
| `name`      | `name`      | The input name                                      | `string`  | `'dropdown-option'` |
| `required`  | `required`  | Required attribute                                  | `boolean` | `false`             |
| `value`     | `value`     | The input value                                     | `string`  | `''`                |


## Events

| Event                   | Description                                                             | Type                                                               |
| ----------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `dropdownOptionChanged` | Emit `dropdownOptionChanged` event that `orion-dropdown` can listen for | `CustomEvent<{ value: string; label: string; checked: boolean; }>` |


## Slots

| Slot        | Description                                |
| ----------- | ------------------------------------------ |
| `"default"` | default slot for the dropdown option label |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
