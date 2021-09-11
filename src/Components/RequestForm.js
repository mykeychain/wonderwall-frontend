import { useState } from "react";
import TypeSelect from "./TypeSelect";
import OtherFields from "./OtherFields";

/** RequestForm: form for user to choose their query
 *    Props: 
 *      - request: parent function
 * 
 *    States: 
 *      - type: type of request as str (e.g. "ENE_SLRS")
 *          from TypeSelect component
 * 
 *    CaisoRequests -> RequestForm -> { TypeSelect, OtherFields }
 */
function RequestForm({ request }) {
  const[ type, setType ] = useState("");
  
  return (
    <div className="RequestForm card col-md-11 mx-auto mt-2 mb-4">
      <div className="card-header">
        <TypeSelect type={type} setType={setType}/>
      </div>
      <div className="p-3">
        {type ? <OtherFields type={type} request={request} /> : ""}
      </div>
    </div>
  )
}

export default RequestForm;