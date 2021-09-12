import { useState } from "react";
import "./ResultDropdown.css";

function ResultDropdown({ report }) {

  const [dropdown, setDropdown] = useState(false);
  function toggleDrowndown() {
    setDropdown(oldDropdown => !oldDropdown);
  }


  return (
    <div className="ResultDropdown col">
      <button onClick={toggleDrowndown} className="btn custom-dropdown">
      </button>
      <ul className={`dropdown-menu ${dropdown ? "show": ""}`}>
        <li className="dropdown-item">Download XML</li>
        <li className="dropdown-item">Download CSV</li>
      </ul>
    </div>
  )
}

export default ResultDropdown;