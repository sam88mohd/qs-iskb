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
import { useMemo } from "react";

const columnFilter = ({
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

const defaultPropGetter = () => ({});

const Table = ({ data, columns, getRowProp = defaultPropGetter }) => {
  const defaultColumn = useMemo(
    () => ({
      Filter: columnFilter,
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
    {
      columns,
      data,
      defaultColumn,
      initialState: { pageSize: 20 },
    },
    useFilters,
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination
  );
  return (
    <section className={styles.tableContainer}>
      <h3>Guest List</h3>
      <div className={styles.tableOverlay}>
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
                    <div>
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr key={i} {...row.getRowProps(getRowProp(row))}>
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
      </div>
      <div className={styles.pageContainer}>
        <div className={styles.pageBtnContainer}>
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            Previous Page
          </button>
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            Next Page
          </button>
        </div>
        <div className={styles.pageIndicatorContainer}>
          Page{" "}
          <em>
            {pageIndex + 1} of {pageOptions.length}
          </em>
        </div>
      </div>
    </section>
  );
};

export default Table;
