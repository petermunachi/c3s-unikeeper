
import { useState } from "react";
import styled from "styled-components";
import { MockData } from "../../mockData";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartComponent = () => {

  const [data, setData] = useState({
    labels: MockData.map((mockData) => mockData.year),
    datasets: [
      {
        label: "Number of hours",
        data: MockData.map((mockData) => mockData.userGain),
        backgroundColor: ["#33e6ff"],
      }
    ]
  })
  return (
    <ChartWrapper>
      <div style={{ height: "20rem" }}>
        <Bar 
          data={data} 
          options={{ maintainAspectRatio: false }}
        />
      </div>
      <div className="download-btn-container">
        <button type="button">Export as PDF</button>
      </div>
    </ChartWrapper>
  )
};

const ChartWrapper = styled.div`
  
`;

export default ChartComponent;
