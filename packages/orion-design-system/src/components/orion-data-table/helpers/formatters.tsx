import { h } from '@stencil/core';
import { Cell, SimpleData, ComplexData, IconData, SelectData, Alignment, SelectOption, CheckboxData } from '../orion-data-table';

const getCellCSSClass = (type: string, align: Alignment = 'left') => {
  return `OrionTable__cell OrionTable__cell--${align} OrionTable__data OrionTable__data--${type}`;
};

export type Formatter = (cell: Cell, align?: Alignment) => Element;

const formatString: Formatter = (cell, align) => {
  const complexCell = cell as ComplexData;
  if (complexCell.value) {
    return (
      <td class={getCellCSSClass('string', align)} data-sort={complexCell.sortValue ?? complexCell.value} data-type="string">
        <span>{complexCell.value}</span>
      </td>
    );
  }
  return (
    <td class={getCellCSSClass('string', align)} data-sort={(cell as SimpleData).toString()} data-type="string">
      <span>{(cell as SimpleData).toString()}</span>
    </td>
  );
};

const formatIcon: Formatter = (cell, align) => {
  const iconCell = cell as IconData;
  if (!iconCell.iconName) return <td class={getCellCSSClass('icon', align)}>invalid icon data</td>;
  return (
    <td class={getCellCSSClass('icon', align)} data-sort={iconCell.sortValue ?? iconCell.iconCount} data-type="icon">
      <span>
        {new Array(iconCell.iconCount).fill('n').map(_ => {
          return <i class={`orion-icon orion-icon-${iconCell.iconName}`}></i>;
        })}
      </span>
    </td>
  );
};

type FormatWrapperType = (onChange: (event: Event) => void, options: SelectOption[], id: string) => Formatter;
const formatSelect: FormatWrapperType = (onChange, options, id) => (cell, align) => {
  const selectCell = cell as SelectData;
  if (!selectCell.default) return <td class={getCellCSSClass('select', align)}>invalid select data</td>;
  return (
    <td class={getCellCSSClass('select', align)} data-sort={id} data-type="select">
      <span>
        <select onChange={onChange} id={id}>
          {options.map(option => (
            <option selected={selectCell.default === option.text || selectCell.default === option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
        <div class="OrionTable__select-arrow" aria-hidden></div>
      </span>
    </td>
  );
};

type FormatCheckboxType = (onChange: (event: Event) => void, id: string) => Formatter;
const formatCheckbox: FormatCheckboxType = (onChange, id) => (cell, align) => {
  const checkboxCell = cell as CheckboxData;
  if (typeof checkboxCell !== 'boolean') return <td class={getCellCSSClass('checkbox', align)}>invalid checkbox data</td>;

  return (
    <td class={getCellCSSClass('checkbox', align)} data-sort={id} data-type="checkbox">
      <span>
        <orion-checkbox
          style={{ '--orion-space-md': '0px', '--orion-space-xxl': '0px', '--orion-space-lg': '0px' }}
          checked={checkboxCell}
          value={checkboxCell.toString()}
          name={id}
          id={id}
          onValueChanged={onChange}
        ></orion-checkbox>
      </span>
    </td>
  );
};

export default {
  string: formatString,
  icon: formatIcon,
  select: formatSelect,
  checkbox: formatCheckbox,
};
