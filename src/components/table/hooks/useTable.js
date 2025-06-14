import { useState } from "react";
import "../types/tableTypes";
/**
 *
 * @param {string} moduleCode
 * @param {ColumnTypes[]} columns
 * @param {TableOptionTypes} options
 * @returns
 */
const useTable = (moduleCode, columns, options) => {
  const [state, setState] = useState({
    records: [],
  });

  const setRecords = (records) => {
    setState((prev) => ({
      ...prev,
      records,
    }));
  };

  return { ...state, moduleCode, columns, options, setRecords };
};

export { useTable };

