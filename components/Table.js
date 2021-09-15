import React from "react";
import styles from "../styles/table.module.css";
import {
  useExpanded,
  useFilters,
  usePagination,
  useSortBy,
  useGroupBy,
  useTable,
} from "react-table";
import {
  FaChevronCircleDown,
  FaChevronCircleRight,
  FaChevronCircleUp,
  FaList,
  FaTimesCircle,
} from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { useMemo } from "react";

const dateFilter = ({
  column: { filterValue, preFilteredRows, setFilter },
}) => {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ""}
      onChange={(e) => setFilter(e.target.value || undefined)}
      placeholder={`Search ${count} records...`}
    />
  );
};

const Table = ({ data, columns }) => {
  const defaultColumn = useMemo(
    () => ({
      Filter: dateFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    getRowProps,
    page,
    pageOptions,
    state: { pageIndex, pageSize, groupBy, expanded },
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
  } = useTable(
    { columns, data, defaultColumn, initialState: { pageSize: 20 } },
    useFilters,
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination
  );
  return (
    <div className={styles.tableContainer}>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr key={index} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => (
                <th
                  key={index}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.canGroupBy ? (
                    <span {...column.getGroupByToggleProps()}>
                      {column.isGrouped ? (
                        <>
                          <FaTimesCircle /> {"  "}
                        </>
                      ) : (
                        <>
                          <FaList /> {"  "}
                        </>
                      )}
                    </span>
                  ) : null}
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <>
                          {" "}
                          <FaChevronCircleDown />{" "}
                        </>
                      ) : (
                        <>
                          {" "}
                          <FaChevronCircleUp />{" "}
                        </>
                      )
                    ) : (
                      ""
                    )}
                  </span>
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr key={i} {...row.getRowProps()}>
                {row.cells.map((cell, i) => {
                  return (
                    <td key={i} {...cell.getCellProps()}>
                      {cell.isGrouped ? (
                        <>
                          <span {...row.getToggleRowExpandedProps()}>
                            {row.isExpanded ? (
                              <FaChevronCircleDown />
                            ) : (
                              <FaChevronCircleRight />
                            )}
                          </span>{" "}
                          {cell.render("Cell")} ({row.subRows.length})
                        </>
                      ) : (
                        cell.render("Cell")
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={styles.pageDiv}>
        <div className={styles.pageBtn}>
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            Previous Page
          </button>
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            Next Page
          </button>
        </div>
        <div className={styles.pageIndicator}>
          Page{" "}
          <em>
            {pageIndex + 1} of {pageOptions.length}
          </em>
        </div>
      </div>
    </div>
  );
};

export default Table;
