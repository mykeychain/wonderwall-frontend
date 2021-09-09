import { useEffect, useState } from "react";
import ResultChart from "./ResultChart";
import ResultTable from "./ResultTable";

function Result({ report, triggerUpdate }){
    // const [isLiveUpdating, setIsLiveUpdating] = useState(false);
    const [isAfterFirstUpdate, setIsAfterFirstUpdate] = useState(false);

    useEffect(function setFirstIntervalTimer() {
        const timestamp = report.header.timestamp;
        const interval = +report.header["update_interval"];
        const firstInterval = ((interval - (timestamp.getMinutes() % interval)) * 60 - timestamp.getSeconds());
        const firstTimeout = setTimeout(() => {
            triggerUpdate(report.header.reportId);
            setIsAfterFirstUpdate(true);
        }, firstInterval * 1000);

        return function cleanUp() {clearTimeout(firstTimeout)};
    }, [])

    useEffect(function setRecurringTimer() {
        if (isAfterFirstUpdate) {
            const recurringInterval = setInterval(() => {
                triggerUpdate(report.header.reportId);
            }, (+report.header["update_interval"] * 60 * 1000));
    
            return function cleanUp() {clearInterval(recurringInterval)};
        }

        return null;
    }, [isAfterFirstUpdate])

    return (
        <div className="Result card col-md-11 mx-auto mt-2 mb-4">
            <h3 className="m-4">
                {report.header["REPORT"]} {report.header["MKT_TYPE"]}
            </h3>
            <ResultChart report={report}/>
            <ResultTable report={report} />
            <small className="m-3">
                <i className="bi bi-broadcast text-success"></i> Report generated: {report.header.timestamp.toLocaleString()}
            </small>
        </div>
    )
}

export default Result;