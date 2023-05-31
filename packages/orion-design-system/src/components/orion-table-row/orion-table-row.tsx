import { Component, Host, h, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'orion-table-row',
  styleUrl: 'orion-table-row.css',
  shadow: true,
})
export class OrionTableRow {
  @Event() childrenParsed!: EventEmitter<{ headerElements: Element[]; rowElements: Element[] }>;

  private slotEl!: HTMLSlotElement;

  private emitSlotChildren = () => {
    if (!this.slotEl) return;
    const headerElements: Element[] = [];
    const rowElements: Element[] = [];
    this.slotEl.assignedElements().forEach(ele => {
      // assign each generic slot to a specific slot based on component type
      if (ele.tagName === 'ORION-TABLE-HEADER') {
        headerElements.push(ele);
      } else if (ele.tagName === 'ORION-TABLE-CELL') {
        rowElements.push(ele);
      } else {
        // console.warn('Non-slotted element in component');
      }
    });
    this.childrenParsed.emit({ headerElements, rowElements });
  };

  componentDidLoad() {
    this.emitSlotChildren();
  }

  render() {
    return (
      <Host>
        <slot
          ref={el => {
            this.slotEl = el as HTMLSlotElement;
          }}
        ></slot>
      </Host>
    );
  }
}
