import Result from "./Result";

function ResultsList({ reports, triggerUpdate }) {
    return (
        <div className="ResultsList">
            {reports.map((report, i) => <Result report={report} triggerUpdate={triggerUpdate} key={i} />)}
        </div>
    )
}

export default ResultsList;