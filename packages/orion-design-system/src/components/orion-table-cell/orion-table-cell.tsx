import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'orion-table-cell',
  styleUrl: 'orion-table-cell.css',
  shadow: true,
})
export class OrionTableCell {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
