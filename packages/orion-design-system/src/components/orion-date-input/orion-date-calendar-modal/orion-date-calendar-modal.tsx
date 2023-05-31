import { Component, Host, h, Prop, Element, Event, EventEmitter, Watch, State, Listen } from '@stencil/core';
import flatpickr from 'flatpickr';
import { Instance } from 'flatpickr/dist/types/instance';
import { BaseOptions, Hook } from 'flatpickr/dist/types/options';

@Component({
  tag: 'orion-date-calendar-modal',
  styleUrl: 'orion-date-calendar-modal.css',
  shadow: true,
})
export class OrionDateCalendarModal {
  @Element() el!: HTMLElement;

  /**
   * Label to appear at the top of the modal
   */
  @Prop() label!: string;

  /**
   * Month that flatpickr calendar starts at
   * TODO: base this off min date or create a buffer + scroll to current month
   */
  @Prop() startingDate = new Date();

  /**
   * Config for flatpickr
   */
  @Prop() flatpickrConfig!: Partial<BaseOptions>;

  /**
   * Selected dates to show
   */
  @Prop() dates = ['', ''];

  /**
   * Whether the modal is open or not
   */
  @Prop() isOpen!: boolean;

  /**
   * If the flatpickr config is ranged or not
   */
  @Prop() range!: boolean;

  /**
   * Format to be used by the date inputs & calendar
   * Follows spec at https://flatpickr.js.org/formatting/
   */
  @Prop() dateFormat!: string;

  /**
   * Label for first date
   */
  @Prop() firstDateLabel!: string;

  /**
   * Label for second date
   */
  @Prop() secondDateLabel? = '';

  /**
   * Emits `selectModalDates` event that `orion-date-input` can listen for
   */
  @Event() selectModalDates!: EventEmitter<{ dates: Date[] }>;

  /**
   * Emits `closeDateModal` event that `orion-date-input` can listen for
   */
  @Event() closeDateModal!: EventEmitter;

  // month headings that are created from flatpickr elements
  @State() headings: HTMLElement[] = [];

  // local date state to allow for revertion
  @State() localDates = ['', ''];

  // is the window less than 769px wide
  @State() isMobile = false;

  // How many months to show on the calendar
  // TODO: change this based on min/max dates
  private monthCount = 12 as const;

  // Input to bind flatpickr to
  private dateInput!: HTMLInputElement;

  // Flatpickr instance
  private flatpickerInstance: Instance | null = null;

  // Mutation Observer to watch flatpickr updates and apply month header transforms
  private mutationObserver: MutationObserver | null = null;

  // reference to the monthly header elements
  private monthHeaders: NodeListOf<Element> | [] = [];

  // reference to the weekday header elements
  private weekDayHeaders: NodeListOf<Element> | [] = [];

  // reference to the monthly elements
  private dayContainers: NodeListOf<Element> | [] = [];

  // inner container to append monthly headers to
  private innerContainer?: Element | null;

  // padding for modal logic
  private originalPaddingRight = 0;

  // overflow for modal logic
  private originalOverflow = 'auto';

  // height for modal logic
  private originalHeight = 'auto';

  private scrollContainer?: HTMLElement | null = null;

  componentWillLoad() {
    this.originalPaddingRight = parseInt(window.getComputedStyle(document.body).getPropertyValue('padding-right'));
    this.originalHeight = document.body.style.height === '' ? 'auto' : document.body.style.height;
    this.originalOverflow = window.getComputedStyle(document.body).getPropertyValue('overflow');

    this.setIsMobile();
    this.queryElements();
  }

  componentDidLoad() {
    this.flatpickerInstance = flatpickr(this.dateInput, {
      ...this.flatpickrConfig,
      disableMobile: false,
      inline: true, // constant display & will not trigger open/close hooks
      showMonths: this.monthCount,
      onReady: this.onCalendarReady,
      onChange: this.handleInputChange, // override onChange to handle local changes
      onDayCreate: undefined, // override parent config for hiding days
      onValueUpdate: this.onValueUpdate,
    });

    this.scrollContainer = this.el.shadowRoot?.querySelector('.flatpickr-calendar');
  }

  private currentScrollPos = 0;

  private onValueUpdate = () => {
    this.currentScrollPos = this.scrollContainer?.scrollTop ?? 0;
  };

  private adjustSelectedMonth() {
    if (!this.scrollContainer || !this.flatpickerInstance) return;
    if (this.flatpickerInstance.currentMonth !== this.startingDate.getMonth()) {
      this.flatpickerInstance.changeMonth(this.startingDate.getMonth(), false);
    }
    if (this.flatpickerInstance.currentYear !== this.startingDate.getFullYear()) {
      this.flatpickerInstance.changeYear(this.startingDate.getFullYear());
      this.scrollContainer.scrollTop = this.currentScrollPos;
    }
  }

  private queryElements = () => {
    this.monthHeaders = this.el.shadowRoot?.querySelectorAll('.flatpickr-month') ?? [];
    this.weekDayHeaders = this.el.shadowRoot?.querySelectorAll('.flatpickr-weekdaycontainer') ?? [];
    this.dayContainers = this.el.shadowRoot?.querySelectorAll('.dayContainer') ?? [];
    this.innerContainer = this.el.shadowRoot?.querySelector('.flatpickr-innerContainer');
  };

  onCalendarReady: Hook | Hook[] = () => {
    this.queryElements();

    this.adjustHeaderElements();

    if (!this.mutationObserver) {
      const div = this.el.shadowRoot?.querySelector('.flatpickr-days');
      this.mutationObserver = new MutationObserver(this.onCalendarDaysChanged);
      this.mutationObserver.observe(div as HTMLElement, { childList: true });
    }
  };

  onCalendarDaysChanged = (mutations: MutationRecord[]) => {
    mutations.forEach(mutation => {
      if (mutation.addedNodes[0] && (mutation.addedNodes[0] as HTMLElement).clientHeight > 0) {
        this.adjustSelectedMonth();
        this.adjustHeaderElements(mutation.addedNodes as NodeListOf<Element>);
      }
    });
  };

  private adjustHeaderElements = (months = this.dayContainers) => {
    // starting margin from top
    let headerOffset = 23;
    for (let i = 0; i < this.monthCount; i += 1) {
      const headerDiv = this.headings[i] ?? document.createElement('div');

      // increase offset based on previous month's height + top margin of each month
      if (i > 0) {
        const previousMonthHeight = months[i - 1].getBoundingClientRect().height;
        headerOffset += previousMonthHeight;
        headerOffset += 100;
      }
      headerDiv.style.top = `${headerOffset}px`;

      // if the heading doesn't exist, add a class, append elements, and save to state
      if (!this.headings[i]) {
        headerDiv.classList.add('flatpickr-override__header');

        headerDiv.prepend(this.weekDayHeaders[i]);
        headerDiv.prepend(this.monthHeaders[i]);
        this.innerContainer?.append(headerDiv);
        this.headings[i] = headerDiv;
      }
      if (this.innerContainer?.childNodes && !Array.from(this.innerContainer.childNodes).includes(this.headings[i])) {
        this.innerContainer?.append(headerDiv);
      }
    }
  };

  @Listen('resize', { target: 'window' })
  handleResize() {
    if (this.isOpen) {
      this.setIsMobile();
      this.adjustHeaderElements();
    }
  }

  private setIsMobile() {
    this.isMobile = window.innerWidth <= 768;
  }

  @Watch('isOpen')
  handleOpen() {
    if (this.isOpen) {
      // prepopulate flatpickr & local date state
      this.localDates = this.dates;
      if (this.flatpickerInstance) {
        this.flatpickerInstance.setDate(this.dates);
        setTimeout(() => {
          this.scrollToSelectedElement();
        });
      }
      this.setIsMobile();
      this.queryElements();
    }
    this.updateDocumentStyling();
  }

  private scrollToSelectedElement = (instant = false) => {
    if (this.flatpickerInstance) {
      this.flatpickerInstance.selectedDateElem?.scrollIntoView({ behavior: instant ? 'auto' : 'smooth', block: 'center' });
    }
  };

  updateDocumentStyling = () => {
    if (this.isOpen && this.isMobile) {
      // get width of scrollbar
      const scrollBarWidth = window.innerWidth - document.body.clientWidth;

      // add padding right to body so the content doesn't shift when scrollbar disapears
      document.body.style.paddingRight = `${this.originalPaddingRight + scrollBarWidth}px`;

      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100%';
    } else {
      // reset padding
      document.body.style.paddingRight = `${this.originalPaddingRight}px`;

      // Allow body to scroll when modal is closed
      document.body.style.overflow = this.originalOverflow;
      document.body.style.height = this.originalHeight;
    }
  };

  handleInputChange: Hook = (dates, _, instance) => {
    if (this.range) {
      const newDates = dates.map(date => instance.formatDate(date, this.dateFormat));
      if (!newDates[1]) newDates[1] = '';
      this.localDates = newDates;
    } else {
      this.localDates = [instance.formatDate(dates[0], this.dateFormat), ''];
    }
  };

  private handleClose = () => {
    this.closeDateModal.emit();
  };

  private handleSelectDates = () => {
    this.selectModalDates.emit({ dates: this.flatpickerInstance?.selectedDates ?? [] });
    this.handleClose();
  };

  private getModalClasses = () => {
    return `
      orion-date-calendar-modal
      orion-date-calendar-modal--${this.isOpen ? 'open' : 'closed'}
      flatpickr-override
      flatpickr-override--modal
    `;
  };

  private getDateSelectionClasses = (buttonIndex: 0 | 1) => {
    let selected = false;
    if (buttonIndex === 0) {
      if (this.range) {
        selected = !this.localDates[0] || (!!this.localDates[0] && !!this.localDates[1]);
      }
    } else {
      selected = !!this.localDates[0] && !this.localDates[1];
    }
    return `
    orion-date-calendar-modal__date-selection-label
    orion-date-calendar-modal__date-selection-label--${selected ? 'selected' : 'empty'}
    `;
  };

  private getDateSelectionSpanClasses = (dateIndex: 0 | 1) => {
    return `
    orion-date-calendar-modal__selected-date
    orion-date-calendar-modal__selected-date--${this.localDates[dateIndex] ? 'selected' : 'empty'}
    `;
  };

  render() {
    return (
      <Host>
        <div class={this.getModalClasses()}>
          <div class="orion-date-calendar-modal__label">
            <h2 class="orion-date-calendar-modal__label-heading">{this.label}</h2>
            <button class="orion-date-calendar-modal__close-button" onClick={this.handleClose} aria-label="Cancels date selection and closes the calendar date picker.">
              <i class="orion-icon orion-icon-close"></i>
            </button>
          </div>
          <div class="orion-date-calendar-modal__date-selections">
            <p class={this.getDateSelectionClasses(0)}>
              {this.firstDateLabel}
              <span class={this.getDateSelectionSpanClasses(0)}>{this.localDates[0] || `Select a date`}</span>
            </p>
            {this.range && (
              <p class={this.getDateSelectionClasses(1)}>
                {this.secondDateLabel}
                <span class={this.getDateSelectionSpanClasses(1)}>{this.localDates[1] || `Select a date`}</span>
              </p>
            )}
          </div>
          <div class="orion-date-calendar-modal__flatpickr">
            {/* Input that flatpickr binds itself to */}
            <input
              ref={el => {
                this.dateInput = el as HTMLInputElement;
              }}
              class="orion-date-calendar-modal__date-input"
              name="orion-date"
              id="orion-date"
              tabIndex={-1}
            />
          </div>
          <orion-button
            disabled={!this.localDates[0] || (this.range && !this.localDates[1])}
            onClick={this.handleSelectDates}
            class="orion-date-calendar-modal__button"
            sticky
            variant="primary"
          >
            {`Select date${this.range ? 's' : ''}`}
          </orion-button>
        </div>
      </Host>
    );
  }
}
