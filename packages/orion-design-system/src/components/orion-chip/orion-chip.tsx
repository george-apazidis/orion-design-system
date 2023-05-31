import { Component, h, Prop, Element, Host, Listen } from '@stencil/core';

export type OrionChipVariantOptions = 'success' | 'high' | 'medium' | 'low' | 'info' | 'custom';

/**
 * @slot default - default slot for chip content
 */

@Component({
  tag: 'orion-chip',
  styleUrl: 'orion-chip.css',
  shadow: true,
})
export class OrionChip {
  @Element() el!: HTMLElement;

  /**
   * Stylistic variations for the chip type.
   * - **success** - results in a green chip
   * - **high** - results in a red chip
   * - **medium** - results in an orange chip
   * - **low** - results in a yellow chip
   * - **info** - results in a blue chip
   * - **custom** - results in a custom color chip (see `--orion-chip-color__bg` and `--orion-chip-color__text` css variables)
   */
  @Prop({ reflect: true, mutable: true }) variant: OrionChipVariantOptions = 'info';

  /**
   * Toggles the ability to dismiss the chip via a close button on right of the chip
   */
  @Prop({ reflect: true, mutable: true }) dismissible = false;

  /**
   * Prop used to show/hide chip
   */
  @Prop({ reflect: true, mutable: true }) isOpen = false;

  /**
   * Prop used to to display a solid background color
   */
  @Prop() solidBg = false;

  _handleClose() {
    this.isOpen = false;
  }

  /**
   * Handle closing the chip via keyboard
   */
  @Listen('keydown')
  handleKeyPress(event: KeyboardEvent) {
    // if the user presses escape, space, or enter, close the chip
    if (event.key === 'Escape' || event.code === 'Space' || event.key === 'Enter') {
      this.isOpen = false;
    }
  }

  render() {
    const variantClass = this.variant ? `orion-chip--${this.variant}` : '';
    const iconConfigMap: Record<OrionChipVariantOptions, { color: string; dismissibleSolidColor: string }> = {
      high: {
        color: 'red',
        dismissibleSolidColor: 'white',
      },
      medium: {
        color: 'orange',
        dismissibleSolidColor: 'black',
      },
      low: {
        color: 'yellow',
        dismissibleSolidColor: 'black',
      },
      success: {
        color: 'green',
        dismissibleSolidColor: 'white',
      },
      info: {
        color: 'rhapsody-blue',
        dismissibleSolidColor: 'white',
      },
      custom: {
        color: '',
        dismissibleSolidColor: '',
      },
    };

    const iconConfig = iconConfigMap[this.variant] || iconConfigMap.info;
    const iconColor = this.dismissible ? iconConfig.dismissibleSolidColor : iconConfig.color;

    const component = (
      // TODO: address the eslint accessbility error below
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
      <button
        class={`orion-chip ${variantClass}  ${this.isOpen ? 'is-open' : ''} ${this.solidBg ? 'orion-chip--solid-bg' : ''}    `}
        aria-hidden={this.isOpen ? 'false' : 'true'}
        tabindex={this.dismissible ? '1' : '-1'}
      >
        <span class="orion-chip__label">
          <slot />
        </span>

        {this.dismissible ? (
          <span class="orion-chip__close-btn" aria-label="Close" onClick={this._handleClose.bind(this)}>
            <i class={`orion-icon orion-icon-cancel ${this.solidBg && this.variant != 'custom' ? iconColor : ''}`}></i>
          </span>
        ) : (
          ''
        )}
      </button>
    );
    return <Host>{component}</Host>;
  }
}
