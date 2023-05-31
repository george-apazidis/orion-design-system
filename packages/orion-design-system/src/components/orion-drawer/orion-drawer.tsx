import { Component, h, Element, Prop, Event, EventEmitter } from '@stencil/core';

export type OrionDrawerOpenOptions = 'left' | 'right' | 'bottom';

/**
 * @slot orion-drawer-title - slot for title
 * @slot orion-drawer-body - slot for body content
 * @slot orion-drawer-footer-content - slot for footer content
 * @slot orion-drawer-secondary-button - slot for secondary button
 * @slot orion-drawer-primary-button - slot for primary button
 */

@Component({
  tag: 'orion-drawer',
  styleUrl: 'orion-drawer.css',
  shadow: true,
})
export class OrionDrawer {
  hasFooterSlot = false;

  hasPrimaryButton = false;

  hasSecondaryButton = false;

  originalPaddingRight = 0;

  originalOverflow = 'auto';

  originalHeight = 'auto';

  @Element() el!: HTMLElement;

  /**
   * Prop used to show/hide drawer
   */
  @Prop({ reflect: true, mutable: true }) isOpen = false;

  /**
   * Animates drawer in from left, right, or bottom
   */
  @Prop() openFrom: OrionDrawerOpenOptions = 'right';

  componentWillLoad() {
    const footerSlot = this.el.querySelector('[slot="orion-drawer-footer-content"]');
    const secondaryButtonSlot = this.el.querySelector('[slot="orion-drawer-secondary-button"]');
    const primaryButtonSlot = this.el.querySelector('[slot="orion-drawer-primary-button"]');

    // check if slot exists check if it has content
    this.hasFooterSlot = Boolean(footerSlot?.textContent);
    this.hasSecondaryButton = Boolean(secondaryButtonSlot?.textContent);
    this.hasPrimaryButton = Boolean(primaryButtonSlot?.textContent);

    this.originalPaddingRight = parseInt(window.getComputedStyle(document.body).getPropertyValue('padding-right'));
    this.originalHeight = document.body.style.height === '' ? 'auto' : document.body.style.height;
    this.originalOverflow = window.getComputedStyle(document.body).getPropertyValue('overflow');
  }

  componentDidUpdate() {
    const isMobile = window.innerWidth <= 768;

    // check only for mobile as the body scroll for desktop should be enabled
    if (isMobile && this.isOpen) {
      // get width of scrollbar
      const scrollBarWidth = window.innerWidth - document.body.clientWidth;

      // add padding right to body so the content doesn't shift when scrollbar disapears
      document.body.style.paddingRight = `${this.originalPaddingRight + scrollBarWidth}px`;

      // Prevent body scroll when drawer is open
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100%';
    }

    if (!this.isOpen) {
      // reset padding
      document.body.style.paddingRight = `${this.originalPaddingRight}px`;

      // Allow body to scroll when drawer is closed
      document.body.style.overflow = this.originalOverflow;
      document.body.style.height = this.originalHeight;
    }
  }

  _handleClose() {
    this.isOpen = false;
  }

  /**
   * Emits event when footer buttons are clicked
   */
  @Event() orionDrawerFooterBtnClicked!: EventEmitter<{ variant: string }>;

  onFooterBtnClick(variant: string) {
    this.orionDrawerFooterBtnClicked.emit({ variant });
  }

  render() {
    return (
      <aside class={`orion-drawer ${this.isOpen ? 'is-open' : ''}`} aria-labelledby="dialog-header" tabindex="-1" aria-hidden={this.isOpen ? 'false' : 'true'}>
        <div class="orion-drawer__header">
          <button type="button" class="orion-drawer__close-btn" aria-label="Close" onClick={this._handleClose.bind(this)}>
            <i class={`orion-icon-close`} />
          </button>
          <h2>
            <slot name="orion-drawer-title"></slot>
          </h2>
        </div>
        <div class="orion-drawer__body">
          <slot name="orion-drawer-body"></slot>
        </div>

        {this.hasFooterSlot || this.hasSecondaryButton || this.hasPrimaryButton ? (
          <div class="orion-drawer__footer">
            {this.hasFooterSlot ? (
              <div class="orion-drawer__footer-content">
                <slot name="orion-drawer-footer-content"></slot>
              </div>
            ) : (
              ''
            )}

            {this.hasSecondaryButton || this.hasPrimaryButton ? (
              <div class="orion-drawer__footer-buttons">
                {this.hasSecondaryButton ? (
                  <orion-button class="orion-drawer__btn-secondary" variant="secondary" onClick={() => this.onFooterBtnClick('secondary')}>
                    <slot name="orion-drawer-secondary-button" />
                  </orion-button>
                ) : (
                  ''
                )}

                {this.hasPrimaryButton ? (
                  <orion-button class="orion-drawer__btn-primary" variant="primary" onClick={() => this.onFooterBtnClick('primary')}>
                    <slot name="orion-drawer-primary-button" />
                  </orion-button>
                ) : (
                  ''
                )}
              </div>
            ) : (
              ''
            )}
          </div>
        ) : (
          ''
        )}
      </aside>
    );
  }
}
