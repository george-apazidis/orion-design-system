import { Component, h, Prop, Event, EventEmitter, Watch, Element } from '@stencil/core';

/**
 * @slot default - default slot for the dropdown option label
 */

@Component({
  tag: 'orion-dropdown-option',
  styleUrl: 'orion-dropdown-option.css',
  shadow: true,
})
export class OrionDropdownOption {
  /**
   * The input name
   */
  @Prop() name = 'dropdown-option';

  /**
   * Disables interactions
   */
  @Prop() disabled = false;

  /**
   * The input value
   */
  @Prop({ mutable: true }) value = '';

  /**
   * The label for the input element passed in as a slot
   */
  @Prop({ mutable: true }) label = '';

  /**
   * The checked state of the dropdown option
   */
  @Prop({ mutable: true }) checked = false;

  /**
   * Required attribute
   */
  @Prop() required = false;

  /**
   * Emit `dropdownOptionChanged` event that `orion-dropdown` can listen for
   */
  @Event() dropdownOptionChanged!: EventEmitter<{ value: string; label: string; checked: boolean }>;

  onDropdownOptionChangeValue() {
    this.checked = true;
    this.dropdownOptionChanged.emit({ value: this.value, label: this.label, checked: this.checked });
  }

  /**
   * Focuses the dropdown option
   */
  @Prop({ reflect: true }) focusable = false;

  inputEl!: HTMLInputElement;

  /**
   * Get the text content of the slot and assign to label prop
   */
  @Element() el!: HTMLElement;

  componentWillLoad() {
    this.label = this.el.innerHTML;
  }

  /**
   * The `orion-dropdown` component will toggle the checked prop
   */
  @Watch('checked')
  watchChecked(newValue: boolean, oldValue: boolean) {
    if (newValue !== oldValue) {
      this.inputEl.checked = newValue;
    }
  }

  render() {
    return (
      <label>
        <input
          type="radio"
          name={this.name}
          disabled={this.disabled}
          checked={this.checked}
          tabIndex={-1}
          aria-selected={this.checked ? 'true' : 'false'}
          role="option"
          value={this.value}
          ref={el => {
            this.inputEl = el as HTMLInputElement;
          }}
          onChange={this.onDropdownOptionChangeValue.bind(this)}
        />
        <span
          class={`orion-dropdown__option 
        ${this.disabled ? 'orion-dropdown__option--disabled' : ''}`}
        >
          <slot />
        </span>
      </label>
    );
  }
}
