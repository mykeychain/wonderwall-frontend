import { Line } from "react-chartjs-2";

const COLORS = [
    'rgb(255, 99, 132)',
    'rgb(255, 159, 64)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(54, 162, 235)',
    'rgb(153, 102, 255)',
    'rgb(201, 203, 207)'
]

function ResultChart({ report }) {
    const reports = report.reports;

    let datasets = [];
    for (let resource in reports) {
        for (let dataItem in reports[resource]) {
            let dataset = {};
            dataset["label"] = `${resource} ${dataItem}`;
            dataset["data"] = reports[resource][dataItem];
            datasets.push(dataset);
        }
    }

    const data = {datasets}

    const options = {
        parsing: {
            xAxisKey: 'interval',
            yAxisKey: 'value',
        }
    }


    return (
        <div className="ResultChart">
            <Line data={data} options={options}/>
        </div>
    )
}

export default ResultChart;