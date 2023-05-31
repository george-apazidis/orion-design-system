# orion-chip

Chips are used to communicate important information to the user. They can be used to indicate information, success, warning, or error. Chips can be dismissed by the user.

Additional documentation available at [orion.united.com](https://orion.united.com/)

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                                                                                                                                                                                                                                                                                                                                    | Type                                                             | Default  |
| ------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | -------- |
| `dismissible` | `dismissible` | Toggles the ability to dismiss the chip via a close button on right of the chip                                                                                                                                                                                                                                                                                | `boolean`                                                        | `false`  |
| `isOpen`      | `is-open`     | Prop used to show/hide chip                                                                                                                                                                                                                                                                                                                                    | `boolean`                                                        | `false`  |
| `solidBg`     | `solid-bg`    | Prop used to to display a solid background color                                                                                                                                                                                                                                                                                                               | `boolean`                                                        | `false`  |
| `variant`     | `variant`     | Stylistic variations for the chip type. - **success** - results in a green chip - **high** - results in a red chip - **medium** - results in an orange chip - **low** - results in a yellow chip - **info** - results in a blue chip - **custom** - results in a custom color chip (see `--orion-chip-color__bg` and `--orion-chip-color__text` css variables) | `"custom" \| "high" \| "info" \| "low" \| "medium" \| "success"` | `'info'` |


## Slots

| Slot        | Description                   |
| ----------- | ----------------------------- |
| `"default"` | default slot for chip content |


## CSS Custom Properties

| Name                       | Description                                   |
| -------------------------- | --------------------------------------------- |
| `--orion-chip-color__bg`   | HEX color value of the background and border  |
| `--orion-chip-color__text` | HEX color value of the label and close button |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
