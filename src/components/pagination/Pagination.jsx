import { useEffect, useState } from "react";

const Pagination = ({ model }) => {
  const [state, setState] = useState({
    paginations: [],
  });

  useEffect(() => {
    const page = model.page;
    const size = model.size;
    const half = Math.floor(size / 2);
    const totalPage = model.totalPage;
    const createPagination = () => {
      if (totalPage <= size + 1) {
        return Array.from({ length: totalPage }, (_, index) => index + 1);
      } else {
        let start = Math.max(2, page - half);
        let end = Math.min(totalPage - 1, page + half);

        if (page <= half + 1) {
          start = 2;
          end = size;
        } else if (page >= totalPage - half) {
          start = totalPage - size + 1;
          end = totalPage - 1;
        }

        const range = Array.from(
          { length: end - start + 1 },
          (_, index) => start + index
        );

        return [
          1,
          ...(start > 2 ? ["..."] : []),
          ...range,
          ...(end < totalPage - 1 ? ["..."] : []),
          totalPage,
        ];
      }
    };

    setState((prev) => ({
      ...prev,
      paginations: createPagination(),
    }));
  }, [model.page, model.totalRecord]);

  return (
    <ul className="inline-flex gap-1">
      <li>
        <a
          href="#"
          className={`rounded-full flex items-center justify-center w-7 h-7 ${
            model.page === 1
              ? "cursor-default text-slate-300"
              : "hover:bg-lime-500"
          } transition-all duration-300 bg-lime-500/0`}
          onClick={(e) => {
            e.preventDefault();
            if (model.page === 1) return;
            model.setPage(model.page - 1);
          }}
        >
          <em className="fas fa-chevron-left text-sm"></em>
        </a>
      </li>
      {state.paginations.map((item, index) => (
        <li key={index}>
          {item === "..." ? (
            <a
              href="#"
              className={`rounded-full flex cursor-default items-center justify-center w-7 h-7 `}
            >
              ...
            </a>
          ) : (
            <a
              href="#"
              className={`rounded-full flex items-center justify-center w-7 h-7 hover:bg-lime-500 transition-all duration-300 bg-lime-500/0 ${
                item === model.page ? "!bg-lime-500/100" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                model.setPage(item);
              }}
            >
              {item}
            </a>
          )}
        </li>
      ))}
      <li>
        <a
          href="#"
          className={`rounded-full flex items-center justify-center w-7 h-7 ${
            model.page === model.totalPage
              ? "cursor-default text-slate-300"
              : "hover:bg-lime-500"
          } transition-all duration-300 bg-lime-500/0 `}
          onClick={(e) => {
            e.preventDefault();
            if (model.page === model.totalPage) return;
            model.setPage(model.page + 1);
          }}
        >
          <em className="fas fa-chevron-right text-sm"></em>
        </a>
      </li>
    </ul>
  );
};

export { Pagination };

