import { useState } from "react";

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

