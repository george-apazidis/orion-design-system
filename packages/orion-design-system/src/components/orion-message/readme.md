# orion-message

Messages are used to communicate important information to the user. They can be used to indicate information, success, warning, or error. Messages can be dismissed by the user or automatically.

For dismissible/temporary alert messages, use `z-index: var(--orion-z-extreme, 9999);` to ensure the message is always on top of other elements. The highest component in the library is `orion-modal` which uses `z-index: var(--orion-z-very-high, 5000);` and temporary alert messages should always be on top of modals.

Additional documentation available at [orion.united.com](https://orion.united.com/)

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                                                                                                                                                                                                                                                                               | Type                                                                      | Default  |
| ------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | -------- |
| `dismissible` | `dismissible`  | Toggles the ability to dismiss the message via a close button in the top right of the message                                                                                                                                                                                                                             | `boolean`                                                                 | `false`  |
| `hasIcon`     | `has-icon`     | Toggles the display of the icon in the top left of the message                                                                                                                                                                                                                                                            | `boolean`                                                                 | `false`  |
| `heading`     | `heading`      | Optional heading text for the message that appears above message body message                                                                                                                                                                                                                                             | `string`                                                                  | `''`     |
| `isOpen`      | `is-open`      | Prop used to show/hide message                                                                                                                                                                                                                                                                                            | `boolean`                                                                 | `false`  |
| `overlayTime` | `overlay-time` | Optional time for the mobile overlay to display in milliseconds. Default is 3000.                                                                                                                                                                                                                                         | `number`                                                                  | `3000`   |
| `variant`     | `variant`      | Stylistic variations for the message type. - **success** - results in a green message - **success-overlay** - results in a full screen overlay on mobile - **high** - results in a red message - **medium** - results in an orange message - **low** - results in a yellow message - **info** - results in a blue message | `"high" \| "info" \| "low" \| "medium" \| "success" \| "success-overlay"` | `'info'` |


## Slots

| Slot        | Description                      |
| ----------- | -------------------------------- |
| `"default"` | default slot for message content |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
