import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';

import classnames from 'classnames';

@Component({
  tag: 'orion-textarea',
  styleUrl: 'orion-textarea.css',
  shadow: true,
})
export class OrionTextarea {
  /**
   * Disables interactions
   */
  @Prop() disabled = false;

  /**
   * Required attribute
   */
  @Prop() required = false;

  /**
   * Shows error state
   */
  @Prop() error = false;

  /**
   * The input value
   */
  @Prop({ mutable: true }) value = '';

  /**
   * The input placeholder
   */
  @Prop() placeholder = '';

  /**
   * Shows the resize option
   */
  @Prop() resize = false;

  /**
   * Shows the resize horizonal-only option
   */
  @Prop() resizeHorizontal = false;

  /**
   * Shows the resize vertical-only option
   */
  @Prop() resizeVertical = false;

  /**
   * * Same as for [HTML `textarea` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea)
   */
  @Prop() autocorrect = 'off';

  /**
   * * Same as for [HTML `textarea` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea)
   */
  @Prop() autofocus = false;

  /**
   * * Same as for [HTML `textarea` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea)
   */
  @Prop() cols = 20;

  /**
   * * Same as for [HTML `textarea` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea)
   */
  @Prop() form = '';

  /**
   * * Same as for [HTML `textarea` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea)
   */
  @Prop() maxLength = 524288;

  /**
   * * Same as for [HTML `textarea` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea)
   */
  @Prop() minLength = 0;

  /**
   * * Same as for [HTML `textarea` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea)
   */
  @Prop() name = '';

  /**
   * * Same as for [HTML `textarea` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea)
   */
  @Prop() readonly = false;

  /**
   * * Same as for [HTML `textarea` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea)
   */
  @Prop() rows = 2;

  /**
   * * Same as for [HTML `textarea` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea)
   */
  @Prop() spellcheck = false;

  /**
   * * Same as for [HTML `textarea` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea)
   */
  @Prop() wrap = 'soft';

  /**
   * CustomEvent `detail` will be the new value
   */
  @Event() valueChanged!: EventEmitter<{ value: string }>;

  private onInputChangeValue(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
    this.valueChanged.emit({ value: this.value });
  }

  getCSSClass() {
    return classnames(
      '', // this class is always applied
      {
        'orion-textarea--error orion-textarea--resize': this.error && this.resize, // this class is applied if the error prop is true and the resize prop is true
        'orion-textarea--error orion-textarea--resizeX': this.error && this.resizeHorizontal, // this class is applied if the error prop is true and the resize horizontal prop is true
        'orion-textarea--error orion-textarea--resizeY': this.error && this.resizeVertical, // this class is applied if the error prop is true and the resize vertical prop is true
        'orion-textarea--error': this.error, // this class is applied if the error prop is true
        'orion-textarea--resize': this.resize, // this class is applied if the resize prop is true
        'orion-textarea--resizeX': this.resizeHorizontal, // this class is applied if the resize horizontal prop is true
        'orion-textarea--resizeY': this.resizeVertical, // this class is applied if the resize vertical prop is true
      },
    );
  }

  render() {
    return (
      <div class="orion-textarea">
        <textarea
          class={!this.disabled ? this.getCSSClass() : ''}
          value={this.value}
          placeholder={this.placeholder}
          disabled={this.disabled}
          required={this.required}
          onInput={this.onInputChangeValue.bind(this)}
          autocorrect={this.autocorrect}
          autofocus={this.autofocus}
          cols={this.cols}
          form={this.form}
          maxLength={this.maxLength}
          minLength={this.minLength}
          name={this.name}
          readOnly={this.readonly}
          rows={this.rows}
          spellcheck={this.spellcheck}
          wrap={this.wrap}
        ></textarea>
      </div>
    );
  }
}
