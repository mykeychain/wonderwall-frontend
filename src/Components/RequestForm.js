import { useState } from "react";
import TypeSelect from "./TypeSelect";
import OtherFields from "./OtherFields";

function RequestForm({ request }) {
    const[ type, setType ] = useState("");
    
    return (
        <div className="RequestForm">
            <TypeSelect setType={setType}/>
            {type ? <OtherFields type={type} request={request} /> : ""}
        </div>
    )
}

export default RequestForm;