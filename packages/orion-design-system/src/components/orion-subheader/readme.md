# orion-subheader

The subheader component spans the full width of the viewport and is the second element in the UI shell.

Additional documentation available at [orion.united.com](https://orion.united.com/)

<!-- Auto Generated Below -->


## Properties

| Property       | Attribute        | Description                                                        | Type      | Default |
| -------------- | ---------------- | ------------------------------------------------------------------ | --------- | ------- |
| `hasCloseIcon` | `has-close-icon` | Toggles visibility of the close icon in the right of the subheader | `boolean` | `false` |
| `isOpen`       | `is-open`        | Prop used to show/hide subheader                                   | `boolean` | `false` |


## Events

| Event            | Description | Type               |
| ---------------- | ----------- | ------------------ |
| `subheaderClose` |             | `CustomEvent<any>` |


## Slots

| Slot                       | Description                                |
| -------------------------- | ------------------------------------------ |
|                            | Unnamed default slot for subheader content |
| `"orion-subheader-center"` | slot for center content                    |
| `"orion-subheader-left"`   | slot for left content                      |
| `"orion-subheader-right"`  | slot for right content                     |


## CSS Custom Properties

| Name                                  | Description                                                                                       |
| ------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `--orion-subheader-bg-color`          | Background color of subheader (default is #334e69)                                                |
| `--orion-subheader-color`             | Text color of subheader (default is #fff)                                                         |
| `--orion-subheader-height-desktop`    | Height of subheader on desktop (default is 120px)                                                 |
| `--orion-subheader-height-mobile`     | Height of subheader on mobile (default is 120px)                                                  |
| `--orion-subheader-padding-x-desktop` | Left/right padding of subheader on desktop (default is 24px)                                      |
| `--orion-subheader-padding-x-mobile`  | Left/right padding of subheader on mobile (default is 18px)                                       |
| `--orion-subheader-padding-y-desktop` | Top/bottom padding of subheader on desktop (default is 16px)                                      |
| `--orion-subheader-padding-y-mobile`  | Top/bottom padding of subheader on mobile (default is 16px)                                       |
| `--orion-subheader-top-value-desktop` | top starting position of subheader on desktop (default is 80px)                                   |
| `--orion-subheader-top-value-mobile`  | top starting position of subheader on mobile (default is 60px)                                    |
| `--orion-subheader-vertical-align`    | Alignment of subheader content. Can be set to center, flex-start or flex-end. (default is center) |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
