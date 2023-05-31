import { Component, h } from '@stencil/core';

@Component({
  tag: 'orion-list',
  styleUrl: 'orion-list.css',
  shadow: true,
})
export class OrionList {
  render() {
    return (
      <ul class="orion-list">
        <slot />
      </ul>
    );
  }
}
