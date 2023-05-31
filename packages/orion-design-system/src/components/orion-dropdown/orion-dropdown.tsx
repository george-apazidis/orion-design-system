import { Component, h, Prop, Event, EventEmitter, Listen, Element } from '@stencil/core';

import classnames from 'classnames';
import { generateUUID } from '../../utils/utils';

@Component({
  tag: 'orion-dropdown',
  styleUrl: 'orion-dropdown.css',
  shadow: true,
})
export class OrionDropdown {
  /**
   * form name of dropdown
   */
  @Prop() name = 'dropdown';

  /**
   * value of currently selected option
   */
  @Prop({ mutable: true }) value = '';

  slotEl!: HTMLSlotElement;

  /**
   * Disabled state of dropdown
   */
  @Prop() disabled = false;

  /**
   * Required attribute
   */
  @Prop() required = false;

  /**
   * Error state of dropdown
   */
  @Prop() error = false;

  /*
   * Placeholder text for dropdown
   */
  @Prop() placeholder = '';

  /*
   * Dropdown summary
   */
  @Prop({ mutable: true }) summary = '';

  /*
   * Is dropdown open
   */
  @Prop({ reflect: true, mutable: true }) isOpen = false;

  @Element() el!: HTMLElement;

  mouseDown = false;

  listBoxUID = '';

  /**
   * A getter that returns an array of `orion-dropdown-options` that are in the slot
   */
  get dropdownOptions(): HTMLOrionDropdownOptionElement[] {
    // assignedElements gets the elements inside of a slot
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLSlotElement/assignedElements
    return this.slotEl.assignedElements().filter((element): element is HTMLOrionDropdownOptionElement => element.tagName === 'ORION-DROPDOWN-OPTION');
  }

  /**
   * Emits event that users can listen to
   */
  @Event() valueChanged!: EventEmitter<{ value: string; id?: string }>;

  /**
   * Listen to the `dropdownOptionChanged` event emitted by the
   * `orion-dropdown-option` component and update
   */
  @Listen('dropdownOptionChanged')
  onOptionChanged(event: CustomEvent<{ value: string; label: string }>) {
    this.setDropdownOptionStateByValue(event.detail.value);
    this.isOpen = false;
  }

  // Initialize summary text to placeholder text
  componentWillLoad() {
    this.summary = this.placeholder;
    this.listBoxUID = generateUUID();
  }

  /**
   * When the component is initially loaded, set the checked
   * dropdown option according to `value` and update the `name`
   */
  componentDidLoad() {
    this.setDropdownOptionStateByValue(this.value);
    this.setDropdownOptionName();
    this.makeFirstFocusableIfNoneChecked();
  }

  /**
   * Check to see if any dropdown options are checked.
   * If not, make the first one focusable
   */
  makeFirstFocusableIfNoneChecked() {
    const hasAnyChecked = this.dropdownOptions.some(option => option.checked);
    const hasCheckedDisabled = this.dropdownOptions.some(option => option.checked && option.disabled);
    if (!hasAnyChecked || hasCheckedDisabled) {
      const firstButton = this.dropdownOptions[0];
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
    this.valueChanged.emit({ value, id: this.el.id });
  }

  /**
   * Set the name on all the dropdown options
   */
  setDropdownOptionName() {
    this.dropdownOptions.forEach(option => {
      option.setAttribute('name', this.name);
    });
  }

  /**
   * Set the dropdown option with the selected value to be checked.
   * All other dropdown options will be unchecked
   */
  setDropdownOptionStateByValue(selectedValue: string) {
    this.dropdownOptions.forEach(option => {
      const isSelected = option.value === selectedValue;
      option.checked = isSelected;
      if (!option.disabled) {
        option.focusable = isSelected;
      }
      if (isSelected) {
        this.updateValue(option.value);
        this.getSummary(option.value, option.label);
      }
    });
  }

  /**
   * Set the summary text based on the selected value
   */
  getSummary(value: string, label: string) {
    this.dropdownOptions.forEach(option => {
      const isSelected = option.value === value;
      if (isSelected) {
        this.summary = label;
      }
    });
  }

  /**
   * Set the dropdown option at the selected index to be checked.
   * All other dropdown options will be unchecked
   */
  setDropdownOptionStateByIndex(selectedIndex: number) {
    this.dropdownOptions.forEach((option, optionIndex) => {
      const isSelected = optionIndex === selectedIndex;
      option.checked = isSelected;
      if (!option.disabled) {
        option.focusable = isSelected;
      }

      if (isSelected) {
        this.updateValue(option.value);
        this.getSummary(option.value, option.label);
      }
    });
  }

  /**
   *
   * Gets the index of the currently checked dropdown option
   */
  getCheckedIndex() {
    const currentActiveTrigger = this.dropdownOptions.find(element => element.checked);
    return currentActiveTrigger ? this.dropdownOptions.indexOf(currentActiveTrigger) : -1;
  }

  /**
   * Move checked to the next dropdown option
   */
  nextOption() {
    const currentIndex = this.getCheckedIndex();
    const nextIndex = currentIndex < this.dropdownOptions.length - 1 ? currentIndex + 1 : 0;
    if (!this.dropdownOptions[nextIndex].disabled) {
      this.setDropdownOptionStateByIndex(nextIndex);
    }
  }

  /**
   * Move checked to the previous dropdown option
   */
  prevOption() {
    const currentIndex = this.getCheckedIndex();
    const nextIndex = currentIndex <= 0 ? this.dropdownOptions.length - 1 : currentIndex - 1;
    if (!this.dropdownOptions[nextIndex].disabled) {
      this.setDropdownOptionStateByIndex(nextIndex);
    }
  }

  /**
   * Handle keyboard navigation, move to previous/next dropdown option
   */
  @Listen('keydown')
  handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      this.isOpen = true;
      this.nextOption();
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      this.isOpen = true;
      this.prevOption();
    } else if (event.key === 'Escape' || event.key === 'Tab' || event.key === 'Enter') {
      this.isOpen = false;
    }
  }

  /**
   * Close dropdown when clicking outside of dropdown, otherwise toggle isOpen
   */
  @Listen('click', { target: 'window' })
  closeDropdown(event: PointerEvent) {
    const path = event.composedPath();
    const isFromWithin = path.includes(this.el);

    if (event.pointerId === -1) return;

    if (!isFromWithin) {
      this.isOpen = false;
    } else {
      this.isOpen = !this.isOpen;
    }
  }

  getDropdownClass = () => {
    return classnames(
      'orion-dropdown', // this class is always applied
      {
        'orion-dropdown--disabled': this.disabled, // this class is applied if the disabled prop is true
        'orion-dropdown--error': this.error, // this class is applied if the error prop is true
        'orion-dropdown-isOpen': this.isOpen, // this class is applied if the isOpen prop is true
      },
    );
  };

  getChevronClass = () => {
    return classnames(
      'orion-dropdown__chevron', // this class is always applied
      {
        'orion-dropdown__chevron--disabled': this.disabled, // this class is applied if the disabled prop is true
        'orion-dropdown__chevron--error--isClosed': this.error && !this.isOpen, // this class is applied if the error prop is true and the isOpen prop is false
        'orion-dropdown__chevron--isClosed': !this.isOpen && !this.error, // this class is applied if the isOpen prop is false and the error prop is false
        'orion-dropdown__chevron--isOpen': this.isOpen && !this.disabled, // this class is applied if the isOpen prop is true and the disabled prop is false
      },
    );
  };

  render() {
    return (
      <div class="orion-dropdown__container">
        <details class={this.getDropdownClass() as string} open={this.isOpen}>
          <summary
            class={this.summary === this.placeholder ? 'orion-dropdown__placeholder' : 'orion-dropdown__value'}
            tabIndex={this.disabled ? -1 : 0}
            aria-controls={this.listBoxUID}
            aria-expanded={this.isOpen ? 'true' : 'false'}
          >
            {this.summary}
          </summary>
          <fieldset class="orion-dropdown__listbox" disabled={this.disabled} id={this.listBoxUID}>
            <div role="listbox">
              <slot
                ref={el => {
                  this.slotEl = el as HTMLSlotElement;
                }}
              ></slot>
            </div>
          </fieldset>
        </details>
        <div class={this.getChevronClass() as string}></div>
      </div>
    );
  }
}
