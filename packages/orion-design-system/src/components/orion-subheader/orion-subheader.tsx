import { Component, h, Prop, Element, Event, EventEmitter } from '@stencil/core';

/**
 * @slot orion-subheader-left - slot for left content
 * @slot orion-subheader-center - slot for center content
 * @slot orion-subheader-right - slot for right content
 * @slot - Unnamed default slot for subheader content
 */

@Component({
  tag: 'orion-subheader',
  styleUrl: 'orion-subheader.css',
  shadow: true,
})
export class OrionSubheader {

  hasNamedSlots = false;

  @Element() el!: HTMLElement;

  /**
   * Prop used to show/hide subheader
   */
  @Prop({ reflect: true, mutable: true }) isOpen = false;

  /**
   * Toggles visibility of the close icon in the right of the subheader
   */
  @Prop() hasCloseIcon = false;

  @Event() subheaderClose!: EventEmitter;

  _handleClose() {
    this.isOpen = false;
    this.subheaderClose.emit();
  }

  componentWillLoad() {
    this.hasNamedSlots = !!this.el.querySelector('[slot="orion-subheader-left"]') || !!this.el.querySelector('[slot="orion-subheader-center"]') || !!this.el.querySelector('[slot="orion-subheader-right"]');
  }

  render() {
    return (
      <div class={`orion-subheader ${this.isOpen ? 'is-open' : ''}`} aria-labelledby="dialog-header" tabindex="-1" aria-hidden={this.isOpen ? 'false' : 'true'}>
        {this.hasCloseIcon ? (
          <button type="button" class="orion-subheader__close-btn" aria-label="Close" onClick={this._handleClose.bind(this)}>
            <i class={`orion-icon-close`} />
          </button>
        ) : (
          ''
        )}

        {this.hasNamedSlots ? (
          <div class={`orion-subheader__named-slots ${this.hasCloseIcon ? 'orion-subheader__named-slots-with-close-btn' : ''}`}>
            <span class="orion-subheader__left">
              <slot name="orion-subheader-left" />
            </span>
            <span class="orion-subheader__center">
              <slot name="orion-subheader-center" />
            </span>
            <span class="orion-subheader__right">
              <slot name="orion-subheader-right" />
            </span>
          </div>
        ) : (
          ''
        )}
        
        <div class={`orion-subheader-content ${this.hasCloseIcon ? 'orion-subheader-content-with-close-btn' : ''}`}><slot /></div>
        
      </div>
    );
  }

}