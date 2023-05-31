import { Component, Host, h, Prop } from '@stencil/core';
import { Alignment } from '../orion-data-table/orion-data-table';

@Component({
  tag: 'orion-table-header',
  styleUrl: 'orion-table-header.css',
  shadow: true,
})
export class OrionTableHeader {
  /**
   * Sets the text alignment for the column
   */
  @Prop() align: Alignment = 'left';

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
