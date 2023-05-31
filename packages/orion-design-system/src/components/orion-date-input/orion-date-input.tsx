import { Component, Host, h, Prop, State, Element, Listen, Event, EventEmitter } from '@stencil/core';
import classNames from 'classnames';
import flatpickr from 'flatpickr';
import { Instance } from 'flatpickr/dist/types/instance';
import { BaseOptions, Hook } from 'flatpickr/dist/types/options';

const DATE_SEPARATOR = '|';

export type DateSelectionEvent = {
  startDate?: Date;
  endDate?: Date;
};

type dateValidation = {
  datestring: string;
  minimumDate?: Date;
  maximumDate?: Date;
};

const isCompleteDate = ({ datestring }: dateValidation) => {
  return /^\d{1,2}\/\d{1,2}\/\d{4}$/gi.test(datestring);
};

const isPastMinimumDate = ({ datestring, minimumDate }: dateValidation) => {
  if (!minimumDate) return true;
  const date = new Date(datestring);
  return date.getTime() >= new Date(minimumDate.toDateString()).getTime();
};

const isBeforeMaximumDate = ({ datestring, maximumDate }: dateValidation) => {
  if (!maximumDate) return true;
  const date = new Date(datestring);
  return date.getTime() <= new Date(maximumDate.toDateString()).getTime();
};

const dateValidators: ((data: dateValidation) => boolean)[] = [isCompleteDate, isPastMinimumDate, isBeforeMaximumDate];

/**
 * @slot orion-date-input-first-label - slot for first input's label
 * @slot orion-date-input-second-label - slot for second input's label
 */
@Component({
  tag: 'orion-date-input',
  styleUrl: 'orion-date-input.css',
  shadow: true,
})
export class OrionDateInput {
  @Element() el!: HTMLElement;

  /**
   * Shows two inputs, and calendar is in range mode
   */
  @Prop() range = false;

  /**
   * Placeholder for the date inputs
   */
  @Prop() placeholder = 'mm/dd/yyyy';

  /**
   * Format to be used by the date inputs & calendar
   * Follows spec at https://flatpickr.js.org/formatting/
   */
  @Prop() dateFormat = 'm/d/Y';

  /**
   * Inclusive minimum date (time is removed from limit)
   */
  @Prop({ reflect: true, mutable: true }) minDate?: Date | string;

  /**
   * Inclusive maximum date (time is removed from limit)
   */
  @Prop({ reflect: true, mutable: true }) maxDate?: Date | string;

  /**
   * Makes the calendar show two months
   */
  @Prop() multiMonth = false;

  /**
   * Error state of input
   */
  @Prop() error = false;

  /**
   * Disabled state of input
   */
  @Prop() disabled = false;

  /**
   * Shows the first-label inline with the input
   */
  @Prop() inline = false;

  /**
   * Emits 'orionDateSelected' event when a date is selected
   */
  @Event() orionDateSelected!: EventEmitter<DateSelectionEvent>;

  // is the desktop flatpickr instance open
  @State() isCalendarOpen = false;

  // is the mobile modal open
  @State() isModalOpen = false;

  // current date strings for the two inputs
  @State() dates: string[] = ['', ''];

  // current validity state of the two input strings
  @State() inputValidity: boolean[] = [true, true];

  // options for flatpickr, to be used and passed to modal calendar
  @State() flatpickrConfig: Partial<BaseOptions> = {};

  // is the window less than 769px wide
  @State() isMobile = false;

  @State() firstSlotLabel = '';

  @State() secondSlotLabel = '';

  // input that is controlled / updated by flatpickr
  private dateInput!: HTMLInputElement;

  // button that toggles the flatpickr calendar
  private calendarOpenButton!: HTMLButtonElement;

  // flatpickr object instance that controls the current calendar
  private flatpickrInstance: Instance | null = null;

  hasFirstLabelSlot = false;

  hasSecondLabelSlot = false;

  hasConditionalSlot = false;

  get isValid() {
    const isFirstInputValid = this.dates[0] && this.inputValidity[0];
    const isSecondInputValid = this.dates[1] && this.inputValidity[1];
    return this.range ? isFirstInputValid && isSecondInputValid : isFirstInputValid;
  }

  @Listen('resize', { target: 'window' })
  handleResize() {
    this.setIsMobile();
  }

  private setIsMobile() {
    this.isMobile = window.innerWidth <= 768;
  }

  private toggleCalendar = () => {
    this.isModalOpen = !this.isModalOpen;
    if (!this.isCalendarOpen) {
      this.flatpickrInstance?.open();
    } else {
      this.flatpickrInstance?.close();
    }
  };

  @Listen('closeDateModal')
  closeModal() {
    this.isModalOpen = false;
    this.flatpickrInstance?.close();
    this.isCalendarOpen = false;
  }

  private onCalendarOpen: Hook = (_selectedDates, _, instance) => {
    if (!this.isMobile) {
      if (instance.selectedDateElem) {
        instance.selectedDateElem?.focus();
      } else {
        instance.todayDateElem?.focus();
      }
    }
    this.isCalendarOpen = true;
  };

  private onCalendarClose: Hook = (_selectedDates, _, instance) => {
    if (!this.isMobile) {
      this.calendarOpenButton.focus();
      this.isModalOpen = false;
      setTimeout(() => {
        this.isCalendarOpen = false;
        instance.setDate(this.dates);
      }, 100);
    }
  };

  // hide previous / next month days to match design. This way flatpickr will ignore these elements and not index them for keyboard controls
  private onCalendarDayCreate = (_: any, __: string, ___: any, dayElem: Element) => {
    if (dayElem.classList.contains('nextMonthDay') || dayElem.classList.contains('prevMonthDay')) {
      dayElem.classList.add('flatpickr-disabled');
      dayElem.classList.add('hidden');
    }
  };

  @Listen('selectModalDates')
  onModalDateSelect(event: CustomEvent<{ dates: Date[] }>) {
    if (this.flatpickrInstance) {
      this.onCalendarChange(event.detail.dates, '', this.flatpickrInstance);
    }
  }

  private onCalendarChange: Hook = (dates, _, instance) => {
    if (this.range) {
      const newDates = dates.map(date => instance.formatDate(date, this.dateFormat));
      if (!newDates[1]) newDates[1] = '';
      this.dates = newDates;
    } else {
      this.dates = [instance.formatDate(dates[0], this.dateFormat), ''];
    }
    if (this.isMobile) {
      this.flatpickrInstance?.setDate(dates);
    }
    this.checkDateValidaty();

    this.orionDateSelected.emit({
      startDate: dates[0],
      endDate: dates[1],
    });
  };

  private adjustForSlashes = (datestring: string, input: HTMLInputElement) => {
    let adjustedString = datestring;
    // append a forward slash to the cases:
    // '##' | '#/##' | '##/##'
    if (/^\d{2}$/gi.test(datestring) || /^\d{1,2}\/\d{2}$/gi.test(adjustedString)) {
      adjustedString += '/';
    }
    if (/\/\//gi.test(adjustedString)) {
      const curPos = input.selectionStart ?? 0;
      adjustedString = adjustedString.replace(/\/{2,}/gi, '/');
      input.value = adjustedString;
      // reset cursor after setting input value
      input.selectionEnd = curPos - 1;
    }
    return adjustedString;
  };

  handleOnInput = (e: InputEvent, inputIndex: 0 | 1) => {
    let newDateString = (e.target as HTMLInputElement).value;

    if (e.data) {
      newDateString = this.adjustForSlashes(newDateString, e.target as HTMLInputElement);
    }

    // spread / update array of date strings
    const newDates = [...this.dates];
    newDates[inputIndex] = newDateString;
    this.dates = newDates;

    this.checkDateValidaty();

    this.orionDateSelected.emit({
      startDate: this.dates[0] ? new Date(this.dates[0]) : undefined,
      endDate: this.dates[1] ? new Date(this.dates[1]) : undefined,
    });

    // even if date is invalid, pass it along to flatpickr so that the calendar doesn't keep old date
    this.flatpickrInstance?.setDate(newDates);
  };

  checkDateValidaty = () => {
    const validity = [false, false];
    this.dates.forEach((datestring, i) => {
      const dateToValidate: dateValidation = {
        datestring,
        minimumDate: this.minDate as Date,
        maximumDate: this.maxDate as Date,
      };
      const isValidDate = dateValidators.reduce((isValid, comparitor) => {
        // if already invalid, skip comparison
        if (!isValid || !comparitor(dateToValidate)) return false;
        if (isValid) return true;
        return false;
      }, true);
      validity[i] = isValidDate;
    });
    // if not a range, set second date to always be valid
    if (!this.range) validity[1] = true;
    this.inputValidity = validity;
  };

  private convertMinMaxDates = () => {
    if (typeof this.minDate === 'string') {
      const minDateAsDate = new Date(this.minDate);
      if (minDateAsDate.toString() !== 'Invalid Date') {
        this.minDate = minDateAsDate;
      }
    }

    if (typeof this.maxDate === 'string') {
      const maxDateAsDate = new Date(this.maxDate);
      if (maxDateAsDate.toString() !== 'Invalid Date') {
        this.maxDate = maxDateAsDate;
      }
    }
  };

  componentWillLoad() {
    this.convertMinMaxDates();

    const isMinDateToday = this.minDate ? new Date((this.minDate as Date)?.toDateString()).getTime() === new Date(new Date().toDateString()).getTime() : false;
    const isMaxDateToday = this.maxDate ? new Date((this.maxDate as Date)?.toDateString()).getTime() === new Date(new Date().toDateString()).getTime() : false;

    this.flatpickrConfig = {
      static: true,
      dateFormat: this.dateFormat,
      minDate: isMinDateToday ? 'today' : this.minDate, // flatpickr prefer 'today' over a date object for today
      maxDate: isMaxDateToday ? 'today' : this.maxDate,
      mode: this.range ? 'range' : 'single',
      showMonths: this.multiMonth ? 2 : 1,
      monthSelectorType: 'static',
      nextArrow: '<i class="orion-icon orion-icon-chevron_right"></i>',
      prevArrow: '<i class="orion-icon orion-icon-chevron_left"></i>',
      locale: {
        weekdays: {
          shorthand: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
          longhand: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        },
        rangeSeparator: DATE_SEPARATOR,
      },
      onChange: this.onCalendarChange,
      onOpen: this.onCalendarOpen,
      onClose: this.onCalendarClose,
      onDayCreate: this.onCalendarDayCreate,
    };

    this.setIsMobile();

    this.adjustInputLabelConditionals();
  }

  componentDidLoad() {
    this.isCalendarOpen = false;
    this.flatpickrInstance = flatpickr(this.dateInput, this.flatpickrConfig);

    // disable flatpickr's year input
    this.el.shadowRoot?.querySelectorAll('.numInput.cur-year').forEach(el => {
      el.setAttribute('disabled', 'true');
    });

    this.adjustInputLabelPositioning();
  }

  private adjustInputLabelConditionals = () => {
    const firstLabel = this.el.querySelector('[slot="orion-date-input-first-label"]');
    const secondLabel = this.el.querySelector('[slot="orion-date-input-second-label"]');
    let firstConditional = firstLabel?.querySelector('[slot="orion-label-conditional"]');
    let secondConditional = secondLabel?.querySelector('[slot="orion-label-conditional"]');

    this.hasFirstLabelSlot = Boolean(firstLabel?.textContent);
    this.hasSecondLabelSlot = Boolean(secondLabel?.textContent);

    // apply ids for a11y, and grab label text for mobile modal
    if (firstLabel) {
      firstLabel.id = 'firstInputLabel';
      this.firstSlotLabel = firstLabel.textContent ?? '';
      // remove conditional text if it exists
      const labelConditional = firstLabel.querySelector('[slot="orion-label-conditional"]');
      if (labelConditional?.textContent) this.firstSlotLabel = this.firstSlotLabel.replace(labelConditional.textContent, '');
    }
    if (secondLabel) {
      secondLabel.id = 'secondInputLabel';
      this.secondSlotLabel = secondLabel.textContent ?? '';
      // remove conditional text if it exists
      const labelConditional = secondLabel.querySelector('[slot="orion-label-conditional"]');
      if (labelConditional?.textContent) this.secondSlotLabel = this.secondSlotLabel.replace(labelConditional.textContent, '');
    }

    // if conditional is only within the first label, but we have a second label
    if (secondLabel && firstConditional && !secondConditional) {
      const newSecondConditional = document.createElement(firstConditional.tagName);
      newSecondConditional.innerHTML = firstConditional.innerHTML;
      newSecondConditional.setAttribute('slot', firstConditional.slot);
      secondConditional = newSecondConditional;
      secondLabel?.append(newSecondConditional);
    }

    // if we have 2 labels (w/ conditional only on 2nd)
    if (firstLabel && secondConditional && !firstConditional) {
      const newFirstConditional = document.createElement(secondConditional.tagName);
      newFirstConditional.innerHTML = secondConditional.innerHTML;
      newFirstConditional.setAttribute('slot', secondConditional.slot);
      firstLabel?.append(newFirstConditional);
      firstConditional = newFirstConditional;
    }

    // if we have a first conditional with a second label (which should have a conditional (either from the get go - or copied over here))
    if (firstConditional && secondLabel) {
      firstConditional.classList.add('visually-hidden');
    }
  };

  private adjustInputLabelPositioning = () => {
    const labelHolder = this.el.shadowRoot?.querySelector('.orion-date-input__label');
    const firstLabel = this.el.querySelector('[slot="orion-date-input-first-label"]');
    const secondLabel = this.el.querySelector('[slot="orion-date-input-second-label"]');
    if (firstLabel) {
      labelHolder?.append(firstLabel);
    }
    if (secondLabel) {
      labelHolder?.append(secondLabel);
    }
  };

  private getWrapperClasses = () => {
    return `
      orion-date-input__wrapper
      orion-date-input__wrapper--${this.inline ? 'inline' : 'stacked'}
    `;
  };

  private getDateInputClasses = () => {
    return classNames('orion-date-input__inner-wrapper', 'flatpickr-override', 'flatpickr-override--desktop', {
      'orion-date-input__inner-wrapper--error': this.error,
      'orion-date-input__inner-wrapper--disabled': this.disabled,
    });
  };

  private getButtonCSSClasses = () => {
    return `
      orion-date-input__button
      orion-date-input__button--${this.isCalendarOpen ? 'open' : 'closed'}
    `;
  };

  private getInputCSSClasses = (isActive: boolean) => {
    return `
      orion-date-input__text-input
      orion-date-input__text-input--${this.range && isActive ? 'active' : 'inactive'}
    `;
  };

  private getInputs = () => {
    type Config = {
      dateIndex: 0 | 1;
      isActive: boolean;
      id: string;
      ariaLabelledby: string;
    } | null;
    const inputConfigs: Config[] = [
      {
        dateIndex: 0,
        isActive: !!(this.flatpickrInstance?.isOpen && (this.flatpickrInstance.selectedDates.length === 0 || this.flatpickrInstance.selectedDates.length === 2 || !this.dates[0])),
        id: 'firstInput',
        ariaLabelledby: 'firstInputLabel',
      },
      this.range
        ? {
            dateIndex: 1,
            isActive: !!(this.flatpickrInstance?.isOpen && this.flatpickrInstance.selectedDates.length === 1 && !this.dates[1]),
            id: 'secondInput',
            ariaLabelledby: 'secondInputLabel',
          }
        : null,
    ];
    return inputConfigs.map(config => {
      if (!config) return null;
      return (
        <input
          placeholder={this.placeholder}
          class={this.getInputCSSClasses(config.isActive)}
          type="text"
          disabled={this.disabled}
          value={this.dates[config.dateIndex]}
          onInput={e => {
            this.handleOnInput(e as InputEvent, config.dateIndex);
          }}
          pattern="\d{1,2}/\d{1,2}/\d{4}"
          id={config.id}
          aria-labelledby={config.ariaLabelledby}
          aria-invalid={Boolean(this.error).toString()}
          inputmode="numeric"
        />
      );
    });
  };

  render() {
    return (
      <Host>
        <orion-date-calendar-modal
          isOpen={this.isModalOpen && this.isMobile}
          label={this.range ? 'Roundtrip' : 'One-way'} // change to prop?
          flatpickrConfig={this.flatpickrConfig}
          dates={this.dates}
          range={this.range}
          dateFormat={this.dateFormat}
          firstDateLabel={this.firstSlotLabel}
          secondDateLabel={this.secondSlotLabel}
        ></orion-date-calendar-modal>
        <span class={this.getWrapperClasses()}>
          <div class="orion-date-input__label">
            {this.hasFirstLabelSlot && <slot name="orion-date-input-first-label" />}
            {this.hasSecondLabelSlot && <slot name="orion-date-input-second-label" />}
          </div>
          <div class={this.getDateInputClasses()}>
            <div class="orion-date-input__status" />
            {this.getInputs()}
            <button
              onClick={this.toggleCalendar}
              class={this.getButtonCSSClasses()}
              ref={el => {
                this.calendarOpenButton = el as HTMLButtonElement;
              }}
              disabled={this.disabled}
              aria-label="Opens a calendar date picker."
            >
              <i class="orion-date-input__button-icon orion-icon-calendar" />
            </button>
            {/* Input that flatpickr binds itself to */}
            <input
              ref={el => {
                this.dateInput = el as HTMLInputElement;
              }}
              class={`orion-date-input__date-input`}
              name="orion-date"
              id="orion-date"
              tabIndex={-1}
            />
          </div>
        </span>
      </Host>
    );
  }
}
