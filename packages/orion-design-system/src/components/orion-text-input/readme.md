# orion-text-input

Text input is a component that allows users to enter text. It is used to display text inputs in forms. Use in conjunction with `orion-label`, `orion-error` and `orion-note` components.

Additional documentation available at [orion.united.com](https://orion.united.com/)

<!-- Auto Generated Below -->


## Properties

| Property       | Attribute      | Description                                                                                           | Type                                                                        | Default  |
| -------------- | -------------- | ----------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | -------- |
| `autocomplete` | `autocomplete` | * Same as for [HTML `input` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) | `string`                                                                    | `''`     |
| `dirname`      | `dirname`      | * Same as for [HTML `input` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) | `string`                                                                    | `''`     |
| `disabled`     | `disabled`     | Disables interactions                                                                                 | `boolean`                                                                   | `false`  |
| `error`        | `error`        | Shows error state                                                                                     | `boolean`                                                                   | `false`  |
| `form`         | `form`         | * Same as for [HTML `input` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) | `string`                                                                    | `''`     |
| `list`         | `list`         | * Same as for [HTML `input` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) | `string`                                                                    | `''`     |
| `maxlength`    | `maxlength`    | * Same as for [HTML `input` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) | `number`                                                                    | `524288` |
| `minlength`    | `minlength`    | * Same as for [HTML `input` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) | `number`                                                                    | `0`      |
| `multiple`     | `multiple`     | * Same as for [HTML `input` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) | `boolean`                                                                   | `false`  |
| `name`         | `name`         | * Same as for [HTML `input` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) | `string`                                                                    | `''`     |
| `pattern`      | `pattern`      | * Same as for [HTML `input` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) | `string`                                                                    | `''`     |
| `placeholder`  | `placeholder`  | The input placeholder                                                                                 | `string`                                                                    | `''`     |
| `readonly`     | `readonly`     | * Same as for [HTML `input` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) | `boolean`                                                                   | `false`  |
| `required`     | `required`     | Required attribute                                                                                    | `boolean`                                                                   | `false`  |
| `type`         | `type`         | The input type                                                                                        | `"email" \| "number" \| "password" \| "search" \| "tel" \| "text" \| "url"` | `'text'` |
| `value`        | `value`        | The input value                                                                                       | `string`                                                                    | `''`     |


## Events

| Event          | Description                                | Type                              |
| -------------- | ------------------------------------------ | --------------------------------- |
| `valueChanged` | CustomEvent `detail` will be the new value | `CustomEvent<{ value: string; }>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
