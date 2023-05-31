import { Component, h, Prop, Element } from '@stencil/core';

import classnames from 'classnames';

@Component({
  tag: 'orion-nav-button',
  styleUrl: 'orion-nav-button.css',
  shadow: true,
})
export class OrionNavButton {
  /**
  * The icon name
  */
  @Prop() iconName = '';

  /**
   * The position of the label
   */
  @Prop() labelPosition: 'left' | 'right' = 'right';

  /**
  * The active state of the button
  */
  @Prop({ reflect: true, mutable: true }) isActive = false;

  hasText = false;

  @Element() el!: HTMLElement;

  componentWillLoad(): void {
    this.hasText = this.el.innerHTML !== '';
  }

  getCSSClass() {
    return classnames(
      'orion-nav-button', // this class is always applied
      {
        'orion-nav-button--label-left': this.hasText && this.labelPosition === 'left', // this class is applied if there is text and the labelPosition is left
      },
    );
  }

  render() {
    return (
      <button class={`${this.getCSSClass()} ${this.isActive ? 'active' : ''}`} type="button">
        {this.hasText && this.labelPosition === 'left' ? <span class="orion-nav-button__label"><slot /></span> : null}

        <span>
          <i class={`orion-icon-${this.iconName}`} />
        </span>

        {this.hasText && (this.labelPosition === 'right') ? <span class="orion-nav-button__label"><slot /></span> : null}

      </button>
    );
  }

}