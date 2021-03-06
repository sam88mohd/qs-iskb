import Head from "next/head";
import { useMemo, useState } from "react";
import styles from "../styles/Home.module.css";
import { getSheetList } from "./api/sheet";
import Hero from "../components/Hero";
import Table from "../components/Table";
import Modal from "../components/Modal";
import Footer from "../components/Footer";
import TodayReport from "../components/TodayReport";

export const getServerSideProps = async (context) => {
  const data = await getSheetList();

  return {
    props: {
      sheets: data.slice(1, data.length),
    },
  };
};

export default function Home({ sheets }) {
  const [showModal, setShowModal] = useState(false);
  const [today, setToday] = useState(new Date());
  const [rowData, setRowData] = useState({});
  const sheetsDesc = sheets
    .map((sheet, index) => ({ ...sheet, id: index }))
    .sort((a, b) => b.id - a.id);
  const data = useMemo(() => [...sheetsDesc], []);
  const columns = useMemo(
    () => [
      {
        Header: "Date & Time",
        accessor: "timestamp",
        disableSortBy: true,
        paginateExpandedRows: true,
      },
      {
        Header: "Room No.",
        accessor: "roomNumber",
        sortType: "alphanumeric",
        paginateExpandedRows: true,
      },
      {
        Header: "Name",
        accessor: "fullName",
        disableSortBy: true,
        paginateExpandedRows: true,
      },
      {
        Header: "Health Issue",
        accessor: "health",
        disableSortBy: true,
        paginateExpandedRows: true,
      },
      {
        Header: "Action",
        Cell: function modelBtn({ row }) {
          if (!row.isGrouped) {
            return (
              <button onClick={(e) => handleButtonClick(e, row)}>
                More Details...
              </button>
            );
          } else {
            return null;
          }
        },
      },
    ],
    []
  );

  const handleButtonClick = (e, row) => {
    setShowModal(true);
    setRowData(row);
  };

  const todayFormat =
    ("0" + today.getDate()).slice(-2) +
    "/" +
    ("0" + (today.getMonth() + 1)).slice(-2) +
    "/" +
    today.getFullYear();

  const todayGuest = sheets.filter(
    (sheet) => sheet.timestamp.slice(0, 10) === todayFormat
  );

  const todayYes = todayGuest.filter((sheet) => sheet.health === "Yes");
  const todayNo = todayGuest.filter((sheet) => sheet.health === "No");

  const guestDetails = sheets.filter(
    (sheet) =>
      sheet.roomNumber === rowData?.values?.roomNumber &&
      sheet.fullName
        .toLowerCase()
        .includes(rowData?.values?.fullName.toLowerCase().slice(0, 3))
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
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/ibis.png" />
      </Head>

      <main className={styles.main}>
        <Hero sheets={sheets} />
        <div className={styles.mainContainer}>
          <TodayReport
            today={todayFormat}
            todayGuest={todayGuest}
            todayYes={todayYes}
            todayNo={todayNo}
            columns={columns}
            handleButtonClick={handleButtonClick}
          />
          <h3>Guest List</h3>
          <Table
            data={data}
            columns={columns}
            getRowProp={(row) => ({
              style: {
                color: row.values.health === "Yes" ? "#cd2026" : "#404040",
              },
            })}
          />
        </div>
      </main>
      <Footer />
      <Modal
        onClose={() => setShowModal(false)}
        show={showModal}
        title="Guest Summary"
        guestDetails={guestDetails}
      />
    </div>
  );
}
