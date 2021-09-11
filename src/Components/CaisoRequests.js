import { v4 as uuid } from "uuid";
import { useState } from "react";
import ScraperApi from "../api";
import RequestForm from "./RequestForm";
import ResultsList from "./ResultsList";

/** TODO: Docstring */
function CaisoRequests() {
    const [reports, setReports] = useState([])

    async function request({liveUpdating, ...formData}) {
        let formattedData = formatDate(formData);
        const newReport = await ScraperApi.getData(formattedData);
        newReport.header["timestamp"] = new Date();
        newReport.header["reportId"] = uuid();
        newReport.header["liveUpdating"] = liveUpdating;
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
        console.log("INDEX OF REPORTID HERE", index);
        const newReport = await ScraperApi.getData(request);
        newReport.header["timestamp"] = new Date();
        newReport.header["reportId"] = reportId;
        newReport.header["liveUpdating"] = true;
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

    return (
        <div className="CaisoRequests">
            <RequestForm request={request}/>
            <ResultsList reports={reports} update={update}/>
        </div>
    )
}

export default CaisoRequests;