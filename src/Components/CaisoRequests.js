import { useState } from "react";
import ScraperApi from "../api";
import RequestForm from "./RequestForm";
import ResultsList from "./ResultsList";

/** TODO: Docstring */
function CaisoRequests() {
    const [reports, setReports] = useState([])

    async function request(formData) {
        let formattedData = {...formData};
        formattedData = formatDate(formattedData);
        const newReport = await ScraperApi.getData(formattedData);
        newReport.header["timestamp"] = new Date();
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

    return (
        <div className="CaisoRequests">
            <RequestForm request={request}/>
            <ResultsList reports={reports}/>
        </div>
    )
}

export default CaisoRequests;