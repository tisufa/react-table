import { useEffect } from "react";
import "./App.css";
import { Table, useTable } from "./components";
import { users } from "./data";

function App() {
  const tableUser = useTable("user", [
    {
      header: "Username",
      field: "username",
    },
    {
      header: "Name",
      field: "name",
    },
    {
      header: "Email",
      field: "email",
    },
    {
      header: "Phone Number",
      field: "phoneNumber",
    },
    {
      header: "Status",
      field: "isActive",
      sortable: false,
      component: ({ value }) => {
        return (
          <small
            className={`px-2 py-1 shadow-sm bg-slate-200 rounded-md font-medium text-slate-700 ${
              value === "Aktif" ? "!bg-lime-400 " : ""
            }`}
          >
            {value}
          </small>
        );
      },
      callbacks: {
        createValue: ({ record }) => {
          return record.isActive ? "Aktif" : "Tidak Aktif";
        },
      },
    },
  ]);

  useEffect(() => {
    setTimeout(() => {
      tableUser.setRecords(users);
    }, 0);
  }, []);

  const handleView = (record) => {
    console.log("ViewDetail", record);
  };

  const handleEdit = (record) => {
    console.log("Edit", record);
  };

  const handleDelete = (record) => {
    console.log("Delete", record);
  };

  return (
    <div className="h-screen px-5 justify-center bg-slate-200">
      <div className="text-center w-full py-5">
        <h1 className="font-semibold text-3xl">React Table</h1>
        <p className="mb-3">Create reusable react table from scratch</p>
        <div className="bg-white shadow-md rounded-md w-full mb-3">
          <Table
            model={tableUser}
            actionButtons={({ record }) => (
              <>
                <a
                  href="#"
                  className="text-slate-500"
                  onClick={(e) => {
                    e.preventDefault();
                    handleView(record);
                  }}
                >
                  <em className="fas fa-eye"></em>
                </a>
                <a
                  href="#"
                  className="text-orange-500"
                  onClick={(e) => {
                    e.preventDefault();
                    handleEdit(record);
                  }}
                >
                  <em className="fas fa-pen"></em>
                </a>
                <a
                  href="#"
                  className="text-red-500"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(record);
                  }}
                >
                  <em className="fas fa-trash"></em>
                </a>
              </>
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
