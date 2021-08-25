import Result from "./Result";

function ResultsList({ reports }) {
    return (
        <div className="ResultsList">
            {reports.map((report, i) => <Result report={report} key={i} />)}
        </div>
    )
}

export default ResultsList;