import { v4 as uuid } from "uuid";
import { useEffect, useState } from "react";
import ScraperApi from "../api";
import RequestForm from "./RequestForm";
import ResultsList from "./ResultsList";

/** TODO: Docstring */
function CaisoRequests() {
    const [reports, setReports] = useState([])

    useEffect(function liveUpdate() {
        const updateInterval = setInterval(() => {
            for (let i = 0; i < reports.length; i++) {
                if (reports[i].header["isLiveUpdating"]) {
                    
                }
            }
        }, (5 * 60 * 1000))
    }, [])

    async function request({isLiveUpdating, ...formData}) {
        let formattedData = {...formData};
        formattedData = formatDate(formattedData);
        const newReport = await ScraperApi.getData(formattedData);
        newReport.header["timestamp"] = new Date();
        newReport.header["reportId"] = uuid();
        newReport.header["isLiveUpdating"] = isLiveUpdating;
        newReport["request"] = formattedData;
        setReports(oldReports => [
            ...oldReports, newReport
        ]);
    }

    function formatDate(data) {
        data.startdatetime = data.startdatetime.split("-").join("");
        data.startdatetime += "T07:00-0000"
        data.enddatetime = data.enddatetime.split("-").join("");
        data.enddatetime += "T07:00-0000"
        return data;
    }

    async function update(request, reportId) {
        const index = reports.findIndex(report => report.header.reportId === reportId);
        const newReport = await ScraperApi.getData(request);
        newReport.header["timestamp"] = new Date();
        newReport.header["reportId"] = reportId;
        setReports(oldReports => {
            const reportsCopy = [...oldReports];
            reportsCopy[index] = {
                ...oldReports[index],
                header: newReport.header,
                reports: newReport.reports,
            };
            return reportsCopy;
        });
    }

    function triggerUpdate(reportId) {
        const index = reports.findIndex(report => report.header.reportId === reportId);
        setReports(oldReports => {
            const reportsCopy = [...oldReports];
            reportsCopy[index] = {
                ...oldReports[index],
                header: {
                    isUpdating: true,
                }
            };
        });
    }

    return (
        <div className="CaisoRequests">
            <RequestForm request={request}/>
            <ResultsList reports={reports} triggerUpdate={triggerUpdate}/>
        </div>
    )
}

export default CaisoRequests;