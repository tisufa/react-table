const Table = ({ model, actionButtons }) => {
  return (
    <div className="table-wrapper">
      <div className="table-header">{/* TODO: Add Filter/Search */}</div>
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
            {model.records.map((record, i) => (
              <tr
                className="text-left odd:bg-slate-100 hover:bg-slate-200 transition-all duration-300"
                key={i + 1}
              >
                <td className="py-2 px-3">{i + 1}</td>
                {model.columns.map((column, j) => (
                  <td key={j} className="py-2 px-3">
                    <div className="whitespace-nowrap">
                      {record[column.field]}
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
