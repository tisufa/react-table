import { useState } from "react";
import '../types/columnTypes';
/**
 *
 * @param {string} moduleCode
 * @param {ColumnTypes[]} columns
 * @returns
 */
const useTable = (moduleCode, columns) => {
  const [state, setState] = useState({
    records: [],
  });

  const setRecords = (records) => {
    setState((prev) => ({
      ...prev,
      records,
    }));
  };

  return { ...state, moduleCode, columns, setRecords };
};

export { useTable };

