/** Errors: presentational component to display error messages
 *    Props: 
 *      - errors: ["error message", ...]
 * 
 *    OtherFields -> Errors
 */
function Errors({ errors }) {
  return (
    <div className="Errors alert alert-danger col my-2 mx-2 py-1">
      {errors[0]}
    </div>
  )
}

export default Errors;