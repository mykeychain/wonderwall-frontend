import { useEffect, useState } from "react";
import { typeFields } from "./TypeFields";
import "./OtherFields.css";

function OtherFields({ type, request }) {
    const [formData, setFormData] = useState({});
    const [needsChanges, setNeedsChanges] = useState(false);

    // sets initial state of formData based on type
    useEffect(function getInitialFormValues(){
        let initialData = {queryname: type};

        for (let field of typeFields[type]) {
            initialData[field.name] = field.options[0];
        }

        setFormData(initialData);
    }, [type])

    // sets initial enddatetime when startdatetime is first selected
    useEffect(function setInitialEndDate(){
        if (formData["startdatetime"] && !formData["enddatetime"]) {
            let tomorrow = formData["startdatetime"] 
                ? new Date(formData["startdatetime"]) 
                : null ;
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow = tomorrow.toISOString().slice(0,10);
    
            setFormData(oldData => ({
                ...oldData,
                enddatetime: tomorrow,
            }));
        }
    }, [ formData ])


    // updates formData state on form change
    function handleChange(evt) {
        const { name, value } = evt.target;

        setFormData(oldData => ({
            ...oldData, 
            [name]: value
        }));

        validateDate();
    }

    // calls parent function on form submit
    function handleSubmit(evt) {
        evt.preventDefault();
        if (!validateDate()) {
            setNeedsChanges(true);
            return;
        };

        request(formData);
        setNeedsChanges(false);
    }

    function validateDate() {
        if (!formData["startdatetime"]) return false;
        if (!formData["enddatetime"]) return false;
        if (formData["startdatetime"] > formData["enddatetime"]) {
            return false;
        }  
        
        return true;
    }

    function validateLiveUpdates() {
        const current = new Date();
        const currentDate = current.toISOString().slice(0, 10);

        if (formData["live-updating"]
            && currentDate > formData["enddatetime"]) {
            return false;
        }

        return true;
    }

    return (
        <div className="OtherFields">
            <form
                onSubmit={handleSubmit}
                className={needsChanges ? "validated" : ""}>
                <div className="OtherFields-form-row row">
                    {typeFields[type].map(field => (
                        <div className="OtherFields-field col" key={field.name}>
                            <label
                                htmlFor={field.name}
                                className="form-label" >
                                {field.label}
                            </label>
                            <select
                                id={field.name}
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                className={`form-select form-select-sm ${formData[field.name] ? "valid" : "invalid"}`}>
                                    {field.options.map((option, i) => (
                                        <option value={option} key={i}>{option}</option>
                                    ))}
                            </select>
                        </div>
                    ))}
                </div>
                <div className="OtherFields-date-button-row row mt-2">
                    <div className="OtherFields-startdatetime col position-relative">
                        <label
                            htmlFor="startdatetime"
                            className="form-label">
                            Start Date
                        </label>
                        <input
                            id="startdatetime"
                            name="startdatetime"
                            type="date"
                            value={formData["startdatetime"] || ""}
                            placeholder="start date"
                            onChange={handleChange}
                            className={`form-control form-control-sm ${validateDate() ? "valid" : "invalid"}`}>
                        </input>
                        <div className="invalid-tooltip">
                            Must be before end date
                        </div>
                    </div>
                    <div className="OtherFields-enddatetime col position-relative">
                        <label
                            htmlFor="enddatetime"
                            className="form-label">
                            End Date
                        </label>
                        <input
                            id="enddatetime"
                            name="enddatetime"
                            type="date"
                            value={formData["enddatetime"] || ""}
                            placeholder="end date"
                            onChange={handleChange}
                            className={`form-control form-control-sm ${validateDate() ? "valid" : "invalid"}`}>
                        </input>
                        <div className="invalid-tooltip">
                            Must be after start date
                        </div>
                    </div>
                    <div className="OtherFields-apply col d-grid mt-auto mt-xs-3">
                        <button
                            className="btn btn-primary btn-sm btn-fullWidth">
                            Apply
                        </button>
                    </div>
                </div>
                <div className="OtherFields-form-row row">
                    <div className="col ms-3 mt-3 form-check form-switch">
                        <input
                            id="live-updating"
                            name="live-updating"
                            type="checkbox"
                            className={`form-check-input ${validateLiveUpdates() ? "valid" : "invalid"}`} />
                        <label
                            htmlFor="live-updating"
                            className="form-check-label" >
                            Live Updates
                        </label>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default OtherFields;