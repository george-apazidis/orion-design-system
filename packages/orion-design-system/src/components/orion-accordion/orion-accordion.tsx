import { Component, EventEmitter, Event, Prop, h } from '@stencil/core';

import { generateUUID } from '../../utils/utils';

export interface OrionAccordionToggleEventData {
  visible: boolean;
}

/**
 * @slot orion-accordion-header - slot for accordion header content
 * @slot orion-accorion-panel - slot for accordion panel content
 */

@Component({
  tag: 'orion-accordion',
  styleUrl: 'orion-accordion.css',
  shadow: true,
})
export class OrionAccordion {
  /**
   * Accordion is closed by default
   */
  @Prop({ mutable: true }) open = false;

  /**
   * Chevrons are on the right by default
   */
  @Prop() chevronLeft = false;

  /**
   * Accordion container border
   */
  @Prop() hasContainer = false;

  /**
   * Emitted when the accordion is toggled
   */
  @Event() toggle!: EventEmitter<OrionAccordionToggleEventData>;

  btnUid = '';

  sectionUid = '';

  toggleComponent() {
    this.open = !this.open;
    this.toggle.emit({ visible: this.open });
  }

  componentWillLoad() {
    if (this.open) {
      this.toggle.emit({ visible: this.open });
    }

    this.btnUid = generateUUID();
    this.sectionUid = `sect-${this.btnUid}`;
  }

  render() {
    return (
      <div class={`orion-accordion__container ${this.hasContainer ? 'orion-accordion__container--visible' : ''}`}>
        <button
          type="button"
          class={`orion-accordion__header ${this.chevronLeft ? 'chevron-left' : ''}`}
          aria-expanded={this.open ? 'true' : 'false'}
          aria-controls={this.sectionUid}
          id={this.btnUid}
          onClick={() => this.toggleComponent()}
        >
          <span class="orion-accordion__header__title">
            <slot name="orion-accordion-header" />
          </span>

          {this.open ? (
            <span class="orion-accordion__icon">
              <svg viewBox="0 0 24 24">
                <path
                  d="M21.7250876,17.6196441 C22.2464651,18.1277218 23.0906844,18.1266464 23.6107041,17.6172421 C24.1307239,17.1078378 24.1296232,16.2830056 23.6082457,15.7749279 L12.941579,5.38035589 C12.4211626,4.8732147 11.5788374,4.8732147 11.058421,5.38035589 L0.391754315,15.7749279 C-0.129623174,16.2830056 -0.130723851,17.1078378 0.389295885,17.6172421 C0.90931562,18.1266464 1.75353487,18.1277218 2.27491236,17.6196441 L12,8.14263249 L21.7250876,17.6196441 Z"
                  id="path-1"
                ></path>
              </svg>
            </span>
          ) : (
            <span class="orion-accordion__icon">
              <svg viewBox="0 0 24 24">
                <path
                  d="M2.27491236,5.8803559 C1.75353487,5.37227816 0.90931562,5.37335356 0.389295885,5.88275787 C-0.130723851,6.39216218 -0.129623174,7.21699435 0.391754315,7.72507209 L11.058421,18.1196441 C11.5788374,18.6267853 12.4211626,18.6267853 12.941579,18.1196441 L23.6082457,7.72507209 C24.1296232,7.21699435 24.1307239,6.39216218 23.6107041,5.88275787 C23.0906844,5.37335356 22.2464651,5.37227816 21.7250876,5.8803559 L12,15.3573675 L2.27491236,5.8803559 Z"
                  id="path-1"
                ></path>
              </svg>
            </span>
          )}
        </button>
        <div
          class={`orion-accordion__panel ${this.open ? 'orion-accordion__panel--open' : 'orion-accordion__panel--closed'}`}
          id={this.sectionUid}
          aria-labelledby={this.btnUid}
          aria-hidden={this.open ? 'false' : 'true'}
          role="region"
        >
          <slot name="orion-accordion-panel" />
        </div>
      </div>
    );
  }
}
