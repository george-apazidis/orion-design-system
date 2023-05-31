# orion-textarea

Textarea is a component that displays a textarea. It is used to display textareas in forms. Use in conjunction with `orion-label`, `orion-error` and `orion-note` components.

Additional documentation available at [orion.united.com](https://orion.united.com/)

<!-- Auto Generated Below -->


## Properties

| Property           | Attribute           | Description                                                                                                 | Type      | Default  |
| ------------------ | ------------------- | ----------------------------------------------------------------------------------------------------------- | --------- | -------- |
| `autocorrect`      | `autocorrect`       | * Same as for [HTML `textarea` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) | `string`  | `'off'`  |
| `autofocus`        | `autofocus`         | * Same as for [HTML `textarea` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) | `boolean` | `false`  |
| `cols`             | `cols`              | * Same as for [HTML `textarea` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) | `number`  | `20`     |
| `disabled`         | `disabled`          | Disables interactions                                                                                       | `boolean` | `false`  |
| `error`            | `error`             | Shows error state                                                                                           | `boolean` | `false`  |
| `form`             | `form`              | * Same as for [HTML `textarea` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) | `string`  | `''`     |
| `maxLength`        | `max-length`        | * Same as for [HTML `textarea` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) | `number`  | `524288` |
| `minLength`        | `min-length`        | * Same as for [HTML `textarea` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) | `number`  | `0`      |
| `name`             | `name`              | * Same as for [HTML `textarea` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) | `string`  | `''`     |
| `placeholder`      | `placeholder`       | The input placeholder                                                                                       | `string`  | `''`     |
| `readonly`         | `readonly`          | * Same as for [HTML `textarea` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) | `boolean` | `false`  |
| `required`         | `required`          | Required attribute                                                                                          | `boolean` | `false`  |
| `resize`           | `resize`            | Shows the resize option                                                                                     | `boolean` | `false`  |
| `resizeHorizontal` | `resize-horizontal` | Shows the resize horizonal-only option                                                                      | `boolean` | `false`  |
| `resizeVertical`   | `resize-vertical`   | Shows the resize vertical-only option                                                                       | `boolean` | `false`  |
| `rows`             | `rows`              | * Same as for [HTML `textarea` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) | `number`  | `2`      |
| `spellcheck`       | `spellcheck`        | * Same as for [HTML `textarea` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) | `boolean` | `false`  |
| `value`            | `value`             | The input value                                                                                             | `string`  | `''`     |
| `wrap`             | `wrap`              | * Same as for [HTML `textarea` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) | `string`  | `'soft'` |


## Events

| Event          | Description                                | Type                              |
| -------------- | ------------------------------------------ | --------------------------------- |
| `valueChanged` | CustomEvent `detail` will be the new value | `CustomEvent<{ value: string; }>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
