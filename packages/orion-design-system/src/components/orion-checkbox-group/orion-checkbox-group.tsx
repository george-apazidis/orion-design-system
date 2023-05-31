import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'orion-checkbox-group',
  styleUrl: 'orion-checkbox-group.css',
  shadow: true,
})
export class OrionCheckboxGroup {
  /**
   *
   * The inline state of the checkbox group
   */
  @Prop() inline = false;

  /**
   * Disable all checkboxes in group
   */
  @Prop() disabled = false;

  slotEl!: HTMLSlotElement;

  /**
   * A getter that returns an array of `orion-toggles` that are in the slot
   */
  get checkboxes(): HTMLOrionCheckboxElement[] {
    // assignedElements gets the elements inside of a slot
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLSlotElement/assignedElements
    return this.slotEl.assignedElements().filter((element): element is HTMLOrionCheckboxElement => element.tagName === 'ORION-CHECKBOX');
  }

  componentDidLoad() {
    if (this.disabled) {
      this.setCheckboxGroupDisabled();
    }
  }

  /**
   * Disable all checkboxes in group
   */
  setCheckboxGroupDisabled() {
    this.checkboxes.forEach(checkbox => {
      checkbox.setAttribute('disabled', '');
    });
  }

  render() {
    return (
      <Host>
        <span
          class={`orion-checkbox-group
          ${this.inline ? 'orion-checkbox-group--inline' : ''}`}
        >
          <slot
            ref={el => {
              this.slotEl = el as HTMLSlotElement;
            }}
          ></slot>
        </span>
      </Host>
    );
  }
}
