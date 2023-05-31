# orion-stepper

Stepper is a component that displays a number stepper.

Additional documentation available at [orion.united.com](https://orion.united.com/)

<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description                                      | Type      | Default |
| ----------- | ------------ | ------------------------------------------------ | --------- | ------- |
| `disabled`  | `disabled`   | Disables interactions                            | `boolean` | `false` |
| `error`     | `error`      | Shows error state                                | `boolean` | `false` |
| `hideTally` | `hide-tally` | Hide the current tally                           | `boolean` | `false` |
| `max`       | `max`        | Max value that the stepper can be incremented to | `number`  | `100`   |
| `min`       | `min`        | Min value that the stepper can be decremented to | `number`  | `0`     |
| `step`      | `step`       | Step size to increment/decrement                 | `number`  | `1`     |
| `value`     | `value`      | The current value                                | `number`  | `0`     |


## Events

| Event          | Description                                | Type                              |
| -------------- | ------------------------------------------ | --------------------------------- |
| `valueChanged` | CustomEvent `detail` will be the new value | `CustomEvent<{ value: number; }>` |


## CSS Custom Properties

| Name                          | Description                                                           |
| ----------------------------- | --------------------------------------------------------------------- |
| `--orion-stepper-tally-width` | value of the tally width (default: 60px for mobile, 44px for desktop) |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
