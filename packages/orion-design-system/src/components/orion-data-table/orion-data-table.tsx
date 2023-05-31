import { Component, Host, h, Prop, State, Watch, Element, Event, EventEmitter } from '@stencil/core';
import Tablesort from 'tablesort';
import formatters, { Formatter } from './helpers/formatters';
import sorts from './helpers/sorts';
import { generateUUID } from '../../utils/utils';

export type CheckboxColumnState = 'checked' | 'unchecked' | 'indeterminate';

export type SimpleData = string | number;
export type IconData = { iconName: string; iconCount: number; sortValue?: number };
export type CheckboxData = boolean;
export type SelectData = { default: string | number; id?: string };
export type ComplexData = { value: SimpleData; sortValue?: SimpleData };

export type Cell = SimpleData | ComplexData | IconData | SelectData | CheckboxData;

export type SelectOption = { text: string; value: string | number };
export type Alignment = 'left' | 'center' | 'right';
export type HeaderType = 'string' | 'checkbox' | 'select' | 'icon' | 'number';

type ComplexHeader = {
  name: string;
  type?: HeaderType;
  formatter?: Formatter;
  align?: Alignment;
  selectOptions?: SelectOption[];
  sortable?: boolean;
};

export type Headers = (string | ComplexHeader)[];

export type Row = Cell[];
export type Rows = Row[];

type innerRowData = (SimpleData | CheckboxData)[];
export type OrionTableUpdatedEvent = { columnIndex: number; rowIndex: number; updatedRow: innerRowData };

export type OrionCheckboxColumnToggledEvent = { columnIndex: number; toggledTo: boolean };

@Component({
  tag: 'orion-data-table',
  styleUrl: 'orion-data-table.css',
  shadow: true,
})
export class OrionDataTable {
  @Element() el!: HTMLElement;

  // <table> element to sort
  tableRef!: HTMLElement;

  /**
   * Visual variant for table
   */
  @Prop() variant: 'lined' | 'striped' = 'striped';

  /**
   * An array of column headers
   */
  @Prop() headers: Headers = [];

  /**
   * A 2D array for row data
   */
  @Prop() rows: Rows = [];

  /**
   * Pins n columns to the left hand side of the table
   */
  @Prop() pin = 0;

  /**
   * Controls whether the table should be sortable or not
   */
  @Prop() sortable = false;

  /**
   * Adds in a checkbox column to the left hand side of the table
   */
  @Prop() checkbox = false;

  /**
   * Hides columns by index
   */
  @Prop() hiddenColumns: number[] = [];

  /**
   * Emits event when a checkbox or select has it's value changed
   */
  @Event() orionTableUpdated!: EventEmitter<OrionTableUpdatedEvent>;

  /**
   * Emits event when a column header's toggle is pressed
   */
  @Event() orionCheckboxColumnToggled!: EventEmitter<OrionCheckboxColumnToggledEvent>;

  // Headers are stored here as complexHeaders, so we can assume certain properties later on
  @State() parsedHeaders: ComplexHeader[] = [];

  // Rows are stored here, this allows the addition of the first column checkbox
  @State() parsedRows: Rows = [];

  // A UUID to allow for non-clashing select sorts
  @State() componentUUID = '';

  // Used to check initial state of checkboxes without going through every column
  columnCheckboxIndices: number[] = [];

  // The Tablesort reference
  private sort: ReturnType<typeof Tablesort> | null = null;

  // Resize observer for the table anchor
  private resizeObserver: ResizeObserver | null = null;

  @Watch('headers')
  onHeadersChanges() {
    this.updateTableData();
  }

  @Watch('hiddenColumns')
  onHiddenColumnsChanges() {
    this.updateTableData();
  }

  @Watch('checkbox')
  onCheckboxChange() {
    this.updateTableData();
  }

  private updateTableData = () => {
    this.parseHeadersProp();
    this.parseRowsProp();
    this.resetColumns();
    this.pinColumns();
  };

  @Watch('pin')
  onPinChange() {
    this.resetColumns();
    this.pinColumns();
  }

  componentWillLoad = () => {
    this.componentUUID = generateUUID();
    this.parseHeadersProp();
    this.parseRowsProp();
    this.extendTableSorting();
  };

  private parseHeadersProp = () => {
    const parsedHeaders = this.headers.map((header, columnIndex) => {
      const cH = header as ComplexHeader;
      if (cH.type === 'checkbox') {
        this.columnCheckboxIndices.push(columnIndex);
        if (!cH.align) {
          cH.align = 'center';
          return cH;
        }
      }
      if (!cH.name) {
        const complexHeader = {
          name: header,
          type: 'string',
        } as ComplexHeader;
        return complexHeader;
      }
      if (!cH.type) {
        cH.type = 'string';
        return cH;
      }
      return header as ComplexHeader;
    });
    if (this.checkbox) {
      parsedHeaders.unshift({
        name: 'defaultCheckbox',
        type: 'checkbox',
        align: 'center',
      });
    }
    this.parsedHeaders = parsedHeaders;
  };

  private parseRowsProp = () => {
    let parsedRows = this.rows;
    if (this.checkbox) {
      parsedRows = this.rows.map(row => [false, ...row]);
    }
    this.parsedRows = parsedRows;
  };

  private extendTableSorting = () => {
    // as we need to provide this.el in order to grab the select values from the shadow-dom
    // to prevent overriding the global window Tablesort's select extension we scope it to only this table via uuid
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    Tablesort.extend(`select-${this.componentUUID}`, ...sorts.select(this.el));

    // base 'number' sort doesn't seem to work (it should be using this sort (https://github.com/tristen/tablesort/blob/master/src/sorts/tablesort.number.js))
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    Tablesort.extend('number', ...sorts.number());

    // commented out as checkboxes cannot be sorted as of right now
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    // Tablesort.extend('checkbox', ...sorts.checkbox(this.el));
  };

  componentDidLoad() {
    const pinAnchor = this.el.shadowRoot?.querySelector('.OrionTable');
    if (!pinAnchor || this.resizeObserver) return;
    this.resizeObserver = new ResizeObserver(this.handleAnchorResize);
    this.resizeObserver?.observe(pinAnchor);
    this.checkAllCheckboxColumnStates();
  }

  componentDidRender() {
    if (!this.sort && this.sortable) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
      this.sort = Tablesort(this.tableRef);
    }
    this.reSortTable();
  }

  private handleAnchorResize = (resizeEntries: ResizeObserverEntry[]) => {
    const resize = resizeEntries[0];
    if (!resize || resize.contentRect.width === 0) return;
    this.resetColumns();
    this.pinColumns();
  };

  private resetColumns = () => {
    const wrapper = this.el.shadowRoot?.querySelector('.OrionTable__wrapper');
    if (!wrapper) return;
    const wrapperElement = wrapper as HTMLElement;

    const rows = this.el.shadowRoot?.querySelectorAll('.OrionTable__row');
    if (!rows || rows.length <= 0) return;

    // reset wrapper
    wrapperElement.style.marginLeft = '0px';
    // reset rows
    rows.forEach(row => {
      (row as HTMLElement).style.height = 'auto';
      const rowCells = row.childNodes;
      rowCells.forEach(c => {
        const cell = c as HTMLElement;
        cell.style.left = 'initial';
        cell.style.height = 'auto';
        const width = cell.classList.contains('OrionTable__header--checkbox') ? '40px' : 'auto';
        cell.style.width = width;
        const css = ['OrionTable__cell--sticky', 'OrionTable__cell--sticky--last', 'OrionTable__cell--sticky--internal'];
        cell.classList.remove(...css);
      });
    });
  };

  private pinColumns = () => {
    const pinAnchor = this.el.shadowRoot?.querySelector('.OrionTable');
    if (!pinAnchor) return;
    const wrapper = this.el.shadowRoot?.querySelector('.OrionTable__wrapper');
    if (!wrapper) return;
    const wrapperElement = wrapper as HTMLElement;

    const rows = this.el.shadowRoot?.querySelectorAll('.OrionTable__row');
    if (!rows) return;

    // get widest row cell for each column
    const columnWidthsMap: Record<number, number> = {};
    const columnHeightsMap: Record<number, number> = {};
    let maxHeaderHeight = 0;
    rows?.forEach((row, rowIndex) => {
      for (let i = 0; i < this.pin; i += 1) {
        const newStickyColumn = row.childNodes[i] as HTMLElement;
        if (!newStickyColumn) return;
        let { width: columnWidth } = newStickyColumn.getBoundingClientRect();
        const { height: columnHeight } = newStickyColumn.getBoundingClientRect();

        // if it's a checkbox column
        if (newStickyColumn.classList.contains('OrionTable__header--checkbox') || newStickyColumn.classList.contains('OrionTable__data--checkbox')) {
          columnWidth = 40;
        }

        if (!columnWidthsMap[i]) {
          columnWidthsMap[i] = columnWidth;
        } else if (columnWidth > columnWidthsMap[i]) {
          columnWidthsMap[i] = columnWidth;
        }
        // if header row
        if (rowIndex === 0) {
          if (columnHeight > maxHeaderHeight) maxHeaderHeight = columnHeight;
          columnHeightsMap[rowIndex] = maxHeaderHeight;
          // if body row
        } else if (!columnHeightsMap[rowIndex]) {
          columnHeightsMap[rowIndex] = columnHeight;
        } else if (columnHeight > columnHeightsMap[rowIndex]) {
          columnHeightsMap[rowIndex] = columnHeight;
        }
      }
    });

    const columnWidths = Object.values(columnWidthsMap);
    const columnHeights = Object.values(columnHeightsMap);
    const totalWidth = Object.values(columnWidthsMap).reduce((total, current) => total + current, 0);

    // escape early and remove
    if (pinAnchor?.getBoundingClientRect().width < totalWidth) {
      this.resetColumns();
      return;
    }

    // adjust all rows to be equal height
    rows?.forEach((row, index) => {
      (row as HTMLElement).style.height = index === 0 ? `${maxHeaderHeight}px` : `${columnHeights[index]}px`;
    });

    // keep track of total width of each column
    // apply left to column
    // add width to total width
    rows?.forEach((row, rowIndex) => {
      // get first n columns
      let left = 0;
      for (let i = 0; i < this.pin; i += 1) {
        const newStickyColumn = row.childNodes[i] as HTMLElement;

        if (!newStickyColumn) return;
        const isLast = i + 1 === this.pin;
        const css = ['OrionTable__cell--sticky', `OrionTable__cell--sticky--${isLast ? 'last' : 'internal'}`];
        newStickyColumn.classList.add(...css);

        newStickyColumn.style.width = `${columnWidths[i]}px`;
        newStickyColumn.style.height = rowIndex === 0 ? `${maxHeaderHeight}px` : `${columnHeights[rowIndex]}px`;
        if (i > 0) {
          left += columnWidths[i - 1];
        }
        newStickyColumn.style.left = `${left}px`;
      }
    });

    // apply left margin to base table
    wrapperElement.style.marginLeft = `${totalWidth}px`;
  };

  private reSortTable = () => {
    if (this.sort) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      this.sort.refresh();
    }
  };

  private handleSelectChange = (columnIndex: number, rowIndex = -1) => {
    if (rowIndex >= 0) {
      this.handleTableValueUpdate(columnIndex, rowIndex);
    }

    const markupIndex = columnIndex - this.hiddenColumns.filter(index => index < columnIndex).length;

    const columnHeaders = this.el.shadowRoot?.querySelectorAll('.OrionTable__header');
    if (columnHeaders && columnHeaders[markupIndex]) {
      const sortStatus = columnHeaders[markupIndex].getAttribute('aria-sort');
      if (sortStatus) {
        this.reSortTable();
      }
    }
  };

  private checkAllCheckboxColumnStates = () => {
    this.columnCheckboxIndices.forEach(columnIndex => {
      this.checkCheckboxColumnStatus(columnIndex);
    });
  };

  private checkCheckboxColumnStatus = (columnIndex: number, rowIndex = -1) => {
    const rows = this.el.shadowRoot?.querySelectorAll('tr.OrionTable__row--body');
    const headerRow = this.el.shadowRoot?.querySelector('tr.OrionTable__row--head');
    if (!rows || !headerRow) return;

    if (rowIndex >= 0) {
      this.handleTableValueUpdate(columnIndex, rowIndex);
    }

    const markupIndex = columnIndex - this.hiddenColumns.filter(index => index < columnIndex).length;

    let checkedRows = 0;
    rows.forEach(rowElement => {
      const checkboxTd = rowElement.childNodes[markupIndex] as HTMLTableCellElement;
      if (checkboxTd) {
        const checkbox = checkboxTd.querySelector('orion-checkbox');
        if (checkbox && checkbox.checked) checkedRows += 1;
      }
    });

    let columnState: CheckboxColumnState = 'indeterminate';
    if (checkedRows >= rows.length) {
      columnState = 'checked';
    } else if (checkedRows === 0) {
      columnState = 'unchecked';
    }

    const checkboxTh = headerRow.childNodes[markupIndex] as HTMLTableCellElement;
    if (checkboxTh) {
      const checkbox = checkboxTh.querySelector('orion-checkbox');
      if (checkbox) {
        checkbox.checked = columnState === 'checked';
        checkbox.indeterminate = columnState === 'indeterminate';
      }
    }
  };

  private toggleAllCheckboxInColumn = (columnIndex: number, event: CustomEvent<{ value: string; checked: boolean }>) => {
    const rows = this.el.shadowRoot?.querySelectorAll('tr.OrionTable__row');
    if (!rows) return;

    this.orionCheckboxColumnToggled.emit({ columnIndex, toggledTo: event.detail.checked });

    rows.forEach((rowElement, rowIndex) => {
      const checkboxTd = rowElement.childNodes[columnIndex] as HTMLTableCellElement;
      if (checkboxTd) {
        const checkbox = checkboxTd.querySelector('orion-checkbox');
        if (checkbox) {
          if (rowIndex === 0) {
            checkbox.indeterminate = false;
          } else {
            checkbox.checked = event.detail.checked;
          }
        }
      }
    });
  };

  private handleTableValueUpdate = (columnIndex: number, rowIndex: number) => {
    const updatedRow: innerRowData = [];
    const row = this.el.shadowRoot?.querySelector(`[data-row="${rowIndex}"]`);
    if (!row) return;
    // go through and parse each row's actual value
    row.childNodes.forEach(c => {
      const cell = c as HTMLElement;
      if (!cell) return;
      const type = (cell.dataset.type ?? 'string') as HeaderType;
      switch (type) {
        case 'checkbox':
          updatedRow.push(cell.querySelector('orion-checkbox')?.checked ?? false);
          break;
        case 'select': {
          const select = cell.querySelector('select');
          updatedRow.push(select?.options[select?.selectedIndex].text ?? (this.parsedRows[rowIndex][columnIndex] as SelectData).default);
          break;
        }
        case 'icon':
          updatedRow.push(cell.querySelectorAll('i').length);
          break;
        default:
          updatedRow.push(cell.innerText);
          break;
      }
    });
    this.orionTableUpdated.emit({ columnIndex, rowIndex, updatedRow });
  };

  private getTableCSSClass = () => {
    return `orion-table orion-table--${this.variant} table-sort OrionTable__table`;
  };

  private getTableHeaderCSSClass = (headerType: HeaderType = 'string', headerAlignment: Alignment = 'left') => {
    return `OrionTable__header OrionTable__header--${headerType} OrionTable__cell OrionTable__cell--${headerAlignment ?? 'left'}`;
  };

  private generateCellId = (columnIndex: number, type: HeaderType, rowIndex: number, uuid: string) => {
    return `${this.parsedHeaders[columnIndex].name}-${type}-${rowIndex}-${uuid}`;
  };

  render() {
    return (
      <Host>
        <div class="OrionTable">
          <div class="OrionTable__wrapper">
            <table
              ref={el => {
                this.tableRef = el as HTMLElement;
              }}
              class={this.getTableCSSClass()}
            >
              <thead class="OrionTable__table-head">
                <tr class="OrionTable__row OrionTable__row--head">
                  {this.parsedHeaders.map((header, columnIndex) => {
                    if (this.hiddenColumns.length > 0 && this.hiddenColumns.includes(columnIndex)) return null;
                    if (header.type === 'checkbox') {
                      return (
                        <th data-sort-method="none" class={this.getTableHeaderCSSClass(header.type, header.align)}>
                          <span>
                            <orion-checkbox
                              onValueChanged={(e: CustomEvent<{ value: string; checked: boolean }>) => this.toggleAllCheckboxInColumn(columnIndex, e)}
                            ></orion-checkbox>
                          </span>
                        </th>
                      );
                    }
                    let sortMethod: string | undefined = 'none';
                    const sortHeader = header.sortable ?? true;
                    if (this.sortable && sortHeader) {
                      sortMethod = header.type === 'select' ? `select-${this.componentUUID}` : header.type;
                    }
                    return (
                      <th data-sort-method={sortMethod} class={this.getTableHeaderCSSClass(header.type, header.align)}>
                        <span class="OrionTable__header-inner-wrapper">
                          <span class="OrionTable__header-copy">{header.name}</span>
                        </span>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody class="OrionTable__table-body">
                {this.parsedRows.map((row, rowIndex) => {
                  return (
                    <tr class="OrionTable__row OrionTable__row--body" data-row={rowIndex}>
                      {row.map((columnData, columnIndex) => {
                        if (this.hiddenColumns.length > 0 && this.hiddenColumns.includes(columnIndex)) return null;
                        const align = this.parsedHeaders[columnIndex].align ?? 'left';
                        const { formatter } = this.parsedHeaders[columnIndex];
                        const rowElementUUID = generateUUID();
                        if (formatter) {
                          return formatter(columnData, align);
                        }
                        switch (this.parsedHeaders[columnIndex].type ?? 'string') {
                          case 'number':
                          case 'string':
                            return formatters.string(columnData, align);
                          case 'icon':
                            return formatters.icon(columnData, align);
                          case 'select':
                            return formatters.select(
                              () => this.handleSelectChange(columnIndex, rowIndex),
                              this.parsedHeaders[columnIndex].selectOptions ?? [],
                              this.generateCellId(columnIndex, 'select', rowIndex, rowElementUUID),
                            )(columnData, align);
                          case 'checkbox':
                            return formatters.checkbox(
                              () => this.checkCheckboxColumnStatus(columnIndex, rowIndex),
                              this.generateCellId(columnIndex, 'checkbox', rowIndex, rowElementUUID),
                            )(columnData, align);
                          default:
                            return (
                              <td class={`OrionTable__data OrionTable__cell OrionTable__cell--${align}`}>
                                <span>
                                  <span class="OrionTable__data-invalid-type">{this.parsedHeaders[columnIndex].type}</span> is an unsupported type
                                </span>
                              </td>
                            );
                        }
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </Host>
    );
  }
}
