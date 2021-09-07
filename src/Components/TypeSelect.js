import { useEffect } from "react";
/** TypeSelect: manages report type selection.
 *      props:
 *          - setType: parent function
 *      
 *      state:
 *          - selectValue: "value"
 * 
 *      RequestForm -> TypeSelect
 */
function TypeSelect({ type, setType }) {
    const choices = [
        {value: "ENE_SLRS", text:"System Load and Resource Schedules"},
        {value: "PRC_LMP", text: "Locational Marginal Prices"},
        {value: "ENE_TRANS_LOSS", text: "Transmission Loss"},
    ]

    useEffect(function setInitialType(){
        setType(choices[0].value);
    }, [ ])

    function handleClick(evt) {
        evt.preventDefault();
        setType(evt.target.value);
    }

    return (
        <ul className="TypeSelect nav nav-tabs card-header-tabs">
            {choices.map(choice => (
            <li
                className="TypeSelect-li nav-item"
                key={choice.value}>
                <button
                    onClick={handleClick}
                    key={choice.value}
                    value={choice.value}
                    className={choice.value === type ? "nav-link active" : "nav-link"}
                    aria-current="true"
                    >
                    {choice.text}
                </button>
            </li>
            ))}
        </ul>
    )
}

export default TypeSelect;