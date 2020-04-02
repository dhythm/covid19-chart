import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "./Chart.css";

interface Case {
  date: string;
  confirmed: number;
  deaths: number;
  recovered: number;
}

const Chart = () => {
  const [cases, setCases] = useState<{
    [key: string]: Case[];
  } | null>(null);
  useEffect(() => {
    fetch("https://pomber.github.io/covid19/timeseries.json")
      .then(response => response.json())
      .then(data => setCases(data));
  }, []);

  if (!cases) {
    return <></>;
  }
  console.log({ ...cases });

  const shownCases = [
    getAttr(
      cases.Japan.map(v => v.confirmed / cases.Japan.slice(-1)[0].confirmed),
      "Japan",
      "rgba(75,192,192,1)"
    ),
    getAttr(
      cases.China.map(v => v.confirmed / cases.China.slice(-1)[0].confirmed),
      "China",
      "rgba(192,75,192,1)"
    ),
    getAttr(
      cases.US.map(v => v.confirmed / cases.US.slice(-1)[0].confirmed),
      "US",
      "rgba(192,192,75,1)"
    ),
    getAttr(
      cases.Italy.map(v => v.confirmed / cases.Italy.slice(-1)[0].confirmed),
      "Italy",
      "rgba(75,192,75,1)"
    ),
    getAttr(
      cases["Korea, South"].map(
        v => v.confirmed / cases["Korea, South"].slice(-1)[0].confirmed
      ),
      "South Korea",
      "rgba(75,75,192,1)"
    ),
    getAttr(
      cases["United Kingdom"].map(
        v => v.confirmed / cases["United Kingdom"].slice(-1)[0].confirmed
      ),
      "US",
      "rgba(192,75,75,1)"
    ),
    getAttr(
      cases["Taiwan*"].map(
        v => v.confirmed / cases["Taiwan*"].slice(-1)[0].confirmed
      ),
      "Taiwan",
      "rgba(75,75,75,1)"
    )
  ];
  const labels = cases.Japan.map(c => c.date);
  // const norm = japanCases.slice(-1)[0].confirmed;
  // const labels = japanCases.map(c => c.date);
  // const confirmedCases = {
  //   label: "confirmed",
  //   backgroundColor: "rgba(75,192,192,0.4)",
  //   borderColor: "rgba(75,192,192,1)",
  //   pointBorderColor: "rgba(75,192,192,1)",
  //   pointHoverBackgroundColor: "rgba(75,192,192,1)",
  //   data: japanCases.map(c => c.confirmed / norm)
  // };
  // const deathCases = {
  //   label: "deaths",
  //   backgroundColor: "rgba(192,75,192,0.4)",
  //   borderColor: "rgba(192,75,192,1)",
  //   pointBorderColor: "rgba(192, 75,192,1)",
  //   pointHoverBackgroundColor: "rgba(192, 75,192,1)",
  //   data: japanCases.map(c => c.deaths / norm)
  // };
  // const recoveredCases = {
  //   label: "recovered",
  //   backgroundColor: "rgba(192,192,75,0.4)",
  //   borderColor: "rgba(192,192,75,1)",
  //   pointBorderColor: "rgba(192,192,75,1)",
  //   pointHoverBackgroundColor: "rgba(192,192,75,1)",
  //   data: japanCases.map(c => c.recovered / norm)
  // };

  const data = {
    labels,
    // datasets: [confirmedCases, deathCases, recoveredCases].map((v, i) => ({
    datasets: shownCases.map(v => ({
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

const getAttr = (data: any, label: string, palette: string) => ({
  label,
  backgroundColor: palette,
  borderColor: palette,
  pointBorderColor: palette,
  pointHoverBackgroundColor: palette,
  data
});

export default Chart;
