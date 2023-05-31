import { Component, h, Prop, State, Element, Listen } from '@stencil/core';
import { generateUUID } from '../../utils/utils';

/**
 * @slot default - default slot for the tooltip trigger
 * @slot orion-tooltip-body - slot for body content
 */

@Component({
  tag: 'orion-tooltip',
  styleUrl: 'orion-tooltip.css',
  shadow: false,
})
export class OrionTooltip {
  uid = '';

  placeholder!: HTMLElement;

  dropdown!: HTMLElement;

  // save a reference to the dismiss timeout
  timeout = 0;

  delay = false;

  @Prop({ reflect: true }) tooltipWidth = 200;

  // mutable for collision detection
  @Prop({ reflect: true, mutable: true }) tooltipPosition: 'top' | 'bottom' = 'bottom';

  // whether the tooltip is open or closed
  @State() open = false;

  @Element() el!: HTMLElement;

  @Listen('resize', { target: 'window' })
  handleResize() {
    this._handleDropdownPosition();
  }

  componentWillLoad() {
    this.uid = generateUUID();

    // if component author uses an unacceptable position then default to bottom
    if (this.tooltipPosition !== 'top' && this.tooltipPosition !== 'bottom') {
      this.tooltipPosition = 'bottom';
    }
  }

  componentDidLoad() {
    // handle position if it is outside the viewport
    this._handleDropdownPosition();
  }

  _openTooltip() {
    // clear close timeout, if exists
    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }
    this.open = true;
  }

  _closeTooltip(delay = true) {
    if (delay) {
      // hide the tooltip after 500ms
      this.timeout = window.setTimeout(() => {
        this.open = false;
      }, 500);
    } else {
      this.open = false;
    }
  }

  _onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      // this.dismissed = true;
      this._closeTooltip(false);
    }
  }

  _handleDropdownPosition() {
    const screenPadding = 16;

    const placeholderRect = this.placeholder.getBoundingClientRect();
    const dropdownRect = this.dropdown.getBoundingClientRect();

    const dropdownRightX = dropdownRect.x + dropdownRect.width;
    const placeholderRightX = placeholderRect.x + placeholderRect.width;

    // handle width if tooltip is wider than viewport
    if (this.dropdown.offsetWidth + screenPadding * 2 > document.body.clientWidth - screenPadding * 2) {
      this.tooltipWidth = document.body.clientWidth - screenPadding * 2;
    }

    // if it crops left
    if (dropdownRect.x < screenPadding) {
      this.dropdown.style.left = '0';
      this.dropdown.style.right = 'auto';

      // update position so left edge lines up with screenPadding
      if (this.tooltipPosition === 'top') {
        this.dropdown.style.transform = `translate(${-placeholderRect.x + screenPadding}px, -30px)`;
      } else {
        this.dropdown.style.transform = `translate(${-placeholderRect.x + screenPadding}px, 8px)`;
      }
    }
    // if it crops on right
    else if (dropdownRightX > document.body.clientWidth - screenPadding * 2) {
      this.dropdown.style.left = 'auto';
      this.dropdown.style.right = '0';

      // update position so right edge lines up with screenPadding
      if (this.tooltipPosition === 'top') {
        this.dropdown.style.transform = `translate(${document.body.clientWidth - placeholderRightX - screenPadding}px, -30px)`;
      } else {
        this.dropdown.style.transform = `translate(${document.body.clientWidth - placeholderRightX - screenPadding}px, 8px)`;
      }
    }
  }

  render() {
    const inlineCSS: Record<string, string> = {
      width: `${this.tooltipWidth}px`,
    };

    const { open, tooltipPosition } = this;

    return (
      // TODO: address the eslint accessibility error below
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        class="tooltip-wrapper"
        onKeyDown={this._onKeyDown.bind(this)}
        onFocus={this._openTooltip.bind(this)}
        onMouseEnter={this._openTooltip.bind(this)}
        onBlur={() => this._closeTooltip()}
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        onMouseLeave={() => {
          this._closeTooltip();
        }}
        tabindex="-1"
      >
        <span
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions
          ref={el => {
            this.placeholder = el as HTMLElement;
          }}
          data-tooltip-placeholder
          aria-describedby={this.uid}
          aria-expanded={open ? 'true' : 'false'}
        >
          <slot />
        </span>
        <div
          ref={el => {
            this.dropdown = el as HTMLElement;
          }}
          id={this.uid}
          style={inlineCSS}
          class={`orion-tooltip ${tooltipPosition} ${open ? 'open' : ''}`}
          aria-label="tooltip"
          aria-hidden={open ? 'false' : 'true'}
          data-tooltip-dropdown
        >
          <slot name="orion-tooltip-body" />
        </div>
      </div>
    );
  }
}
