import React, { useMemo } from "react";
import TodayCard from "./TodayCard";
import styles from "../styles/todayReport.module.css";
import Chart from "react-google-charts";
import Table from "./Table";

const TodayReport = ({
  today,
  todayGuest,
  todayYes,
  todayNo,
  handleButtonClick,
}) => {
  const columns = useMemo(
    () => [
      {
        Header: "Date & Time",
        accessor: "timestamp",
        disableFilters: true,
        disableSortBy: true,
        paginateExpandedRows: true,
        disableGroupBy: true,
      },
      {
        Header: "Room No.",
        accessor: "roomNumber",
        sortType: "alphanumeric",
        paginateExpandedRows: true,
        disableFilters: true,
        disableGroupBy: true,
      },
      {
        Header: "Name",
        accessor: "fullName",
        disableSortBy: true,
        paginateExpandedRows: true,
        disableFilters: true,
        disableGroupBy: true,
      },
      {
        Header: "Health Issue",
        accessor: "health",
        disableSortBy: true,
        paginateExpandedRows: true,
        disableFilters: true,
        disableGroupBy: true,
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

  return (
    <section className={styles.container}>
      <h3>Today&apos;s Report</h3>
      <div className={styles.reportCardContainer}>
        <div className={styles.todayCard}>
          <TodayCard title="Today">
            <p>{today}</p>
          </TodayCard>
          <TodayCard title="Today Total Respond">
            <p>{todayGuest.length}</p>
          </TodayCard>
        </div>
        <div className={styles.chartContainer}>
          <Chart
            width="100%"
            height="400px"
            chartType="PieChart"
            loader={<div>Loading Chart </div>}
            options={{
              title: "Today Total Health Issue",
              chartArea: {
                width: "100%",
                height: "80%",
                left: 10,
              },
              slices: [
                {
                  color: "#d91e48",
                },
                {
                  color: "#2BB673",
                },

                {
                  color: "#e9a227",
                },
                {
                  color: "#007fad",
                },
              ],
            }}
            data={[
              ["Health", "count"],
              ["Yes", todayYes.length],
              ["No", todayNo.length],
            ]}
          />
        </div>
      </div>
      <div className={styles.yesHealthContainer}>
        <h3>Today&apos;s Guest With Health Issue</h3>
        <Table
          data={todayYes}
          columns={columns}
          getRowProp={(row) => ({
            style: {
              color: "#cd2026",
            },
          })}
        />
      </div>
    </section>
  );
};

export default TodayReport;
