import { useEffect, useState } from "react";
import { Pagination, usePagination } from "../pagination";
import { InputSearch } from "./InputSearch";

const Table = ({ model, actionButtons }) => {
  const [state, setState] = useState({
    records: [],
    keywords: "",
    sort: "",
    order: "",
  });

  const pagination = usePagination();

  useEffect(() => {
    model?.options?.stringUrl ? resolveServerRecords() : resolveClientRecords();
  }, [model.records, state.keywords, state.order, state.sort, pagination.page]);

  const resolveServerRecords = async () => {
    try {
      const queryString = createQueryString();
      const response = await fetch(`${model.options.stringUrl}?${queryString}`);
      const records = await response.json();
      pagination.setTotalRecord(+(response.headers.get("x-total-count") || 0));
      setState((prev) => ({
        ...prev,
        records,
      }));
    } catch (ex) {
      console.log(ex);
    }
  };

  const createQueryString = () => {
    const requestDTO = {
      _page: pagination.page,
      _per_page: pagination.perPage,
    };

    if (state.sort) {
      requestDTO["_sort"] = state.sort;
      requestDTO["_order"] = state.order;
    }

    if (state.keywords) {
      requestDTO["q"] = state.keywords;
    }

    const params = new URLSearchParams();
    Object.keys(requestDTO).map((key) => {
      params.append(key, requestDTO[key]);
    });
    return params.toString();
  };

  const resolveClientRecords = () => {
    let records = Array.from(model.records || []);
    // search table
    records = searchRecords(records);
    pagination.setTotalRecord(records.length);

    // sort table
    records = sortRecords(records);

    // pagination
    const start = (pagination.page - 1) * pagination.perPage;
    const end = start + pagination.perPage;
    records = records.slice(start, end);

    setState((prev) => ({
      ...prev,
      records,
    }));
  };

  const searchRecords = (records) => {
    return records.filter((record) => {
      for (const column of model.columns) {
        let value = "";
        if (column?.callbacks?.createValue) {
          value = column.callbacks.createValue({ record });
        } else {
          value = record[column.field];
        }
        if (
          String(value)
            .toLowerCase()
            .includes(state.keywords.toLocaleLowerCase())
        ) {
          return true;
        }
      }
      return false;
    });
  };

  const sortRecords = (records) => {
    if (!state.sort) return records;
    return records.sort((a, b) => {
      let column = model.columns.filter(
        (column) => column.field === state.sort
      )[0];

      let valueA = "";
      let valueB = "";

      if (column?.callbacks?.createValue) {
        valueA = String(column.callbacks.createValue({ record: a }) || "");
        valueB = String(column.callbacks.createValue({ record: b }) || "");
      } else {
        valueA = String(a[column.field] || "");
        valueB = String(b[column.field] || "");
      }

      if (valueA.toLowerCase() < valueB.toLowerCase())
        return state.order === "asc" ? -1 : 1;
      if (valueA.toLowerCase() > valueB.toLowerCase())
        return state.order === "asc" ? 1 : -1;
      return 0;
    });
  };

  const renderColumn = (record, column) => {
    let value = null;
    if (column?.callbacks?.createValue) {
      value = column.callbacks.createValue({ record });
    } else if (column.field) {
      value = record[column.field];
    }
    return column.component
      ? column.component({
          record,
          value,
        })
      : value;
  };

  const handleSearch = (keywords) => {
    pagination.setPage(1);
    setState((prev) => ({
      ...prev,
      keywords,
    }));
  };

  const handleSort = (column) => {
    if (column.sortable === false) return;
    const sort =
      state.sort === column.field && state.order === "desc"
        ? null
        : column.field;
    const order = sort
      ? state.sort !== sort
        ? "asc"
        : state.order === "asc"
        ? "desc"
        : "asc"
      : null;

    setState((prev) => ({
      ...prev,
      sort,
      order,
    }));
  };

  return (
    <div className="table-wrapper">
      <div className="table-header px-3 pt-3 mb-2">
        <div className="flex justify-end">
          <InputSearch onSearch={handleSearch} />
        </div>
      </div>
      <div className="table-body overflow-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th className="py-2 px-3 font-medium">No</th>
              {model.columns.map((column, index) => (
                <th
                  key={index}
                  className={`py-2 px-3 font-medium whitespace-nowrap ${
                    column.sortable !== false
                      ? "hover:bg-slate-50 hover:cursor-pointer"
                      : ""
                  }`}
                  onClick={() => handleSort(column)}
                >
                  <div className="flex items-center gap-3">
                    <span>{column.header}</span>
                    {column.sortable !== false && (
                      <span className="relative">
                        <em className="fas fa-sort text-slate-300"></em>
                        {state.sort === column.field &&
                          (state.order === "asc" ? (
                            <em className="fas fa-sort-up text-green-500 absolute top-1/2 -translate-y-1/2 left-0"></em>
                          ) : (
                            <em className="fas fa-sort-down text-green-500 absolute top-1/2 -translate-y-1/2 left-0"></em>
                          ))}
                      </span>
                    )}
                  </div>
                </th>
              ))}
              {actionButtons && (
                <th className="py-2 px-3 font-medium">
                  <div className="flex justify-center">Action</div>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {state.records.map((record, i) => (
              <tr
                className="text-left odd:bg-slate-100 hover:bg-slate-200 transition-all duration-300"
                key={i + 1}
              >
                <td className="py-2 px-3">
                  {(pagination.page - 1) * pagination.perPage + i + 1}
                </td>
                {model.columns.map((column, j) => (
                  <td key={j} className="py-2 px-3">
                    <div className="whitespace-nowrap">
                      {renderColumn(record, column)}
                    </div>
                  </td>
                ))}
                {actionButtons && (
                  <td className="py-2 px-3">
                    <div className="flex gap-3 justify-center">
                      {actionButtons({ record, index: i })}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-3 flex justify-end">
        <Pagination model={pagination} />
      </div>
    </div>
  );
};

export { Table };

