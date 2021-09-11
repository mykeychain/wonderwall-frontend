import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { DASH_ARRAY, STROKE_COLORS, LINE_WIDTH } from "./ChartOptions";

/** ResultChart: renders and displays chart of data
 *    Props: 
 *      - report: {
 *          header: {
 *            timestamp,
 *            reportId,
 *            liveUpdating,
 *            update_interval,
 *            report,
 *            mkt_type,
 *            UOM
 *          },
 *          reports: {
 *            Caiso_totals: {
 *              Export: [{interval, interval_start_gmt, value}, ...],
 *              Import: [{interval, interval_start_gmt, value}, ...],
 *              ...
 *            },
 *            ...
 *          },
 *          request: {
 *            queryname,
 *            tac_zone_name,
 *            schedule,
 *            market_run_id,
 *            startdatetime,
 *            enddatetime,
 *          },
 *        }
 * 
 *    States: 
 *      - options: { various chart options }
 *      - series: [resource, data_item, value, value, value, ...]
 *      - lastTimeStamp: "8/01/2021, 5:00:00 PM"
 * 
 *    Result -> ResultChart
 */
function ResultChart({ report }) {
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);
  const [lastTimestamp, setLastTimestamp] = useState("");

  console.debug(`render chart for report: ${report.header.reportId}`);

  // sets chart options, data series, and last timestamp for each re-render
  useEffect(function setInitialData(){
    if (report.header.timestamp.toLocaleString() === lastTimestamp) return null;

    setLastTimestamp(report.header.timestamp.toLocaleString());

    const reports = report.reports;
    const resourceNames = Object.keys(report.reports);
    const dataItems = Object.keys(reports[resourceNames[0]])

    // set options on mount
    const categories = reports[resourceNames[0]][dataItems[0]].map(dataItem => dataItem["interval_start_gmt"]);
    let xaxis = {
      categories,
    };
    setOptions({
      chart: {
        id: report.header.report,
      },
      colors: STROKE_COLORS,
      stroke: {
        dashArray: DASH_ARRAY,
        width: LINE_WIDTH
      },
      xaxis: xaxis,
      yaxis: {
        title: {
          text: "MW",
          style: {
            fontSize: '20px',
          },
        },
      },
      legend: {
        position: "top",
      },
    })

    // set series on mount
    let newSeries = [];
    for (let resource in reports) {
      for (let dataItem in reports[resource]) {
        let dataset = {};
        dataset["name"] = `${resource} ${dataItem}`;
        dataset["data"] = reports[resource][dataItem].map(entry => entry.value);
        newSeries.push(dataset);
      }
    }
    setSeries(newSeries);
  })



  return (
    <div className="ResultChart mx-1">
      <Chart
        type="line"
        options={options}
        series={series} />
    </div>
  )
}

export default ResultChart;