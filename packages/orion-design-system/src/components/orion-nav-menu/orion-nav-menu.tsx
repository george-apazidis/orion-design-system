import { Component, h, Prop, Element, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'orion-nav-menu',
  styleUrl: 'orion-nav-menu.css',
  shadow: true,
})
export class OrionNavMenu {

  hasHeader = false;

  @Element() el!: HTMLElement;

  /**
   * Prop used to show/hide nav menu
   */
  @Prop({ reflect: true, mutable: true }) isOpen = false;

  /**
   * Toggles visibility of the close icon in the right of the nav menu header
   */
  @Prop() hasCloseIcon = false;

  @Event() navMenuClose!: EventEmitter;

  _handleClose() {
    this.isOpen = false;
    this.navMenuClose.emit();
  }

  componentWillLoad() {
    const headerSlot = this.el.querySelector('[slot="orion-nav-menu-title"]');

    // check if slot exists check if it has content
    this.hasHeader = Boolean(headerSlot?.textContent) || this.hasCloseIcon;
  }

  render() {
    return (
      <aside class={`orion-nav-menu ${this.isOpen ? 'is-open' : ''}`} aria-labelledby="dialog-header" tabindex="-1" aria-hidden={this.isOpen ? 'false' : 'true'}>

        {this.hasHeader ? (
          <div class="orion-nav-menu__header" id="dialog-header">
          {this.hasCloseIcon ? (
            <button type="button" class="orion-nav-menu__close-btn" aria-label="Close" onClick={this._handleClose.bind(this)}>
              <i class={`orion-icon-close`} />
            </button>
          ) : (
            ''
          )}
            <h3>
              <slot name="orion-nav-menu-title"></slot>
            </h3>
          </div>
         ) : (
          ''
        )}
        
        <div class="orion-nav-menu__body">
          <slot name="orion-nav-menu-body"></slot>
        </div>

      </aside>
    );
  }

}
