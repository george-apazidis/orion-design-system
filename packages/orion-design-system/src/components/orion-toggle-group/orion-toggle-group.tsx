import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'orion-toggle-group',
  styleUrl: 'orion-toggle-group.css',
  shadow: true,
})
export class OrionToggleGroup {
  /**
   * The inline state of the toggle group
   */
  @Prop() inline = false;

  /**
   * Justify the content of the toggle group
   */
  @Prop() justify = false;

  /**
   * Disable all toggles in group
   */
  @Prop() disabled = false;

  slotEl!: HTMLSlotElement;

  /**
   * A getter that returns an array of `orion-toggles` that are in the slot
   */
  get toggles(): HTMLOrionToggleElement[] {
    // assignedElements gets the elements inside of a slot
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLSlotElement/assignedElements
    return this.slotEl.assignedElements().filter((element): element is HTMLOrionToggleElement => element.tagName === 'ORION-TOGGLE');
  }

  componentDidLoad() {
    if (this.disabled) {
      this.setToggleGroupDisabled();
    }
    if (this.justify) {
      this.setToggleGroupJustify();
    }
  }

  /**
   * Disable all toggless in group
   */
  setToggleGroupDisabled() {
    this.toggles.forEach(toggle => {
      toggle.setAttribute('disabled', '');
    });
  }

  /**
   * Justify the content of the toggle group
   */
  setToggleGroupJustify() {
    this.toggles.forEach(toggle => {
      toggle.setAttribute('justify', '');
    });
  }

  render() {
    return (
      <Host>
        <span
          class={`orion-toggle-group 
          ${this.inline ? 'orion-toggle-group--inline' : ''}`}
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
