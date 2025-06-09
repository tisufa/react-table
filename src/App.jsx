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
    },
  ]);

  useEffect(() => {
    setTimeout(() => {
      tableUser.setRecords(users);
    }, 2000);
  }, []);

  return (
    <div className="h-screen p-5 justify-center bg-slate-200">
      <div className="text-center w-full">
        <h1 className="font-semibold text-3xl">React Table</h1>
        <p className="mb-3">Create reusable react table from scratch</p>
        <div className="bg-white shadow-md rounded-md w-full mb-3">
          <Table model={tableUser} />
        </div>
      </div>
    </div>
  );
}

export default App;
