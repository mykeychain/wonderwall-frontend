import { useEffect, useState } from "react";
import ResultChart from "./ResultChart";
import ResultTable from "./ResultTable";
import ResultTimestamp from "./ResultTimestamp";

/** Result: stores data for each individual report, renders chart, table,
 *  timestamp, and manages intervals for live updates
 * 
 *    props: 
 *      - report = {
 *          header: {}
 *          reports: {}
 *          request: {}
 *        }
 *      - update = parent function
 * 
 *    state: 
 *      - isAfterFirstUpdate = boolean
 * 
 *    CaisoRequest -> Result -> { ResultTable, ResultChart, ResultTimestamp }
 */
function Result({ report, update }){
    // const [isLiveUpdating, setIsLiveUpdating] = useState(false);
    const [isAfterFirstUpdate, setIsAfterFirstUpdate] = useState(false);

    useEffect(function setFirstIntervalTimer() {
        const timestamp = report.header.timestamp;
        const firstInterval = ((5 - (timestamp.getMinutes() % 5)) * 60 - timestamp.getSeconds());
        if (report.header["liveUpdating"]) {
            const firstTimeout = setTimeout(() => {
                liveUpdate();
                setIsAfterFirstUpdate(true);
            }, firstInterval * 1000);

            return function cleanUp() {clearTimeout(firstTimeout)};
        }

        return;
    }, [])

    useEffect(function setRecurringTimer() {
        if (isAfterFirstUpdate) {
            const recurringInterval = setInterval(() => {
                console.log("INSIDE INTERVAL");
                liveUpdate();
            }, (5 * 60 * 1000));
    
            return function cleanUp() {clearInterval(recurringInterval)};
        }

        return;
    }, [isAfterFirstUpdate])

    async function liveUpdate() {
        await update(report.request, report.header.reportId);
    }

    return (
        <div className="Result card col-md-11 mx-auto mt-2 mb-4">
            <h3 className="m-4">
                {report.header["REPORT"]} {report.header["MKT_TYPE"]}
            </h3>
            <ResultChart report={report}/>
            <ResultTable report={report} />
            <ResultTimestamp report={report} />
        </div>
    )
}

export default Result;