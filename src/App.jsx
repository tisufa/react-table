import "./App.css";
import { Table } from "./components";
function App() {
  return (
    <div className="h-screen p-5 justify-center bg-slate-200">
      <div className="text-center w-full">
        <h1 className="font-semibold text-3xl">React Table</h1>
        <p className="mb-3">Create reusable react table from scratch</p>
        <div className="bg-white shadow-md rounded-md w-full mb-3">
          <Table />
        </div>
      </div>
    </div>
  );
}

export default App;
