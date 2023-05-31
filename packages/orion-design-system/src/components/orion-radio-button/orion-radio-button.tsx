import { Component, h, Prop, Event, EventEmitter, Watch } from '@stencil/core';

/**
 * @slot default - default slot for the radio button label
 */

@Component({
  tag: 'orion-radio-button',
  styleUrl: 'orion-radio-button.css',
  shadow: true,
})
export class OrionRadioButton {
  /**
   * The input name
   */
  @Prop() name = 'radio';

  /**
   * Disables interactions
   */
  @Prop() disabled = false;

  /**
   * The input value
   */
  @Prop({ mutable: true }) value = '';

  /**
   * The checked state of the radio button
   */
  @Prop({ mutable: true }) checked = false;

  /**
   * Required attribute
   */
  @Prop() required = false;

  /**
   * Emit `radioButtonChanged` event that `orion-radio-button-group` can listen for
   */
  @Event() radioButtonChanged!: EventEmitter<{ value: string }>;

  onRadioChangeValue() {
    this.checked = true;
    this.radioButtonChanged.emit({ value: this.value });
  }

  /**
   * Focuses the radio button. This method is used internally by the `orion-radio-button-group` component. Do not use it directly. Use the `orion-radio-button-group` component instead.
   */
  @Prop({ reflect: true }) focusable = false;

  inputEl!: HTMLInputElement;

  /**
   * The `orion-radio-button-group` component will toggle the checked prop
   */
  @Watch('checked')
  watchChecked(newValue: boolean, oldValue: boolean) {
    if (newValue !== oldValue) {
      this.inputEl.checked = newValue;
    }
  }

  render() {
    return (
      <label
        class={`orion-radio__label 
          ${this.disabled ? 'orion-radio__label--disabled' : ''}`}
      >
        <span>
          <input
            type="radio"
            name={this.name}
            disabled={this.disabled}
            checked={this.checked}
            tabIndex={-1}
            value={this.value}
            ref={el => {
              this.inputEl = el as HTMLInputElement;
            }}
            onChange={this.onRadioChangeValue.bind(this)}
          />
          <span class="orion-radio__input"></span>
        </span>
        <slot />
      </label>
    );
  }
}
