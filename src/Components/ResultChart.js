import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { DASH_ARRAY, STROKE_COLORS, LINE_WIDTH } from "./ChartOptions";

function ResultChart({ report }) {
    const [options, setOptions] = useState({});
    const [series, setSeries] = useState([]);
    const [lastTimestamp, setLastTimestamp] = useState("");

    console.debug("chart render");
    useEffect(function setInitialData(){
        if (report.header.timestamp.toLocaleString() === lastTimestamp) return null;
        console.log("CHART TIMESTAMP DOES NOT MATCH CURRENT, UPDATING CHART", report.header.reportId);

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