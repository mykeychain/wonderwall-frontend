import ResultChart from "./ResultChart";
import ResultTable from "./ResultTable";

function Result({ report }){
    return (
        <div className="Result card col-md-11 mx-auto mt-2">
            <h3 className="m-4">
                {report.header["REPORT"]} {report.header["MKT_TYPE"]}
            </h3>
            <ResultChart report={report}/>
            <ResultTable report={report} />
            <small className="m-3">
                Report generated: {report.header.timestamp.toLocaleString()}
            </small>
        </div>
    )
}

export default Result;