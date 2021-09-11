import Result from "./Result";

/** ResultsList: displays list of all results
 *    Props: 
 *      - reports: [{report}, {report}, ...]
 *      - update: parent function
 * 
 *    CaisoRequests -> ResultsList -> Result
 */
function ResultsList({ reports, update }) {
  return (
    <div className="ResultsList">
      {reports.map((report, i) => (
        <Result report={report} update={update} key={i} />
      ))}
    </div>
  )
}

export default ResultsList;