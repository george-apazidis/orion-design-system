# Storybook Code Preview

The code previews present within storybook are created using decorators. This is a way to modify stories, and add extra external elements.

Currently `preview.js` is exporting an array called `decorators`, each item is a function that has a `story` parameter. Calling `story()` will return the string used for the story. Using this, we can then add extra markup, scripts, and styling to each story - as well as use Regex to alter the component names to fit different frameworks.


## Adding a new language variant

1. Add in another two html lines:

```
<input aria-label="Show <language> code" class="CodePreview__input CodePreview__input--<language>" type="radio" name="code-${uuid}" id="<language>-${uuid}" />
<span class="CodePreview__code">
  <label for="<language>-${uuid}" class="CodePreview__label CodePreview__label--<language>"><language></label>
  <pre class="PrismCode__outer-wrapper">
    <code class="PrismCode__inner-wrapper">${prism.highlight(<altered-story-code>, Prism.languages.html)}</code>
  </pre>
  <button class="CodePreview__copy">Copy</button>
</span>
```

> The `CodePreview__code` span + children should be on one line to remove any weird whitespace that prism / pre / code elements pick up. Broken down onto multiple lines for readability here.

> Make sure to keep the order of `input` + `span`, as the css uses that explicit relation

2. Replace `<language>` with something unique (ie `react`)
3. Replace `<altered-story-code>` with the code string for that language
4. Update `packages/orion-design-system/.storybook/code.scss` with a new variant for the `CodePreview__label` class (+ recompile scss).

```
&--<language> {
  left: calc(var(--left-input-spacing, 0px) + <left-offset>px);
  &::after {
    content: '<language>';
  }
}
```

> Left-offset is dependant on where you want the language to appear on the lower left-hand side. Most likely you'll also have to update the left-offset for the `--hide` variant.