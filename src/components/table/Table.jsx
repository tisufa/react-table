const Table = () => {
  return (
    <div className="table-wrapper">
      <div className="table-header">
        {/* TODO: Add Filter/Search */}
      </div>
      <div className="table-body">
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th className="py-2 px-3 font-medium">No</th>
              <th className="py-2 px-3 font-medium">Name</th>
              <th className="py-2 px-3 font-medium">Email</th>
              <th className="py-2 px-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {Array(10)
              .fill(0)
              .map((val, index) => (
                <tr
                  className="text-left odd:bg-slate-100 hover:bg-slate-200 transition-all duration-300"
                  key={val + index + 1}
                >
                  <td className="py-2 px-3">{index + 1}</td>
                  <td className="py-2 px-3">John Doe</td>
                  <td className="py-2 px-3">johndoe@gmail.com</td>
                  <td className="py-2 px-3">Delete</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="table-footer">
          {/* TODO: Add Pagination */}
      </div>
    </div>
  );
};

export { Table };

