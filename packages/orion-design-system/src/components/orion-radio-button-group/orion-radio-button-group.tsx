import { Component, Host, h, Listen, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'orion-radio-button-group',
  styleUrl: 'orion-radio-button-group.css',
  shadow: true,
})
export class OrionRadioButtonGroup {
  /**
   * form name of radio buttons
   */
  @Prop() name = 'radiogroup';

  /**
   * value of currently checked radio button
   */
  @Prop({ mutable: true }) value = '';

  slotEl!: HTMLSlotElement;

  /**
   * Disabled radio group
   */
  @Prop() disabled = false;

  /**
   * Required attribute
   */
  @Prop() required = false;

  /**
   * The inline display of the radio group
   */
  @Prop() inline = false;

  /**
   * A getter that returns an array of `orion-radio-buttons` that are in the slot
   */
  get radioButtons(): HTMLOrionRadioButtonElement[] {
    // assignedElements gets the elements inside of a slot
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLSlotElement/assignedElements
    return this.slotEl.assignedElements().filter((element): element is HTMLOrionRadioButtonElement => element.tagName === 'ORION-RADIO-BUTTON');
  }

  /**
   * Emits event that users can listen to
   */
  @Event() valueChanged!: EventEmitter<{ value: string }>;

  /**
   * Listen to the `radioButtonChanged` event emitted by the
   * `orion-radio-button` component and update
   */
  @Listen('radioButtonChanged')
  onRadioChanged(event: CustomEvent<{ value: string }>) {
    this.setRadioButtonStateByValue(event.detail.value);
  }

  /**
   * When the component is initially loaded, set the checked
   * radio button according to `value` and update the `name`
   */
  componentDidLoad() {
    this.setRadioButtonStateByValue(this.value);
    this.setRadioButtonName();
    this.makeFirstFocusableIfNoneChecked();
    if (this.disabled) {
      this.setRadioButtonGroupDisabled();
    }
  }

  /**
   * Check to see if any radio buttons are checked.
   * If not, make the first one focusable
   */
  makeFirstFocusableIfNoneChecked() {
    const hasAnyChecked = this.radioButtons.some(radio => radio.checked);
    const hasCheckedDisabled = this.radioButtons.some(radio => radio.checked && radio.disabled);
    if (!hasAnyChecked || hasCheckedDisabled) {
      const firstButton = this.radioButtons[0];
      if (firstButton) {
        firstButton.focusable = true;
      }
    }
  }

  /**
   * Update value and emit update
   */
  updateValue(value: string) {
    this.value = value;
    this.valueChanged.emit({ value });
  }

  /**
   * Set the name on all the radio buttons
   */
  setRadioButtonName() {
    this.radioButtons.forEach(radio => {
      radio.setAttribute('name', this.name);
    });
  }

  /**
   * Disable all radio buttons in group
   */
  setRadioButtonGroupDisabled() {
    this.radioButtons.forEach(radio => {
      radio.setAttribute('disabled', '');
    });
  }

  /**
   * Set the radio button with the selected value to be checked.
   * All other radio buttons will be unchecked
   */
  setRadioButtonStateByValue(selectedValue: string) {
    this.radioButtons.forEach(radio => {
      const isSelected = radio.value === selectedValue;
      radio.checked = isSelected;
      if (!radio.disabled) {
        radio.focusable = isSelected;
      }
      if (isSelected) {
        this.updateValue(radio.value);
      }
    });
  }

  /**
   * Set the radio button at the selected index to be checked.
   * All other radio buttons will be unchecked
   */
  setRadioButtonStateByIndex(selectedIndex: number) {
    this.radioButtons.forEach((radio, radioIndex) => {
      const isSelected = radioIndex === selectedIndex;
      radio.checked = isSelected;
      if (!radio.disabled) {
        radio.focusable = isSelected;
      }

      if (isSelected) {
        this.updateValue(radio.value);
      }
    });
  }

  /**
   *
   * Gets the index of the currently checked radio button
   */
  getCheckedIndex() {
    const currentActiveTrigger = this.radioButtons.find(element => element.checked);
    return currentActiveTrigger ? this.radioButtons.indexOf(currentActiveTrigger) : -1;
  }

  /**
   * Move checked to the next radio button
   */
  nextRadio() {
    const currentIndex = this.getCheckedIndex();
    const nextIndex = currentIndex < this.radioButtons.length - 1 ? currentIndex + 1 : 0;
    this.setRadioButtonStateByIndex(nextIndex);
  }

  /**
   * Move checked to the previous radio button
   */
  prevRadio() {
    const currentIndex = this.getCheckedIndex();
    const nextIndex = currentIndex <= 0 ? this.radioButtons.length - 1 : currentIndex - 1;
    this.setRadioButtonStateByIndex(nextIndex);
  }

  /**
   * Handle keyboard navigation, move to previous/next radio button
   */
  @Listen('keydown')
  handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      this.nextRadio();
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      this.prevRadio();
    }
  }

  render() {
    return (
      <Host tabindex={this.disabled ? '-1' : '0'}>
        <fieldset
          class={`orion-radio-group 
            ${this.inline ? 'orion-radio-group--inline' : ''}`}
        >
          <slot
            ref={el => {
              this.slotEl = el as HTMLSlotElement;
            }}
          ></slot>
        </fieldset>
      </Host>
    );
  }
}
