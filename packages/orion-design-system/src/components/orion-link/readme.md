# orion-link

Link is an accessible element used for navigation. It is also known as `Anchor`, `<a>`, `Text Link` or `Hyperlink`. Using an `<a>` tag is an acceptable way to render a text link, but this component is also available with additional options. This component is styled to resemble a hyperlink and semantically renders an `<a>`. Links are visually similar to tertiary buttons, but are semantically different, which matters for accessibility. Use a link when you want to navigate the user to a different location. Use a button when you want to cause a change in either back-end or the front-end of the website. (A "Log in" link will navigate the user to a form, a "Log in" button will submit the form and log the user into the application.). All links can have a subtle quiet style, without an underline. This style should only be used when the placement and context of the link is explicit enough that a visible underline is not necessary. Color alone is not enough context to meet accessibility requirements. Commonly used in footer navigation. A link can be disabled by removing the `href` or adding the `disabled` prop. Additional documentation available at [orion.united.com](https://orion.united.com/)

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description             | Type                                                        | Default   |
| ------------- | -------------- | ----------------------- | ----------------------------------------------------------- | --------- |
| `disabled`    | `disabled`     | The link disabled state | `boolean`                                                   | `false`   |
| `download`    | `download`     | The link download       | `string`                                                    | `''`      |
| `href`        | `href`         | The link href           | `string`                                                    | `''`      |
| `iconLeft`    | `icon-left`    | The icon position       | `boolean`                                                   | `false`   |
| `iconName`    | `icon-name`    | The icon name           | `string`                                                    | `''`      |
| `noUnderline` | `no-underline` | No underline            | `boolean`                                                   | `false`   |
| `rel`         | `rel`          | The link rel            | `string`                                                    | `''`      |
| `target`      | `target`       | The link target         | `"_blank" \| "_parent" \| "_self" \| "_top" \| "framename"` | `'_self'` |


## CSS Custom Properties

| Name                         | Description                            |
| ---------------------------- | -------------------------------------- |
| `--orion-link-color`         | value of the color property            |
| `--orion-link-color--active` | value of the color property on active  |
| `--orion-link-color--hover`  | value of the color property on hover   |
| `--orion-link-font-size`     | value of the font-size property        |
| `--orion-link-font-style`    | value of the font-style property       |
| `--orion-link-font-weight`   | value of the font-weight property      |
| `--orion-link-icon-left`     | value of the left property of the icon |
| `--orion-link-icon-top`      | value of the top property of the icon  |
| `--orion-link-line-height`   | value of the line-height property      |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
