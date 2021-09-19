import React from "react";
import TodayCard from "./TodayCard";
import styles from "../styles/todayReport.module.css";
import Chart from "react-google-charts";

const TodayReport = ({ today, todayGuest, todayYes, todayNo }) => {
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
          <TodayCard title="Today Total Health Issue">
            <Chart
              style={{ margin: "auto", width: "100%", height: "100%" }}
              chartType="PieChart"
              loader={<div>Loading Chart </div>}
              data={[
                ["Health", "count"],
                ["Yes", todayYes.length],
                ["No", todayNo.length],
              ]}
            />
          </TodayCard>
        </div>
      </div>
    </section>
  );
};

export default TodayReport;
