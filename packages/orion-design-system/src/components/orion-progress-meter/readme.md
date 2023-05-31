# orion-progress-meter

Progress-meter is a combination of the native HTML `<progress>` and `<meter>` elements.

Additional documentation available at [orion.united.com](https://orion.united.com/)

<!-- Auto Generated Below -->


## Properties

| Property          | Attribute           | Description                                                                                                           | Type                             | Default   |
| ----------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------- | -------------------------------- | --------- |
| `isCircle`        | `is-circle`         | Shows progress meter in circle format                                                                                 | `boolean`                        | `false`   |
| `max`             | `max`               | The maximum possible value                                                                                            | `number`                         | `100`     |
| `percentOfTarget` | `percent-of-target` | The percent of target value where progress meter color will change from error to warn (decimal value between 0 and 1) | `number`                         | `0.8`     |
| `segments`        | `segments`          | Amount of segments to divide progress meter into                                                                      | `number`                         | `1`       |
| `showValue`       | `show-value`        | Display value in center of circle                                                                                     | `boolean`                        | `false`   |
| `size`            | `size`              | The circle size                                                                                                       | `"large" \| "medium" \| "small"` | `'small'` |
| `target`          | `target`            | The target value                                                                                                      | `number`                         | `0`       |
| `value`           | `value`             | The current value                                                                                                     | `number`                         | `0`       |


## CSS Custom Properties

| Name                                               | Description                                                                                                              |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `--orion-progress-meter__color-circle-label`       | Color of center circle background                                                                                        |
| `--orion-progress-meter__color-error`              | Color of progress meter when value is less than percent of target (default 80%)                                          |
| `--orion-progress-meter__color-progess-background` | Color of progress meter background                                                                                       |
| `--orion-progress-meter__color-progress`           | Color of progress meter                                                                                                  |
| `--orion-progress-meter__color-success`            | Color of progress meter when value equals target                                                                         |
| `--orion-progress-meter__color-warn`               | Color of progress meter when value is less than target, but greater than or equal to the percent of target (default 80%) |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
