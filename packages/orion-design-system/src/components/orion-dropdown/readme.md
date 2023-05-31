# orion-dropdown

Dropdown is a component that allows users to select one option from a set.

Additional documentation available at [orion.united.com](https://orion.united.com/)

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                        | Type      | Default      |
| ------------- | ------------- | ---------------------------------- | --------- | ------------ |
| `disabled`    | `disabled`    | Disabled state of dropdown         | `boolean` | `false`      |
| `error`       | `error`       | Error state of dropdown            | `boolean` | `false`      |
| `isOpen`      | `is-open`     |                                    | `boolean` | `false`      |
| `name`        | `name`        | form name of dropdown              | `string`  | `'dropdown'` |
| `placeholder` | `placeholder` |                                    | `string`  | `''`         |
| `required`    | `required`    | Required attribute                 | `boolean` | `false`      |
| `summary`     | `summary`     |                                    | `string`  | `''`         |
| `value`       | `value`       | value of currently selected option | `string`  | `''`         |


## Events

| Event          | Description                          | Type                                                        |
| -------------- | ------------------------------------ | ----------------------------------------------------------- |
| `valueChanged` | Emits event that users can listen to | `CustomEvent<{ value: string; id?: string \| undefined; }>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
