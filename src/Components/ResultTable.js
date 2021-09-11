import "./ResultTable.css";

/** ResultTable: render and display table of data
 *    Props: 
 *      - report: {
 *          header: {
 *            timestamp,
 *            reportId,
 *            liveUpdating,
 *            update_interval,
 *            report,
 *            mkt_type,
 *            UOM
 *          },
 *          reports: {
 *            Caiso_totals: {
 *              Export: [{interval, interval_start_gmt, value}, ...],
 *              Import: [{interval, interval_start_gmt, value}, ...],
 *              ...
 *            },
 *            ...
 *          },
 *          request: {
 *            queryname,
 *            tac_zone_name,
 *            schedule,
 *            market_run_id,
 *            startdatetime,
 *            enddatetime,
 *          },
 *        }
 * 
 *    Result -> ResultTable
 */
function ResultTable({ report }) {
  const data = report.reports;
  const resourceNames = Object.keys(report.reports);
  const dataItems = Object.keys(data[resourceNames[0]])
  console.debug(`render table for report: ${report.header.reportId}`);

  // returns [[item, value, value, ...], [item, value, value, ...], ...]
  function parseResource(resource) {
    let resourceData = [];
    for (let item in data[resource]) {
      let row = [];
      row.push(resource);
      row.push(item);
      data[resource][item].map(cell => row.push(cell.value));
      resourceData.push(row);
    }
    return resourceData;
  }

  let tableData = [];

  for (let resource in data) {
    tableData.push(parseResource(resource));
  }

  return(
    <div className="ResultTable overflow-auto mx-3">
      <table className="table table-bordered table-striped table-hover small">
        <thead className="ResultTable-thead w-auto">
          <tr className="ResultTable-tr">
            <th>TAC Name</th>
            <th>Schedule</th>
            {data[resourceNames[0]][dataItems[0]].map(dataItem => (
              <th key={dataItem.interval}>{dataItem.interval_start_gmt.slice(11, 19)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map(resource => 
            resource.map((item, i) => 
              {return (
                <tr key={i} className="ResultTable-tr">
                  {item.map((cell, j) => 
                    <td key={j}>{cell}</td>
                  )}
                </tr>
            )})
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ResultTable;