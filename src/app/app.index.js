import { useEffect } from "react";
import { get, responseValidator } from "../api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "./app.style.scss";
import { useState } from "react";
import Header from "../header/header";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-next-table/dist/SmartTable.css";
import SmartTable from "react-next-table";
import { HalfMalf } from "react-spinner-animated";
import "react-spinner-animated/dist/index.css";
function MainApp() {
  const [data, setData] = useState([]);
  const headCells = [
    {
      id: "time",
      numeric: false,
      label: "Time",
      width: 100,
    },
    {
      id: "heartRate",
      numeric: false,
      label: "Heart Rate (bpm)",
      width: 200,
    },
    {
      id: "isNormal",
      numeric: false,
      label: "isNormal",
      width: 50,
    },
  ];

  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    get("/getData").then((res) => {
      setLoading(false);
      if (responseValidator(res.status)) {
        const temp = [];
        const temp2 = [];
        res.data.map((item) => {
          // if (index < 10)
          temp.push({
            HeartRate: item.txt.split("-")[2],
            time: item.txt.split("-")[1],
          });
          temp2.push({
            time: item.txt.split("-")[1],
            heartRate: parseInt(item.txt.split("-")[2]),
            isNormal:
              parseInt(item.txt.split("-")[2]) <= 90 &&
              parseInt(item.txt.split("-")[2]) >= 60
                ? "Yes"
                : "No",
          });
          return true;
        });

        console.log(temp);
        setData(temp);
        setTableData(temp2);
      }
    });
  }, []);
  return !loading ? (
    <div className="embedded-main-app">
      <Header />
      <div className="chart-container">
        <ResponsiveContainer width={"100%"} height={"95%"}>
          <LineChart data={data}>
            <Line
              activeDot={{ r: 8 }}
              type="natural"
              dataKey="HeartRate"
              stroke="#c40d00"
              strokeWidth={5}
              dot={{ stroke: "black", strokeWidth: 2 }}
            />
            <CartesianGrid stroke="#ccc" />
            <XAxis tickMargin={10} dataKey="time" />
            <YAxis domain={[10, 160]} />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="table-container">
        <SmartTable title="HeartRate" data={tableData} headCells={headCells} />
      </div>
    </div>
  ) : (
    <div className="loading-container">
      <HalfMalf 
    center={true} width={"150px"} height={"150px"} />
    </div>
  );
}

export default MainApp;
