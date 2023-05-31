const selectSort = (el: HTMLElement) => {
  const shouldSort = (item: string) => {
    return /-select-/gi.test(item);
  };
  const sort = (a: string, b: string) => {
    if (!a || !b) return 0;
    const aSelect = el.shadowRoot?.querySelector(`#${a}`);
    const bSelect = el.shadowRoot?.querySelector(`#${b}`);
    if (!aSelect || !bSelect) return 0;

    const aValue = (aSelect as HTMLSelectElement).value;
    const bValue = (bSelect as HTMLSelectElement).value;

    if (aValue > bValue) {
      return -1;
    }
    if (aValue < bValue) {
      return 1;
    }
    return 0;
  };
  return [shouldSort, sort];
};

const checkboxSort = (el: HTMLElement) => {
  const shouldSort = (item: string) => {
    return /-checkbox-/gi.test(item);
  };
  const sort = (a: string, b: string) => {
    if (!a || !b) return 0;
    const aSelect = el.shadowRoot?.querySelector(`#${a}`);
    const bSelect = el.shadowRoot?.querySelector(`#${b}`);
    if (!aSelect || !bSelect) return 0;

    const aIsChecked = (aSelect as HTMLInputElement).checked;
    const bIsChecked = (bSelect as HTMLInputElement).checked;

    if (aIsChecked && !bIsChecked) return -1;
    if (!aIsChecked && bIsChecked) return 1;
    return 0;
  };
  return [shouldSort, sort];
};

const numberSort = () => {
  const cleanNumber = (i: string) => {
    return i.replace(/[^\-?0-9.]/g, '');
  };

  const compareNumber = (a: string, b: string) => {
    let numA = parseFloat(a);
    let numB = parseFloat(b);

    numA = Number.isNaN(numA) ? 0 : numA;
    numB = Number.isNaN(numB) ? 0 : numB;

    return numA - numB;
  };

  const shouldSort = (item: string) => {
    return (
      item.match(/^[-+]?[£\x24Û¢´€]?\d+\s*([,.]\d{0,2})/) || // Prefixed currency
      item.match(/^[-+]?\d+\s*([,.]\d{0,2})?[£\x24Û¢´€]/) || // Suffixed currency
      item.match(/^[-+]?(\d)*-?([,.]){0,1}-?(\d)+([E,e][-+][\d]+)?%?$/)
    ); // Number
  };
  const sort = (a: string, b: string) => {
    const numA = cleanNumber(a);
    const numB = cleanNumber(b);

    return compareNumber(numB, numA);
  };
  return [shouldSort, sort];
};

export default {
  select: selectSort,
  checkbox: checkboxSort,
  number: numberSort,
};
