import { Component, h, Prop, Element, State, Listen } from '@stencil/core';

import classnames from 'classnames';

export type OrionButtonTypeOptions = 'submit' | 'reset' | 'button';

export type OrionButtonVariantOptions = 'primary' | 'secondary' | 'tertiary';

@Component({
  tag: 'orion-button',
  styleUrl: 'orion-button.css',
  shadow: true,
})
export class OrionButton {
  /**
   * The button type
   */
  @Prop() type: OrionButtonTypeOptions = 'button';

  /**
   * The button variant
   */
  @Prop() variant: OrionButtonVariantOptions = 'secondary';

  /**
   * The disabled state
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * The small state
   */
  @Prop() small = false;

  /**
   * The sticky state. A default button will display on desktop.
   */
  @Prop() sticky = false;

  /**
   * The sticky state for mobile only. Button will hide on desktop.
   */
  @Prop() stickyMobile = false;

  /**
   * The icon name
   */
  @Prop() iconName = '';

  /**
   * The icon position
   */
  @Prop() iconRight = false;

  hasText = false;

  iconSize = 24;

  @State() isMobile = false; // Needs to be State so that it triggers render

  @Element() el!: HTMLElement;

  componentWillLoad(): void {
    this.hasText = this.el.innerHTML !== '';
    this.setIsMobile();
  }

  @Listen('resize', { target: 'window' })
  handleResize() {
    this.setIsMobile();
  }

  componentWillRender() {
    if (this.isMobile) {
      this.iconSize = this.small ? 20 : 24;
    } else {
      this.iconSize = this.small ? 16 : 20;
    }
  }

  setIsMobile() {
    this.isMobile = window.innerWidth <= 768;
  }

  getCSSClass() {
    return classnames(
      `orion-button orion-button--${this.variant}`, // this class is always applied
      {
        'orion-button--small orion-button--no-text': !this.hasText && this.small, // this class is applied if the button is small and has no text
        'orion-button--no-text': !this.hasText, // this class is applied if the button has no text
        'orion-button--small': this.small, // this class is applied if the button is small
        'orion-button--sticky': this.sticky, // this class is applied if the button is sticky
        'orion-button--sticky-mobile': this.stickyMobile, // this class is applied if the button is sticky on mobile only
      },
    );
  }

  render() {
    let inlineCSSFontSize: Record<string, string> = {};
    inlineCSSFontSize = {
      fontSize: `${this.iconSize}px`,
    };
    return (
      <button class={this.getCSSClass()} type={this.type} disabled={this.disabled}>
        {this.iconName !== '' && !this.iconRight ? (
          <span class="orion-button__icon">
            <i class={`orion-icon-${this.iconName}`} style={inlineCSSFontSize} />
          </span>
        ) : null}

        {this.hasText ? <slot /> : null}

        {this.iconName !== '' && this.iconRight ? (
          <span class="orion-button__icon">
            <i class={`orion-icon-${this.iconName}`} style={inlineCSSFontSize} />
          </span>
        ) : null}
      </button>
    );
  }
}
