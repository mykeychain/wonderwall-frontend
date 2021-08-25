import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

function ResultChart({ report }) {
    const [options, setOptions] = useState({});
    const [series, setSeries] = useState([]);
    const reports = report.reports;
    const resourceNames = Object.keys(report.reports);
    const dataItems = Object.keys(reports[resourceNames[0]])

    useEffect(function setInitialData(){
        // set options on mount
        const categories = reports[resourceNames[0]][dataItems[0]].map(dataItem => dataItem["interval_start_gmt"]);
        let xaxis = {
            categories,
        };
        setOptions({
            chart: {
                id: report.header.report,
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
    }, [ ])



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