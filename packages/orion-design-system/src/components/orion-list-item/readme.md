# orion-list-item

List item is a container for list items. It is also known as `li` or `List Item`. This component is styled to resemble a list item and semantically renders an `<li>`. Use in conjunction with `orion-list` component. Additional documentation available at [orion.united.com](https://orion.united.com/)

<!-- Auto Generated Below -->


## Properties

| Property           | Attribute            | Description                                                                                     | Type      | Default           |
| ------------------ | -------------------- | ----------------------------------------------------------------------------------------------- | --------- | ----------------- |
| `disabled`         | `disabled`           | Disables the list item                                                                          | `boolean` | `false`           |
| `hasIcon`          | `has-icon`           | Adds an icon to the list item                                                                   | `boolean` | `false`           |
| `hasMarker`        | `has-marker`         | Adds a marker to the list item                                                                  | `boolean` | `false`           |
| `hasTrailingIcon`  | `has-trailing-icon`  | Adds a trailing icon to the list item. The href property will add a trailing icon automatically | `boolean` | `false`           |
| `href`             | `href`               | Adds a link to the list item. Trailing icon will be added automatically                         | `string`  | `''`              |
| `iconName`         | `icon-name`          | Name of the icon to be added to the list item                                                   | `string`  | `''`              |
| `trailingIconName` | `trailing-icon-name` | Name of the trailing icon to be added to the list item. Deaults to chevron_right                | `string`  | `'chevron_right'` |


## Slots

| Slot                           | Description                                |
| ------------------------------ | ------------------------------------------ |
|                                | Unnamed default slot for list item content |
| `"orion-list-item-body"`       | Slot for list item body                    |
| `"orion-list-item-heading"`    | Slot for list item heading                 |
| `"orion-list-item-image"`      | Slot for list item image                   |
| `"orion-list-item-subheading"` | Slot for list item subheading              |


## CSS Custom Properties

| Name                                    | Description                                                                              |
| --------------------------------------- | ---------------------------------------------------------------------------------------- |
| `--orion-list-item--vertical-align`     | Alignment of list item content. Default is center. Can be set to flex-start or flex-end. |
| `--orion-list-item-icon-color`          | value of the color property. Default is #024                                             |
| `--orion-list-item-marker-color`        | value of the background-color property of the marker. Default is #024                    |
| `--orion-list-item-marker-size`         | value of the width and height properties. Default is 16px                                |
| `--orion-list-item-trailing-icon-color` | value of the background-color property of the trailing icon. Default is #024             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
