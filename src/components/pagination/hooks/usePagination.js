import { useState } from "react";

const usePagination = (perPage = 10, size = 5) => {
  const [state, setState] = useState({
    page: 1,
    perPage,
    size,
    totalRecord: 0,
    totalPage: 1,
  });

  const setPage = (page) => {
    setState((prev) => ({
      ...prev,
      page,
    }));
  };

  const setTotalRecord = (totalRecord) => {
    const totalPage = Math.ceil((totalRecord || 0) / state.perPage) || 1;
    setState((prev) => ({
      ...prev,
      totalRecord,
      totalPage,
    }));
  };

  return { ...state, setPage, setTotalRecord };
};

export { usePagination };

