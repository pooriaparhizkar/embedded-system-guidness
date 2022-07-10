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

function MainApp() {
  const [data, setData] = useState([]);
  useEffect(() => {
    get("/getData").then((res) => {
      if (responseValidator(res.status)) {
        const temp = [];
        res.data.map((item) => {
          // if (index < 10)
            temp.push({
              HeartBeat: item.txt.split("-")[2],
              time: item.txt.split("-")[1],
            });
            return true;
        });
        console.log(temp);
        setData(temp);
      }
    });
  }, []);
  return (
    <div className="embedded-main-app">
      <ResponsiveContainer width={'100%'} height={'95%'}>
        <LineChart data={data}>
          <Line
            activeDot={{ r: 8 }}
            type="natural"
            dataKey="HeartBeat"
            stroke="#c40d00"
            strokeWidth={5}
            dot={{ stroke: 'black', strokeWidth: 2 }}
          />
          <CartesianGrid stroke="#ccc" />
          <XAxis tickMargin={10}   dataKey="time" />
          <YAxis domain={[10, 160]} />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MainApp;
