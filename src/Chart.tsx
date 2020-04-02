import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "./Chart.css";

const Chart = () => {
  const [cases, setCases] = useState(null);
  useEffect(() => {
    fetch("https://pomber.github.io/covid19/timeseries.json")
      .then(response => response.json())
      .then(data => setCases(data));
  }, []);

  if (!cases) {
    return <></>;
  }
  const japanCases = (cases as any)?.Japan;
  const labels = japanCases.map(c => c.date);
  const confirmedCases = {
    label: "confirmed",
    backgroundColor: "rgba(75,192,192,0.4)",
    borderColor: "rgba(75,192,192,1)",
    pointBorderColor: "rgba(75,192,192,1)",
    pointHoverBackgroundColor: "rgba(75,192,192,1)",
    data: japanCases.map(c => c.confirmed)
  };
  const deathCases = {
    label: "deaths",
    backgroundColor: "rgba(192,75,192,0.4)",
    borderColor: "rgba(192,75,192,1)",
    pointBorderColor: "rgba(192, 75,192,1)",
    pointHoverBackgroundColor: "rgba(192, 75,192,1)",
    data: japanCases.map(c => c.deaths)
  };
  const recoveredCases = {
    label: "recovered",
    backgroundColor: "rgba(192,192,75,0.4)",
    borderColor: "rgba(192,192,75,1)",
    pointBorderColor: "rgba(192,192,75,1)",
    pointHoverBackgroundColor: "rgba(192,192,75,1)",
    data: japanCases.map(c => c.recovered)
  };

  const data = {
    labels,
    datasets: [confirmedCases, deathCases, recoveredCases].map((v, i) => ({
      fill: false,
      lineTension: 0.1,
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      ...v
    }))
  };
  return (
    <div className="Container">
      <Line data={data} width={600} height={450} />
    </div>
  );
};

export default Chart;
