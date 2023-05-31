import { Component, h, Prop, Element, Listen, Event, EventEmitter } from '@stencil/core';

import classnames from 'classnames';
import { generateUUID } from '../../utils/utils';

/**
 * @slot orion-modal-title - slot for title
 * @slot orion-modal-body - slot for body content
 * @slot orion-modal-footer-left - slot for left aligned footer content
 * @slot orion-modal-footer-center - slot for center aligned footer content
 * @slot orion-modal-footer-right - slot for right aligned footer content
 * @slot orion-modal-primary-button - slot for primary button
 * @slot orion-modal-secondary-button - slot for secondary button
 * @slot orion-modal-button-row - slot for content in the button row. Displays to the left of the primary and secondary buttons in desktop and to the bottom in mobile. This slot only exists if the primary and/or secondary buttons are also present.
 */
@Component({
  tag: 'orion-modal',
  styleUrl: 'orion-modal.css',
  shadow: true,
})
export class OrionModal {
  uid = '';

  hasTitleSlot = false;

  hasBodySlot = false;

  hasFooterSlot = false;

  hasSecondaryButton = false;

  hasPrimaryButton = false;

  hasButtonRowSlot = false;

  originalPaddingRight = 0;

  originalOverflow = 'auto';

  originalHeight = 'auto';

  @Element() el!: HTMLElement;

  /**
   * Toggles the visibility of the modal
   */
  @Prop({ mutable: true }) isOpen = false;

  /**
   * Toggles visibility of the close icon in the top right of the modal
   */
  @Prop() hasCancelIcon = false;

  /**
   * Adds an icon to the modal header
   */
  @Prop() hasIcon = false;

  /**
   * Name of the icon to be added to the modal header
   */
  @Prop() iconName = '';

  /**
   * Set this to have the modal take up the full screen
   */
  @Prop() isFullscreen = false;

  /**
   * Set this to have the modal take up the full screen on mobile only
   */
  @Prop() isFullscreenMobile = false;

  /**
   * Set this to center-align the modal title
   */
  @Prop() isTitleCentered = false;

  /**
   * Disables the secondary button
   */
  @Prop() secondaryButtonDisabled = false;

  /**
   * Disables the primary button
   */
  @Prop() primaryButtonDisabled = false;

  /**
   * Emits `modalClose` event when isOpen is set to false internally
   */
  @Event() modalClose!: EventEmitter;

  componentWillLoad() {
    this.uid = generateUUID();

    const titleSlot = this.el.querySelector('[slot="orion-modal-title"]');
    const bodySlot = this.el.querySelector('[slot="orion-modal-body"]');
    const footerLeftSlot = this.el.querySelector('[slot="orion-modal-footer-left"]');
    const footerCenterSlot = this.el.querySelector('[slot="orion-modal-footer-center"]');
    const footerRightSlot = this.el.querySelector('[slot="orion-modal-footer-right"]');
    const secondaryButtonSlot = this.el.querySelector('[slot="orion-modal-secondary-button"]');
    const primaryButtonSlot = this.el.querySelector('[slot="orion-modal-primary-button"]');
    const buttonRowSlot = this.el.querySelector('[slot="orion-modal-button-row"]');

    // check if slot exists check if it has content
    this.hasTitleSlot = Boolean(titleSlot?.textContent);
    this.hasBodySlot = Boolean(bodySlot?.textContent);
    this.hasFooterSlot = Boolean(footerLeftSlot?.textContent) || Boolean(footerCenterSlot?.textContent) || Boolean(footerRightSlot?.textContent);
    this.hasSecondaryButton = Boolean(secondaryButtonSlot?.textContent);
    this.hasPrimaryButton = Boolean(primaryButtonSlot?.textContent);
    this.hasButtonRowSlot = Boolean(buttonRowSlot?.textContent);

    this.originalPaddingRight = parseInt(window.getComputedStyle(document.body).getPropertyValue('padding-right'));
    this.originalHeight = document.body.style.height === '' ? 'auto' : document.body.style.height;
    this.originalOverflow = window.getComputedStyle(document.body).getPropertyValue('overflow');
  }

  componentDidUpdate() {
    if (this.isOpen) {
      // get width of scrollbar
      const scrollBarWidth = window.innerWidth - document.body.clientWidth;

      // add padding right to body so the content doesn't shift when scrollbar disapears
      document.body.style.paddingRight = `${this.originalPaddingRight + scrollBarWidth}px`;

      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100%';
    }

    if (!this.isOpen) {
      // reset padding
      document.body.style.paddingRight = `${this.originalPaddingRight}px`;

      // Allow body to scroll when modal is closed
      document.body.style.overflow = this.originalOverflow;
      document.body.style.height = this.originalHeight;
    }
  }

  @Listen('keyup', { target: 'document' })
  handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this._handleClose();
    }
  }

  _handleClose() {
    this.isOpen = false;
    this.modalClose.emit();
  }

  /**
   * Emits event when footer buttons are clicked
   */
  @Event() orionModalFooterBtnClicked!: EventEmitter<{ variant: string }>;

  onFooterBtnClick(variant: string) {
    this.orionModalFooterBtnClicked.emit({ variant });
  }

  getHeaderCSSClass() {
    return classnames(
      'orion-modal__title', // this class is always applied
      {
        'orion-modal__title--centered-with-icon': this.hasIcon && this.isTitleCentered, // this class is applied if the isTitleCentered prop is true and the hasIcon prop is true
        'orion-modal__title--centered': this.isTitleCentered, // this class is applied if the isTitleCentered prop is true
      },
    );
  }

  getBodyCSSClass() {
    return classnames(
      'orion-modal__body', // this class is always applied
      {
        'orion-modal__body--no-title-with-cancel': !this.hasTitleSlot && this.hasCancelIcon, // this class is applied if the hasTitleSlot prop is false and the hasCancelIcon prop is true
      },
    );
  }

  render() {
    return (
      <div
        id={this.uid}
        class={`orion-modal__wrapper 
          ${this.isOpen ? 'is-open' : ''}`}
      >
        <div class="orion-modal__scrim"></div>

        <div class={`orion-modal ${this.isFullscreen ? 'orion-modal--fullscreen' : ''} ${this.isFullscreenMobile ? 'orion-modal--fullscreen-mobile' : ''}  `}>
          <div class="orion-modal__header">
            {this.hasIcon && this.iconName !== '' ? (
              <span class="orion-modal__icon">
                <i class={`orion-icon orion-icon-${this.iconName}`} />
              </span>
            ) : null}

            {this.hasTitleSlot ? (
              <span class={this.getHeaderCSSClass()}>
                <slot name="orion-modal-title" />
              </span>
            ) : (
              ''
            )}

            {this.hasCancelIcon ? (
              <button type="button" aria-label="Close" class="orion-modal__close-icon" onClick={this._handleClose.bind(this)}>
                <svg viewBox="0 0 24 24">
                  <path
                    d="M12,10.3837559 L22.0490208,0.334735107 C22.4953343,-0.111578369 23.2189514,-0.111578369 23.6652649,0.334735107 C24.1115784,0.781048584 24.1115784,1.5046657 23.6652649,1.95097918 L13.6162441,12 L23.6652649,22.0490208 C24.1115784,22.4953343 24.1115784,23.2189514 23.6652649,23.6652649 C23.2189514,24.1115784 22.4953343,24.1115784 22.0490208,23.6652649 L12,13.6162441 L1.95097918,23.6652649 C1.5046657,24.1115784 0.781048584,24.1115784 0.334735107,23.6652649 C-0.111578369,23.2189514 -0.111578369,22.4953343 0.334735107,22.0490208 L10.3837559,12 L0.334735107,1.95097918 C-0.111578369,1.5046657 -0.111578369,0.781048584 0.334735107,0.334735107 C0.781048584,-0.111578369 1.5046657,-0.111578369 1.95097918,0.334735107 L12,10.3837559 Z"
                    id="path-1"
                  ></path>
                </svg>
              </button>
            ) : (
              ''
            )}
          </div>

          {this.hasBodySlot ? (
            <div class={this.getBodyCSSClass()}>
              <slot name="orion-modal-body" />
            </div>
          ) : (
            ''
          )}

          {this.hasFooterSlot || this.hasSecondaryButton || this.hasPrimaryButton ? (
            <div class="orion-modal__footer">
              {this.hasFooterSlot ? (
                <div class="orion-modal__footer-content">
                  <span class="orion-modal__footer-left">
                    <slot name="orion-modal-footer-left"></slot>
                  </span>
                  <span class="orion-modal__footer-center">
                    <slot name="orion-modal-footer-center"></slot>
                  </span>
                  <span class="orion-modal__footer-right">
                    <slot name="orion-modal-footer-right"></slot>
                  </span>
                </div>
              ) : (
                ''
              )}

              {this.hasSecondaryButton || this.hasPrimaryButton ? (
                <div class="orion-modal__footer-button-row">
                  {this.hasButtonRowSlot ? (
                    <span>
                      <slot name="orion-modal-button-row"></slot>
                    </span>
                  ) : (
                    ''
                  )}

                  <div class="orion-modal__footer-buttons">
                    {this.hasSecondaryButton ? (
                      <orion-button
                        class="orion-modal__btn-secondary"
                        variant="secondary"
                        disabled={this.secondaryButtonDisabled}
                        onClick={() => this.onFooterBtnClick('secondary')}
                      >
                        <slot name="orion-modal-secondary-button" />
                      </orion-button>
                    ) : (
                      ''
                    )}

                    {this.hasPrimaryButton ? (
                      <orion-button class="orion-modal__btn-primary" variant="primary" disabled={this.primaryButtonDisabled} onClick={() => this.onFooterBtnClick('primary')}>
                        <slot name="orion-modal-primary-button" />
                      </orion-button>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              ) : (
                ''
              )}
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}
