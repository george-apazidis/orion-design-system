import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';

export type OrionTextInputTypeOptions = 'text' | 'search' | 'url' | 'tel' | 'email' | 'password' | 'number';

@Component({
  tag: 'orion-text-input',
  styleUrl: 'orion-text-input.css',
  shadow: true,
})
export class OrionTextInput {
  /**
   * The input type
   */
  @Prop() type: OrionTextInputTypeOptions = 'text';

  /**
   * The input value
   */
  @Prop({ mutable: true }) value = '';

  /**
   * The input placeholder
   */
  @Prop() placeholder = '';

  /**
   * Disables interactions
   */
  @Prop() disabled = false;

  /**
   * Shows error state
   */
  @Prop() error = false;

  /**
   * Required attribute
   */
  @Prop() required = false;

  /**
   * * Same as for [HTML `input` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)
   */
  @Prop() autocomplete = '';

  /**
   * * Same as for [HTML `input` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)
   */
  @Prop() dirname = '';

  /**
   * * Same as for [HTML `input` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)
   */
  @Prop() form = '';

  /**
   * * Same as for [HTML `input` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)
   */
  @Prop() list = '';

  /**
   * * Same as for [HTML `input` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)
   */
  @Prop() maxlength = 524288;

  /**
   * * Same as for [HTML `input` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)
   */
  @Prop() minlength = 0;

  /**
   * * Same as for [HTML `input` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)
   */
  @Prop() multiple = false;

  /**
   * * Same as for [HTML `input` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)
   */
  @Prop() name = '';

  /**
   * * Same as for [HTML `input` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)
   */
  @Prop() pattern = '';

  /**
   * * Same as for [HTML `input` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)
   */
  @Prop() readonly = false;

  /**
   * CustomEvent `detail` will be the new value
   */
  @Event() valueChanged!: EventEmitter<{ value: string }>;

  private onInputChangeValue(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
    this.valueChanged.emit({ value: this.value });
  }

  render() {
    return (
      <div class="orion-text-input">
        <input
          class={this.error && !this.disabled ? 'orion-text-input--error' : ''}
          type={this.type}
          value={this.value}
          placeholder={this.placeholder}
          disabled={this.disabled}
          required={this.required}
          onInput={this.onInputChangeValue.bind(this)}
          autoComplete={this.autocomplete}
          dirName={this.dirname}
          form={this.form}
          list={this.list}
          maxlength={this.maxlength}
          minlength={this.minlength}
          multiple={this.multiple}
          name={this.name}
          pattern={this.pattern}
          readOnly={this.readonly}
        />
      </div>
    );
  }
}
