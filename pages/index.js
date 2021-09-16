import Head from "next/head";
import { useMemo, useState } from "react";
import styles from "../styles/Home.module.css";
import { getSheetList } from "./api/sheet";
import Hero from "../components/Hero";
import Table from "../components/Table";
import Modal from "../components/Modal";

export const getStaticProps = async () => {
  const data = await getSheetList();

  return {
    props: {
      sheets: data.slice(1, data.length),
    },
    revalidate: 1,
  };
};

export default function Home({ sheets }) {
  const [showModal, setShowModal] = useState(false);
  const data = useMemo(() => [...sheets], []);
  const columns = useMemo(
    () => [
      {
        Header: "Date & Time",
        accessor: "timestamp",
        disableSortBy: true,
      },
      {
        Header: "Room No.",
        accessor: "roomNumber",
        sortType: "alphanumeric",
      },
      {
        Header: "Name",
        accessor: "fullName",
        disableSortBy: true,
      },
      {
        Header: "Health Issue",
        accessor: "health",
        disableSortBy: true,
      },
    ],
    []
  );

  const handleClick = (cell) => {
    if (cell.column.Header === "Name") {
      setShowModal(true);
      console.log("hello");
    }
  };

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
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/ibis.png" />
      </Head>

      <main className={styles.main}>
        <Hero sheets={sheets} />
        <Table
          data={data}
          columns={columns}
          getCellProps={(cell) => ({
            onClick: () => handleClick(cell),
            style: {
              cursor: cell.column.Header === "Name" ? "pointer" : "auto",
            },
          })}
          getRowProp={(row) => ({
            style: {
              color: row.values.health === "Yes" ? "#fa113d" : "#0f292f",
            },
          })}
        />
      </main>
      <Modal onClose={() => setShowModal(false)} show={showModal}>
        Hello!
      </Modal>
    </div>
  );
}
