import { Component, h, Prop, Element, Host } from '@stencil/core';

export type OrionMessageVariantOptions = 'success' | 'success-overlay' | 'high' | 'medium' | 'low' | 'info';

/**
 * @slot default - default slot for message content
 */

@Component({
  tag: 'orion-message',
  styleUrl: 'orion-message.css',
  shadow: true,
})
export class OrionMessage {
  hasSlot = false;

  isMobile = false;

  originalVariant = '';

  @Element() el!: HTMLElement;

  /**
   * Stylistic variations for the message type.
   * - **success** - results in a green message
   * - **success-overlay** - results in a full screen overlay on mobile
   * - **high** - results in a red message
   * - **medium** - results in an orange message
   * - **low** - results in a yellow message
   * - **info** - results in a blue message
   */
  @Prop({ reflect: true, mutable: true }) variant: OrionMessageVariantOptions = 'info';

  /**
   * Optional time for the mobile overlay to display in milliseconds. Default is 3000.
   */
  @Prop() overlayTime = 3000;

  /**
   * Optional heading text for the message that appears above message body message
   */
  @Prop() heading = '';

  /**
   * Toggles the ability to dismiss the message via a close button in the top right of the message
   */
  @Prop({ reflect: true, mutable: true }) dismissible = false;

  /**
   * Toggles the display of the icon in the top left of the message
   */
  @Prop() hasIcon = false;

  /**
   * Prop used to show/hide message
   */
  @Prop({ reflect: true, mutable: true }) isOpen = false;

  componentWillRender() {
    this.isMobile = window.innerWidth <= 768;

    // The below logic is a fallback for the success-overlay variant on desktop.
    // If success-overlay is chosen, the desktop breakpoint should show the temporary toast message

    if (this.variant === 'success-overlay' && !this.isMobile) {
      this.originalVariant = 'success-overlay';
      this.variant = 'success';
      this.dismissible = true;
    }

    if (this.variant === 'success' && this.originalVariant === 'success-overlay' && this.isMobile) {
      this.variant = 'success-overlay';
      this.dismissible = false;
    }
  }

  componentDidUpdate() {
    if (this.variant === 'success-overlay') {
      if (this.isOpen) {
        // get width of scrollbar
        const paddingRight = window.innerWidth - document.body.clientWidth;

        // add padding right to body so the content doesn't shift when scrollbar disapears
        document.body.style.paddingRight = `${paddingRight}px`;

        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
        document.body.style.height = '100%';

        // close overlay after given time
        setTimeout(() => {
          this.isOpen = false;
        }, this.overlayTime); // time in milliseconds
      } else {
        // reset padding
        document.body.style.paddingRight = '0';

        // Allow body to scroll when modal is closed
        document.body.style.overflow = 'auto';
        document.body.style.height = 'auto';
      }
    }
  }

  _handleClose() {
    this.isOpen = false;
  }

  _handleOverlayClick() {
    if (this.variant === 'success-overlay') {
      this._handleClose();
    }
  }

  render() {
    const variantClass = this.variant ? `orion-message--${this.variant}` : '';
    const iconConfigMap: Record<OrionMessageVariantOptions, { name: string; color: string; dismissibleColor: string }> = {
      'high': {
        name: 'alert',
        color: 'red',
        dismissibleColor: 'white',
      },
      'medium': {
        name: 'alert',
        color: 'orange',
        dismissibleColor: 'black',
      },
      'low': {
        name: 'alert',
        color: 'yellow',
        dismissibleColor: 'black',
      },
      'success': {
        name: 'success',
        color: 'green',
        dismissibleColor: 'white',
      },
      'success-overlay': {
        name: 'success',
        color: 'white',
        dismissibleColor: 'white',
      },
      'info': {
        name: 'info',
        color: 'rhapsody-blue',
        dismissibleColor: 'white',
      },
    };

    const iconConfig = iconConfigMap[this.variant] || iconConfigMap.info;
    const iconName = iconConfig.name;
    const iconColor = this.dismissible ? iconConfig.dismissibleColor : iconConfig.color;
    const iconSize = this.heading ? 24 : 20;

    // check if there's content in the slot
    this.hasSlot = !!this.el.querySelector('[slot]');
    let inlineCSS: Record<string, string> = {};
    let inlineCSSFontSize: Record<string, string> = {};

    inlineCSSFontSize = {
      fontSize: `${iconSize}px`,
    };

    // if no heading and no content in slot, make icon bigger
    if (!this.heading && !this.hasSlot) {
      inlineCSS = {
        transform: `scale(1.3333)`,
      };
    }

    const component = (
      // TODO: address the eslint accessbility error below
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
      <div
        class={`orion-message ${variantClass}  ${!this.heading ? 'small' : ''} ${this.isOpen ? 'is-open' : ''}`}
        role="message"
        aria-hidden={this.isOpen ? 'false' : 'true'}
        onClick={this._handleOverlayClick.bind(this)}
      >
        {this.hasIcon && this.variant !== 'success-overlay' ? <i style={inlineCSSFontSize} class={`orion-message__priority-icon orion-icon-${iconName} ${iconColor}`}></i> : ''}

        {this.variant === 'success-overlay' ? (
          <div class="orion-message__success-animation" style={inlineCSS} aria-hidden="true">
            <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
              <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
              <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
          </div>
        ) : (
          ''
        )}

        {this.dismissible ? (
          <button type="button" class="orion-message__close-btn" aria-label="Close" onClick={this._handleClose.bind(this)}>
            <i class={`orion-icon orion-icon-close ${iconColor}`}></i>
          </button>
        ) : (
          ''
        )}

        {this.heading ? <h2 class="orion-message__heading">{this.heading}</h2> : ''}

        <slot />

        {this.variant === 'success-overlay' ? <p class="orion-message__footer">Tap to close</p> : ''}
      </div>
    );
    return <Host>{component}</Host>;
  }
}
