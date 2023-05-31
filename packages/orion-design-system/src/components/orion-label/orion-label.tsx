import { Component, h, Prop, Element } from '@stencil/core';

import classnames from 'classnames';

/**
 * @slot default - default slot for label content
 * @slot orion-label-conditional - slot for conditional text
 */

@Component({
  tag: 'orion-label',
  styleUrl: 'orion-label.css',
  shadow: true,
})
export class OrionLabel {
  hasConditionalSlot = false;

  @Element() el!: HTMLElement;

  /**
   * Shows the disabled state
   */
  @Prop() disabled = false;

  /**
   * Shows the error state
   */
  @Prop() error = false;

  getCSSClass() {
    return classnames(
      'orion-label__label', // this class is always applied
      {
        'orion-label__label--disabled': this.disabled, // this class is applied if the disabled prop is true
        'orion-label__label--error': this.error, // this class is applied if the error prop is true
      },
    );
  }

  componentWillLoad() {
    this.hasConditionalSlot = !!this.el.querySelector('[slot="orion-label-conditional"]');
  }

  render() {
    return (
      <div class="orion-label">
        {
          /* Disabling eslint for the next line because this component is meant to wrap a label around
           * a control which will be inserted into the slot
           */
          // eslint-disable-next-line jsx-a11y/label-has-associated-control
          <label class={this.getCSSClass()}>
            <slot />
          </label>
        }
        {this.hasConditionalSlot ? (
          <span class="orion-label__conditional">
            <slot name="orion-label-conditional" />
          </span>
        ) : null}
      </div>
    );
  }
}
