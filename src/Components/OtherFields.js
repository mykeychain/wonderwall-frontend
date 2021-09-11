import { useEffect, useState } from "react";
import { typeFields } from "./TypeFields";
import "./OtherFields.css";
import Errors from "./Errors";

function OtherFields({ type, request }) {
  const [formData, setFormData] = useState({});
  const [needsChanges, setNeedsChanges] = useState(false);
  const [errors, setErrors] = useState([])

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


  // updates formData state on form change and validates date and live updates
  function handleChange(evt) {
    const { name, value } = evt.target;

    setFormData(oldData => ({
      ...oldData, 
      [name]: value
    }));
  }

  function handleCheck(evt) {
    const { name, checked } = evt.target;

    setFormData(oldData => ({
      ...oldData,
      [name]: checked
    }));
  }

  // calls parent function on form submit
  async function handleSubmit(evt) {
    evt.preventDefault();
    setErrors([]);

    if (!validateDate() || !validateLiveUpdates()) {
      setNeedsChanges(true);
      return;
    };

    try {
      await request(formData);
      setNeedsChanges(false);
    } catch(err) {
      setErrors([err]);
    }
  }

  // validates dates, returns boolean
  function validateDate() {
    if (!formData["startdatetime"]) return false;
    if (!formData["enddatetime"]) return false;
    if (formData["startdatetime"] > formData["enddatetime"]) {
      return false;
    }  
    
    return true;
  }

  // validates end date if live update is selected, returns boolean
  function validateLiveUpdates() {
    const current = new Date();
    const currentDate = current.toISOString().slice(0, 10);

    if (formData["liveUpdating"]
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
                className={
                  `form-select 
                  form-select-sm 
                  ${formData[field.name] ? "valid" : "invalid"}`
                }>
                  {field.options.map((option, i) => (
                      <option value={option} key={i}>
                          {option}
                      </option>
                  ))}
              </select>
            </div>
          ))}
        </div>
        <div className="OtherFields-date-button-row row mt-2">
          <div className="col position-relative">
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
              className={
                `form-control 
                form-control-sm 
                ${validateDate() ? "valid" : "invalid"}`
              }>
            </input>
            <div className="invalid-tooltip">
              Must be before end date
            </div>
          </div>
          <div className="col position-relative">
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
              className={
                `form-control 
                form-control-sm 
                ${validateDate() ? "valid" : "invalid"}`
              }>
            </input>
            <div className="invalid-tooltip">
              Must be after start date
            </div>
          </div>
          <div className="col d-grid mt-auto mt-xs-3">
            <button
              className="btn btn-primary btn-sm btn-fullWidth">
              Apply
            </button>
          </div>
        </div>
        <div className="OtherFields-live-update-row row">
          <div className="col ms-3 mt-3 form-check form-switch">
            <input
              id="live-updating"
              name="liveUpdating"
              type="checkbox"
              onChange={handleCheck}
              className={
                `form-check-input
                ${validateLiveUpdates() ? "valid" : "invalid"}`
              }/>
            <label
              htmlFor="live-updating"
              className="form-check-label" >
              Live Updates
            </label>
          </div>
        </div>
        <div className={
          `OtherFields-alerts-row row d-none
          ${validateLiveUpdates() ? "" : "invalid"}`
        }>
          <div className="
            my-2 mx-2 py-1 
            col alert alert-danger" 
            role="alert">
            For live updates, end date must be today or later.
          </div>
        </div>
        <div className={
          `OtherFields-error-row row 
          ${errors.length ? 'd-flex' : 'd-none'}`
        }>
          <Errors errors={errors}/>
        </div>
      </form>
    </div>
  )
}

export default OtherFields;