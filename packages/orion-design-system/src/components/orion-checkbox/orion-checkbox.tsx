import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';

/**
 * @slot default - default slot for the checkbox label
 */

@Component({
  tag: 'orion-checkbox',
  styleUrl: 'orion-checkbox.css',
  shadow: true,
})
export class OrionCheckbox {
  /**
   * The input value
   */
  @Prop({ mutable: true }) value = '';

  /**
   * The checked state of the checkbox
   */
  @Prop({ mutable: true, reflect: true }) checked = false;

  /**
   * The indeterminate state of the checkbox (overridden by checked if both are true)
   */
  @Prop() indeterminate = false;

  /**
   * The input name
   */
  @Prop() name = '';

  /**
   * Disables interactions
   */
  @Prop() disabled = false;

  /**
   * Required attribute
   */
  @Prop() required = false;

  /**
   * CustomEvent `detail` will be the new value
   */
  @Event() valueChanged!: EventEmitter<{ value: string; checked: boolean }>;

  private onCheckboxChangeValue(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
    this.checked = (event.target as HTMLInputElement).checked;
    this.valueChanged.emit({ value: this.value, checked: (event.target as HTMLInputElement).checked });
  }

  render() {
    return (
      <label
        class={`orion-checkbox__label 
          ${this.disabled ? 'orion-checkbox__label--disabled' : ''}
          ${this.indeterminate ? 'orion-checkbox__label--indeterminate' : ''}
          `}
      >
        <span>
          <input type="checkbox" name={this.name} disabled={this.disabled} value={this.value} checked={this.checked} onInput={this.onCheckboxChangeValue.bind(this)} />
          <span class="orion-checkbox__input"></span>
        </span>
        <slot />
      </label>
    );
  }
}
