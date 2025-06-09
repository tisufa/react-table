import { useEffect, useState } from "react";
import { InputSearch } from "./InputSearch";

const Table = ({ model, actionButtons }) => {
  const [state, setState] = useState({
    records: [],
    keywords: "",
  });

  useEffect(() => {
    resolveClientRecords();
  }, [model.records, state.keywords]);

  const resolveClientRecords = () => {
    let records = Array.from(model.records || []);
    records = searchRecords(records);
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
    setState((prev) => ({
      ...prev,
      keywords,
    }));
  };

  return (
    <div className="table-wrapper">
      <div className="table-header px-3 pt-3">
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
                  className="py-2 px-3 font-medium whitespace-nowrap"
                >
                  {column.header}
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
                <td className="py-2 px-3">{i + 1}</td>
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
      <div className="table-footer">{/* TODO: Add Pagination */}</div>
    </div>
  );
};

export { Table };
