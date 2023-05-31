import { Component, h, Prop, Element } from '@stencil/core';

export type OrionHeaderLogoPlacementOptions = 'left' | 'center' | 'right';

export type OrionHeaderHeadingPlacementOptions = 'left' | 'center' | 'right';

/**
 * @slot orion-header-left - slot for left content
 * @slot orion-header-center - slot for center content
 * @slot orion-header-right - slot for right content
 * @slot - Unnamed default slot for header content
 */

@Component({
  tag: 'orion-header',
  styleUrl: 'orion-header.css',
  shadow: true,
})
export class OrionHeader {

  hasNamedSlots = false;

  @Element() el!: HTMLElement;

  /**
   * Application/page title heading
   */
  @Prop() heading = '';

  /**
   * Application/page title subheading
   */
  @Prop() subheading = '';

  hasHeading = false;

  /**
   * Heading placement (left, center, right). Defaults to center.
   */
  @Prop() headingPlacement: OrionHeaderHeadingPlacementOptions = 'center';

  /**
   * Hide logo
   */
  @Prop() noLogo = false;

  /**
   * Logo HREF
   */
  @Prop() logoHref?: string = '';

  /**
   * Logo alt text
   */
  @Prop() logoAlt = 'United Airlines';

  /**
   * Logo placement (left, center, right). Defaults to left.
   */
  @Prop() logoPlacement: OrionHeaderLogoPlacementOptions = 'left';

  componentWillLoad(): void {

    if (this.heading === '') {
      this.hasHeading = false;
    } else {
      this.hasHeading = true;
    }

    this.hasNamedSlots = !!this.el.querySelector('[slot="orion-header-left"]') || !!this.el.querySelector('[slot="orion-header-center"]') || !!this.el.querySelector('[slot="orion-header-right"]') || this.hasHeading || !this.noLogo;
  }

  render() {
    return (
      <header role="banner" class="orion-header">

        {this.hasNamedSlots ? (
          <div class="orion-header__named-slots">

            <span class="orion-header__left">

              <slot name="orion-header-left" />

              {!this.noLogo && this.logoPlacement === 'left' ?
                <div class="orion-header__logo">
                  {this.logoHref !== '' ?
                    <a href={this.logoHref}><img src="../../assets/logos/united_logo.png" alt={this.logoAlt} /></a>
                    :
                    <img src="../../assets/logos/united_logo.png" alt={this.logoAlt} />
                  }
                </div>
                : null}

              {this.hasHeading && this.headingPlacement === 'left' ?
                <div class="orion-header__heading-container orion-header__heading-container--left">
                  <div class="orion-header__heading">{this.heading}</div>
                  <div class="orion-header__subheading">{this.subheading}</div>
                </div>
                : null}
                
              <slot name="orion-header-left-center" />

            </span>

            <span class="orion-header__center">

              {!this.noLogo && this.logoPlacement === 'center' ? 
                <div class="orion-header__logo">
                {this.logoHref !== '' ?
                  <a href={this.logoHref}><img src="../../assets/logos/united_logo.png" alt={this.logoAlt} /></a>
                  :
                  <img src="../../assets/logos/united_logo.png" alt={this.logoAlt} />
                }
              </div>
              : null}
              
              {this.hasHeading && this.headingPlacement === 'center' ?
                <div class="orion-header__heading-container orion-header__heading-container--center">
                  <div class="orion-header__heading">{this.heading}</div>
                  <div class="orion-header__subheading">{this.subheading}</div>
                </div>
                : null}

              <slot name="orion-header-center" />

            </span>

            <div class="orion-header__right">

              {this.hasHeading && this.headingPlacement === 'right' ?
                <div class="orion-header__heading-container orion-header__heading-container--right">
                  <div class="orion-header__heading">{this.heading}</div>
                  <div class="orion-header__subheading">{this.subheading}</div>
                </div>
                : null}

              {!this.noLogo && this.logoPlacement === 'right' ?
                <div class="orion-header__logo">
                  {this.logoHref !== '' ?
                    <a href={this.logoHref}><img src="../../assets/logos/united_logo.png" alt={this.logoAlt} /></a>
                    :
                    <img src="../../assets/logos/united_logo.png" alt={this.logoAlt} />
                  }
                </div>
                : null}

              <slot name="orion-header-right" />

            </div>
          </div>
        ) : (
          ''
        )}

        <div class="orion-header-content"><slot /></div>

      </header>

    );
  }

}