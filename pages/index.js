import Head from "next/head";
import Image from "next/image";
import { useMemo } from "react";
import { useFilters, usePagination, useTable } from "react-table";
import styles from "../styles/Home.module.css";
import { getSheetList } from "./api/sheet";

export const getStaticProps = async () => {
  const data = await getSheetList();

  return {
    props: {
      sheets: data.slice(1, data.length),
    },
    revalidate: 1,
  };
};

export const dateFilter = ({
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

export default function Home({ sheets }) {
  const data = useMemo(() => [...sheets], []);
  const columns = useMemo(
    () => [
      {
        Header: "Date & Time",
        accessor: "timestamp",
      },
      {
        Header: "Room No.",
        accessor: "roomNumber",
      },
      {
        Header: "Name",
        accessor: "fullName",
      },
      {
        Header: "Health Issue",
        accessor: "health",
      },
    ],
    []
  );

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
    state: { pageIndex, pageSize },
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
  } = useTable(
    { columns, data, defaultColumn, initialState: { pageSize: 20 } },
    useFilters,
    usePagination
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>QS ISKB Daily Response</title>
        <meta
          name="description"
          content="QS Ibis Styles Kota Bharu daily Response website"
        />
        <meta charSet="utf-8" />
        <meta name="author" content="IT ibis styles kota bharu" />
        <meta lang="en"/>
        <link rel="icon" href="/ibis.png" />
      </Head>

      <main className={styles.main}>
        <div className={styles.hero}>
          <Image
            src="/banner.jpg"
            className={styles.bannerImg}
            layout="fill"
            alt="banner"
          />
          <h1 className={styles.title}>
            QS Daily Response - Ibis Styles Kota Bharu
          </h1>
          <div className={styles.heroGrid}>
            <div className={styles.totalCard}>
              <div className={styles.cardContent}>
                <h3>Total</h3>
                <p>{sheets.length}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.tableContainer}>
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup, index) => (
                <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, index) => (
                    <th key={index} {...column.getHeaderProps()}>
                      {column.render("Header")}
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
                  <tr key={i} {...row.getRowProps()}>
                    {row.cells.map((cell, i) => (
                      <td key={i} {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <div className={styles.pageDiv}>
                <div className={styles.pageBtn}>
                  <button
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                  >
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
            </tfoot>
          </table>
        </div>
      </main>

      <style jsx>{`
        table {
          border-spacing: 0;
          width: 90vw;
        }

        tfoot {
          text-align: center;
          margin: auto;
        }

        th,
        td {
          padding: 0.5rem;
          border-bottom: 1px solid gray;
        }

        td {
          padding-left: 20px;
        }

        td:last-child {
          border-right: 0;
        }

        th {
          background-color: #17252a;
          color: white;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}
