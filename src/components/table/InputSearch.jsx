import { useEffect, useState } from "react";

const InputSearch = ({ onSearch }) => {
  const [keywords, setKeywords] = useState("");

  useEffect(() => {
    const timeOut = setTimeout(() => {
      onSearch(keywords);
    }, 300);
    return () => clearTimeout(timeOut);
  }, [keywords]);

  const handleChange = (e) => {
    setKeywords(e.target.value);
  };

  return (
    <div className="relative">
      <input
        className="border-2 border-slate-300 rounded-md px-2 py-1 focus:outline-none pr-7 max-w-[180px]"
        placeholder="Search..."
        onChange={handleChange}
      />
      <em className="fas fa-search text-slate-500 absolute right-2 top-1/2 -translate-y-1/2"></em>
    </div>
  );
};

export { InputSearch };

