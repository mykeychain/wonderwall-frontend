import Result from "./Result";

function ResultsList({ reports, update }) {
    return (
        <div className="ResultsList">
            {reports.map((report, i) => <Result report={report} update={update} key={i} />)}
        </div>
    )
}

export default ResultsList;