import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'orion-tab',
  styleUrl: 'orion-tab.css',
  shadow: true,
})
export class OrionTab {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
