/** ResultTimestamp: displays timestamp at bottom of result card
 *    Props: 
 *      - report = {
 *          header: {timestamp: Date object, ...},
 *          reports: {...},
 *          request: {...},
 *        }
 * 
 *    Result -> ResultTimestamp
 */

function ResultTimestamp({ report }) {
  const timestamp = report.header.timestamp.toLocaleString();

  return (
    <small className="m-3">
      {
        report.header["liveUpdating"]
        ? <><i className="bi bi-broadcast text-success"></i> Last Updated: {timestamp}</>
        : <>Report Generated: {timestamp}</>
      }
    </small>
  )
}

export default ResultTimestamp;