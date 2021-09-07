import { useState } from "react";
import TypeSelect from "./TypeSelect";
import OtherFields from "./OtherFields";

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