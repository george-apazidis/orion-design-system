import { Component, h, Prop } from '@stencil/core';

import classnames from 'classnames';

export type OrionLinkTargetOptions = '_blank' | '_self' | '_parent' | '_top' | 'framename';

@Component({
  tag: 'orion-link',
  styleUrl: 'orion-link.css',
  shadow: true,
})
export class OrionLink {
  /**
   * The link href
   */
  @Prop() href = '';

  /**
   * The link disabled state
   */
  @Prop() disabled = false;

  /**
   * The link target
   */
  @Prop() target: OrionLinkTargetOptions = '_self';

  /**
   * The link rel
   */
  @Prop() rel = '';

  /**
   * The link download
   */
  @Prop() download = '';

  /**
   * The icon name
   */
  @Prop() iconName = '';

  /**
   * The icon position
   */
  @Prop() iconLeft = false;

  /**
   * No underline
   */
  @Prop() noUnderline = false;

  componentWillLoad(): void {
    /* Disable link if href is not provided */
    if (this.href === '') {
      console.warn('orion-link: href is required');
      this.disabled = true;
    }
  }

  getCSSClass() {
    return classnames(
      'orion-link', // Default class
      {
        'orion-link--disabled': this.disabled, // Disabled class
        'orion-link--no-underline': this.iconName !== '' || this.noUnderline, // No underline class if icon is present or noUnderline is true
      },
    );
  }

  render() {
    return (
      <a {...(this.disabled ? null : { href: this.href })} target={this.target} rel={this.rel} download={this.download} class={this.getCSSClass()}>
        {this.iconName !== '' && this.iconLeft ? (
          <span class="orion-link__icon">
            <i class={`orion-icon orion-icon-${this.iconName} left`} />
          </span>
        ) : null}

        <slot />

        {this.iconName !== '' && !this.iconLeft ? (
          <span class="orion-link__icon">
            <i class={`orion-icon orion-icon-${this.iconName} right`} />
          </span>
        ) : null}
      </a>
    );
  }
}
