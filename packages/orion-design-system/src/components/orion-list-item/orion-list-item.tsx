import { Component, h, Prop, Element, Fragment } from '@stencil/core';

/**
 * @slot orion-list-item-image - Slot for list item image
 * @slot orion-list-item-heading - Slot for list item heading
 * @slot orion-list-item-subheading - Slot for list item subheading
 * @slot orion-list-item-body - Slot for list item body
 * @slot - Unnamed default slot for list item content
 */

@Component({
  tag: 'orion-list-item',
  styleUrl: 'orion-list-item.css',
  shadow: true,
})
export class OrionListItem {
  hasImageSlot = false;

  hasHeadingSlot = false;

  hasSubHeadingSlot = false;

  hasBodySlot = false;

  @Element() el!: HTMLElement;

  /**
   * Disables the list item
   */
  @Prop() disabled = false;

  /**
   * Adds a marker to the list item
   */
  @Prop() hasMarker = false;

  /**
   * Adds an icon to the list item
   */
  @Prop() hasIcon = false;

  /**
   * Name of the icon to be added to the list item
   */
  @Prop() iconName = '';

  /**
   * Adds a trailing icon to the list item. The href property will add a trailing icon automatically
   */
  @Prop() hasTrailingIcon = false;

  /**
   * Name of the trailing icon to be added to the list item. Deaults to chevron_right
   */
  @Prop() trailingIconName = 'chevron_right';

  /**
   * Adds a link to the list item. Trailing icon will be added automatically
   */
  @Prop() href = '';

  componentWillLoad() {
    this.hasImageSlot = !!this.el.querySelector('[slot="orion-list-item-image"]');
    this.hasHeadingSlot = !!this.el.querySelector('[slot="orion-list-item-heading"]');
    this.hasSubHeadingSlot = !!this.el.querySelector('[slot="orion-list-item-subheading"]');
    this.hasBodySlot = !!this.el.querySelector('[slot="orion-list-item-body"]');

    if (this.href !== '') {
      this.hasTrailingIcon = true;
    }

    if (this.disabled) {
      this.href = '';
    }
  }

  render() {
    // create fragment to hold the list item content
    const component = (
      <>
        {this.hasMarker ? (
          <span class="orion-list-item__marker-container">
            <span class="orion-list-item__marker"></span>
          </span>
        ) : null}

        {this.hasIcon && this.iconName !== '' ? (
          <span class="orion-list-item__icon">
            <i class={`orion-icon orion-icon-${this.iconName}`} />
          </span>
        ) : null}

        {this.hasImageSlot ? (
          <span class="orion-list-item__image">
            <slot name="orion-list-item-image" />
          </span>
        ) : null}

        <span class="orion-list-item__content">
          {this.hasHeadingSlot ? (
            <span class="orion-list-item__heading">
              <slot name="orion-list-item-heading" />
            </span>
          ) : null}

          {this.hasSubHeadingSlot ? (
            <span class="orion-list-item__subheading">
              <slot name="orion-list-item-subheading" />
            </span>
          ) : null}

          {this.hasBodySlot ? (
            <span>
              <slot name="orion-list-item-body" />
            </span>
          ) : null}

          <slot />
        </span>

        {this.hasTrailingIcon && this.trailingIconName !== '' ? (
          <span class="orion-list-item__trailing-icon">
            <i class={`orion-icon orion-icon-${this.trailingIconName}`} />
          </span>
        ) : null}
      </>
    );
    // if href prop is set, wrap the list item content in an anchor tag, if not, just return the list item content
    return (
      <li class={`orion-list-item ${this.disabled ? 'orion-list-item--disabled' : ''}`}>
        {this.href ? (
          <a href={this.href} class="orion-list-item__link">
            {component}
          </a>
        ) : (
          component
        )}
      </li>
    );
  }
}
