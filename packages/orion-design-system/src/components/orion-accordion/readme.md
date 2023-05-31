# orion-accordion

Accordion is a component that allows users to expand and collapse sections of content.

Additional documentation available at [orion.united.com](https://orion.united.com/)

<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                          | Type      | Default |
| -------------- | --------------- | ------------------------------------ | --------- | ------- |
| `chevronLeft`  | `chevron-left`  | Chevrons are on the right by default | `boolean` | `false` |
| `hasContainer` | `has-container` | Accordion container border           | `boolean` | `false` |
| `open`         | `open`          | Accordion is closed by default       | `boolean` | `false` |


## Events

| Event    | Description                           | Type                                         |
| -------- | ------------------------------------- | -------------------------------------------- |
| `toggle` | Emitted when the accordion is toggled | `CustomEvent<OrionAccordionToggleEventData>` |


## Slots

| Slot                       | Description                       |
| -------------------------- | --------------------------------- |
| `"orion-accordion-header"` | slot for accordion header content |
| `"orion-accorion-panel"`   | slot for accordion panel content  |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
