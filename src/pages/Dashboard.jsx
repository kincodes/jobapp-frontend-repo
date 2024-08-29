import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

const Dashboard = () => {
  const [errMsg, setErrMsg] = React.useState("");
  useEffect(() => {
    setErrMsg("");
  }, []);

  const [jobs, setJobs] = React.useState([]);

  const filterCountApplied = (jobs) => {
    return jobs.filter(
      (row) => row.status.toLowerCase() === "Applied".toLowerCase()
    ).length;
  };

  const filterCountInterview = (jobs) => {
    return jobs.filter(
      (row) => row.status.toLowerCase() === "Interview".toLowerCase()
    ).length;
  };

  const filterCountSuccess = (jobs) => {
    return jobs.filter(
      (row) => row.status.toLowerCase() === "Successful".toLowerCase()
    ).length;
  };

  const filterCountNoResponse = (jobs) => {
    return jobs.filter(
      (row) => row.status.toLowerCase() === "No Response".toLowerCase()
    ).length;
  };

  const filterCountRejected = (jobs) => {
    return jobs.filter(
      (row) => row.status.toLowerCase() === "Rejected".toLowerCase()
    ).length;
  };

  const applied = filterCountApplied(jobs);
  const interview = filterCountInterview(jobs);
  const successful = filterCountSuccess(jobs);
  const noResponse = filterCountNoResponse(jobs);
  const rejected = filterCountRejected(jobs);

  const [chartDataStatus, setChartDataStatus] = useState({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        backgroundColor: [],
        borderRadius: 0,
      },
    ],
  });

  useEffect(() => {
    const getJobs = async () => {
      try {
        const repsonse = await axios
          .get("/job/getAll", {})
          .then(function (response) {
            setJobs(response.data);
          });
      } catch (err) {
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 400) {
          setErrMsg("Missing fields");
        } else if (err.response?.status === 401) {
          setErrMsg("Unathorized");
        } else {
          setErrMsg("loading data failed");
        }
      }
    };
    getJobs();
  }, []);

  useEffect(() => {
    const getJobs = async () => {
      try {
        const labels = [
          "Applied",
          "Interview",
          "Successful",
          "NoResponse",
          "Rejected",
        ];
        const data = [applied, interview, successful, noResponse, rejected];
        const backgroundColor = [
          "rgba(43, 63, 229, 0.8)",
          "rgba(250, 192, 19, 0.8)",
          "rgba(55, 215, 82, 0.8)",
          "rgba(253, 135, 135, 0.8)",
          "rgba(183, 22, 59, 0.8)",
        ];
        const borderRadius = 5;

        setChartDataStatus({
          labels,
          datasets: [
            {
              label: "Count",
              data,
              backgroundColor,
              borderRadius,
            },
          ],
        });
      } catch (err) {
        setErrMsg("loading chart data failed");
      }
    };
    getJobs();
  }, [applied, interview, successful, noResponse, rejected]);

  return (
    <div className="app-dash">
      <div className="dataCard barStatusCard">
        <Bar
          data={chartDataStatus}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Job Status",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Dashboard;
