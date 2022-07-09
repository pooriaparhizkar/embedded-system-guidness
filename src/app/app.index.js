import { useEffect } from "react";
import { get, responseValidator } from "../api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import "./app.style.scss";
import { useState } from "react";

function MainApp() {
  const [data,setData]=useState([]);
  useEffect(() => {
    get("/getData").then((res) => {
      if (responseValidator(res.status)) {
        const temp=[];
        res.data.map((item,index)=>{
            if(index<10)
            temp.push({HeartBeat:item.txt.split('-')[2],time:item.txt.split('-')[1]})
        })
        console.log(temp)
        setData(temp);
      }
    });
  }, []);
  return (
    <div className="embedded-main-app">
      <h1>Embedded App</h1>
      <LineChart width={1000} height={400} data={data}>
        <Line  activeDot={{ r: 8 }} type="monotone" dataKey="HeartBeat" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis  dataKey="time" />
        <YAxis domain={[10, 160]} />
        <Tooltip />
        <CartesianGrid strokeDasharray="3 3" />
      </LineChart>
    </div>
  );
}

export default MainApp;
