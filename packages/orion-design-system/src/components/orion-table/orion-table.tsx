import { Component, Host, h, State, Listen, Element, Prop } from '@stencil/core';
import Tablesort from 'tablesort';
import { Alignment } from '../orion-data-table/orion-data-table';
import { OrionTableHeader } from '../orion-table-header/orion-table-header';

@Component({
  tag: 'orion-table',
  styleUrl: 'orion-table.css',
  shadow: true,
})
export class OrionTable {
  @Element() el!: HTMLElement;

  /**
   * Controls whether the table should be sortable or not
   */
  @Prop() sortable = false;

  /**
   * Visual variant for table
   */
  @Prop() variant: 'lined' | 'striped' = 'striped';

  // references to count how many headers are present
  @State() headerAlignments: Alignment[] = [];

  // reference to count how many rows are present
  @State() rows: string[][] = [];

  // <table> element to sort
  tableRef!: HTMLElement;

  @Listen('childrenParsed')
  listenForChildren(e: CustomEvent<{ headerElements: Element[]; rowElements: Element[] }>) {
    const { headerElements, rowElements } = e.detail;
    if (headerElements.length > 0) {
      // const headerInnerText = headerElements.map(ele => ele.innerHTML);
      // this.headers = [...this.headers, ...headerInnerText];
      headerElements.forEach((ele, columnIndex) => {
        ele.slot = `header-column-${columnIndex}`;
        const alignment = (ele as unknown as OrionTableHeader).align ?? 'left';
        this.headerAlignments.push(alignment);
        this.el.append(ele);
      });
    }

    if (rowElements.length > 0) {
      const rowInnerText = rowElements.map(ele => ele.innerHTML);
      this.rows = [...this.rows, rowInnerText];
      rowElements.forEach((ele, columnIndex) => {
        ele.slot = `row-${this.rows.length - 1}-column-${columnIndex}`;
        this.el.append(ele);
      });
    }
  }

  componentDidLoad() {
    setTimeout(() => {
      if (this.sortable) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
        Tablesort(this.tableRef);
      }
    }, 100);
  }

  private getTableCSSClass = () => {
    return `orion-table orion-table--${this.variant} table-sort`;
  };

  private getCellCSSClass = (alignment: Alignment) => `orion-table-cell--${alignment}`;

  render() {
    return (
      <Host>
        <div class="orion-table-wrapper">
          <table
            class={this.getTableCSSClass()}
            ref={el => {
              this.tableRef = el as HTMLElement;
            }}
          >
            <thead>
              <tr>
                {this.headerAlignments.map((_, columnIndex) => (
                  <th data-sort-method={this.sortable ? 'string' : false} class={this.getCellCSSClass(_)}>
                    <span>
                      <slot name={`header-column-${columnIndex}`}></slot>
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {this.rows.map((row, rowIndex) => {
                return (
                  <tr>
                    {row.map((cell, columnIndex) => (
                      <td data-sort={cell} class={this.getCellCSSClass(this.headerAlignments[columnIndex])}>
                        <slot name={`row-${rowIndex}-column-${columnIndex}`}></slot>
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Host>
    );
  }
}
