# orion-header

The header component spans the full width of the viewport and is the topmost element in the UI shell. It typically contains the product logo, navigation, and other utilities. Use the orion-nav-button component for icon buttons in the header.

Additional documentation available at [orion.united.com](https://orion.united.com/)',

<!-- Auto Generated Below -->


## Properties

| Property           | Attribute           | Description                                                  | Type                            | Default             |
| ------------------ | ------------------- | ------------------------------------------------------------ | ------------------------------- | ------------------- |
| `heading`          | `heading`           | Application/page title heading                               | `string`                        | `''`                |
| `headingPlacement` | `heading-placement` | Heading placement (left, center, right). Defaults to center. | `"center" \| "left" \| "right"` | `'center'`          |
| `logoAlt`          | `logo-alt`          | Logo alt text                                                | `string`                        | `'United Airlines'` |
| `logoHref`         | `logo-href`         | Logo HREF                                                    | `string \| undefined`           | `''`                |
| `logoPlacement`    | `logo-placement`    | Logo placement (left, center, right). Defaults to left.      | `"center" \| "left" \| "right"` | `'left'`            |
| `noLogo`           | `no-logo`           | Hide logo                                                    | `boolean`                       | `false`             |
| `subheading`       | `subheading`        | Application/page title subheading                            | `string`                        | `''`                |


## Slots

| Slot                    | Description                             |
| ----------------------- | --------------------------------------- |
|                         | Unnamed default slot for header content |
| `"orion-header-center"` | slot for center content                 |
| `"orion-header-left"`   | slot for left content                   |
| `"orion-header-right"`  | slot for right content                  |


## CSS Custom Properties

| Name                               | Description                                                                                    |
| ---------------------------------- | ---------------------------------------------------------------------------------------------- |
| `--orion-header-height-desktop`    | Height of header on desktop (default is 80px)                                                  |
| `--orion-header-height-mobile`     | Height of header on mobile (default is 60px)                                                   |
| `--orion-header-padding-x-desktop` | Left/right padding of header on desktop (default is 0px, space defined by logo image)          |
| `--orion-header-padding-x-mobile`  | Left/right padding of header on mobile (default is 0px, space defined by logo image)           |
| `--orion-header-padding-y-desktop` | Top/bottom padding of header on desktop (default is 0px, space defined by logo image)          |
| `--orion-header-padding-y-mobile`  | Top/bottom padding of header on mobile (default is 0px, space defined by logo image)           |
| `--orion-header-vertical-align`    | Alignment of header content. Can be set to center, flex-start or flex-end. (default is center) |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
