import { Component, h } from '@stencil/core';

/**
 * @slot default - default slot for note content
 */

@Component({
  tag: 'orion-note',
  styleUrl: 'orion-note.css',
  shadow: true,
})
export class OrionNote {
  render() {
    return (
      <div class="orion-note">
        <slot />
      </div>
    );
  }
}
