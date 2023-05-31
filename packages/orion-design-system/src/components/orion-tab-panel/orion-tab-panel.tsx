import { Component, Host, h, Prop, Listen } from '@stencil/core';
import { TabSelectionEvent } from '../orion-tabs/orion-tabs';

@Component({
  tag: 'orion-tab-panel',
  styleUrl: 'orion-tab-panel.css',
  shadow: true,
})
export class OrionTabPanel {
  /**
   * Index of tab that controls if this panel is active. Set by a parent orion-tabs component.
   */
  @Prop() panelIndex = -1;

  /**
   * Specifies which orion-tabs element this panel is bound to. Set by a parent orion-tabs component.
   */
  @Prop() for = '';

  /**
   * Marks the panel as active or not
   */
  @Prop({ reflect: true, mutable: true }) isActive = false;

  @Listen('orionTabSelected', { target: 'window' })
  tabSelected(e: CustomEvent) {
    const { target, detail } = e;
    if ((target as HTMLElement).id === this.for) {
      if (detail) {
        const { tabIndex } = detail as TabSelectionEvent;
        this.isActive = tabIndex === this.panelIndex;
      }
    }
  }

  private getPanelClasses = () => {
    return `
      orion-tab-panel
      orion-tab-panel--${this.isActive ? 'active' : 'inactive'}
    `;
  };

  render() {
    return (
      <Host>
        <div class={this.getPanelClasses()} role="tabpanel" aria-labelledby={`${this.for}-tab-${this.panelIndex}`}>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
