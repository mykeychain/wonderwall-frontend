import { useEffect, useState } from "react";
/** TypeSelect: controlled component that manages report type selection.
 *      props:
 *          - setType: parent function
 *      
 *      state:
 *          - selectValue: "value"
 * 
 *      RequestForm -> TypeSelect
 */
function TypeSelect({ setType }) {
    const choices = [
        {value: "ENE_SLRS", text:"System Load and Resource Schedules"},
        {value: "option2", text: "Option 2"},
        {value: "option3", text: "Option 3"},
    ]
    const [selectValue, setSelectValue] = useState(choices[0].value);

    useEffect(function setInitialType(){
        setType(selectValue);
    }, [selectValue, setType])

    function handleChange(evt) {
        evt.preventDefault();
        setSelectValue(evt.target.value);
    }

    return (
        <select
            className="TypeSelect"
            value={selectValue}
            onChange={handleChange}>
            {choices.map((choice, i) => <option
                value={choice.value}
                key={i}>
                    {choice.text}
                </option>)}
        </select>
    )
}

export default TypeSelect;