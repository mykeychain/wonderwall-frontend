import { useEffect, useState } from "react";
import { typeFields } from "./TypeFields";

function OtherFields({ type, request }) {
    const [formData, setFormData] = useState({});

    // sets initial state of formData based on type
    useEffect(function getInitialFormValues(){
        let initialData = {queryname: type};

        for (let field of typeFields[type]) {
            initialData[field.name] = field.options[0];
        }

        setFormData(initialData);
    }, [type])


    // updates formData state on form change
    function handleChange(evt) {
        const { name, value } = evt.target;

        setFormData(oldData => ({
            ...oldData, 
            [name]: value
        }));
    }

    // calls parent function on form submit
    function handleSubmit(evt) {
        evt.preventDefault();
        request(formData);
    }

    return (
        <div className="OtherFields card p-3 col-md-11 mx-auto mt-2">
            <form
                onSubmit={handleSubmit}>
                <div className="OtherFields-form-row row">
                    <div className="col ms-3 mb-3 form-check form-switch">
                        <input
                            id="live-updating"
                            name="live-updating"
                            type="checkbox"
                            className="form-check-input" />
                        <label
                            htmlFor="live-updating"
                            className="form-check-label">
                            Live Updates
                        </label>
                    </div>
                </div>
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
                                className="form-select form-select-sm">
                                    {field.options.map((option, i) => (
                                        <option value={option} key={i}>{option}</option>
                                    ))}
                            </select>
                        </div>
                    ))}
                </div>
                <div className="OtherFields-form-row row mt-2">
                    <div className="OtherFields-startdatetime col">
                        <label
                            htmlFor="startdatetime"
                            className="form-label">
                            Start Date
                        </label>
                        <input
                            id="startdatetime"
                            name="startdatetime"
                            type="date"
                            value={formData["startdatetime"]}
                            placeholder="start date"
                            onChange={handleChange}
                            className="form-control form-control-sm">
                        </input>
                    </div>
                    <div className="OtherFields-enddatetime col">
                        <label
                            htmlFor="enddatetime"
                            className="form-label">
                            End Date
                        </label>
                        <input
                            id="enddatetime"
                            name="enddatetime"
                            type="date"
                            value={formData["enddatetime"]}
                            placeholder="end date"
                            onChange={handleChange}
                            className="form-control form-control-sm">
                        </input>
                    </div>
                    <div className="OtherFields-apply col d-grid mt-auto">
                        <button
                            className="btn btn-primary btn-sm btn-fullWidth">
                            Apply
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default OtherFields;