# orion-popover

Popovers are non-modal dialogs that allow users to access additional related information or functionality without a change in context. Popovers can appear with title areas or not. Popover content is specific to the intended use and, thus, not specified in the symbology. Note that any element can be used to launch a popover, not just a link or icon.

This component uses [PopperJS](https://popper.js.org/) to handle most of the functionality.

Additional documentation available at [orion.united.com](https://orion.united.com/)

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                         | Type                                                                                                                                                                 | Default    |
| ------------- | -------------- | --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `placement`   | `placement`    | The placement of the popper relative to its trigger | `"bottom" \| "bottom-end" \| "bottom-start" \| "left" \| "left-end" \| "left-start" \| "right" \| "right-end" \| "right-start" \| "top" \| "top-end" \| "top-start"` | `'bottom'` |
| `popperWidth` | `popper-width` | width should be between 100px and 640px             | `number`                                                                                                                                                             | `300`      |


## Slots

| Slot                    | Description                          |
| ----------------------- | ------------------------------------ |
| `"default"`             | default slot for the popover trigger |
| `"orion-popover-body"`  | slot for body content                |
| `"orion-popover-title"` | slot for popover title               |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
