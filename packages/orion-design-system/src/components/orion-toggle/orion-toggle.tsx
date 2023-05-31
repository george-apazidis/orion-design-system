import { Component, h, Prop, Event, EventEmitter, Element } from '@stencil/core';

/**
 * @slot default - default slot for the toggle label
 */

@Component({
  tag: 'orion-toggle',
  styleUrl: 'orion-toggle.css',
  shadow: true,
})
export class OrionToggle {
  @Element() el!: HTMLElement;

  /**
   * The input value
   */
  @Prop({ mutable: true }) value = '';

  /**
   * The checked state of the toggle
   */
  @Prop() checked = false;

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

  private onToggleChangeValue(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
    this.valueChanged.emit({ value: this.value, checked: (event.target as HTMLInputElement).checked });
  }

  /**
   * Justify the content of the toggle and label
   */
  @Prop() justify = false;

  getCSSStyle() {
    if (this.justify) {
      return {
        width: '100%',
      };
    }
    return {};
  }

  render() {
    return (
      <label
        class={`orion-toggle 
          ${this.disabled ? 'orion-toggle--disabled' : ''}`}
        style={this.getCSSStyle()}
      >
        <slot />
        <input type="checkbox" name={this.name} disabled={this.disabled} value={this.value} checked={this.checked} onInput={this.onToggleChangeValue.bind(this)} />
        <span class="orion-toggle__input"></span>
      </label>
    );
  }
}
