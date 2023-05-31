# orion-tabs

Tabs is a component that will display tabs that can be selected. It will automatically hide overflow, but provides click+drag scrolling alongside buttons that will scroll.

Additional documentation available at [orion.united.com](https://orion.united.com/)

<!-- Auto Generated Below -->


## Properties

| Property                    | Attribute                       | Description                                      | Type      | Default   |
| --------------------------- | ------------------------------- | ------------------------------------------------ | --------- | --------- |
| `activeTab`                 | `active-tab`                    | Default and current active tab index             | `number`  | `0`       |
| `minTabWidth`               | `min-tab-width`                 | The minimum width for tabs                       | `string`  | `'104px'` |
| `scrollToStartingActiveTab` | `scroll-to-starting-active-tab` | Component will scroll to the starting active tab | `boolean` | `false`   |


## Events

| Event              | Description                              | Type                                 |
| ------------------ | ---------------------------------------- | ------------------------------------ |
| `orionTabSelected` | Emits event when a tab header is clicked | `CustomEvent<{ tabIndex: number; }>` |


## Slots

| Slot        | Description                     |
| ----------- | ------------------------------- |
| `"default"` | default slot for the tab labels |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
