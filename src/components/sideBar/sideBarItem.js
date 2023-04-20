import React, { useContext } from "react";
import { CustomContext } from "../../utils/context";
import '../../assets/css/sideBarItem.css'

const SideBarItem = ({ text, value }) => {
  const { changeGenre, setCurrentPage, checkboxes, setCheckboxes } = useContext(CustomContext);
  
  const handleCheckboxChange = (event) => {
    const checked = event.target.checked;
    setCheckboxes({ ...checkboxes, [value]: checked });
    if (checked) {
      changeGenre(value);
    }
  };

  return (
      <label className="sidebarItem" onClick={() => setCurrentPage(1)}>
        <input
          className="check"
          onChange={handleCheckboxChange}
          checked={!!checkboxes[value]}
          type="checkbox"
        />
        <span></span>
        <p>{text}</p>
      </label>
  );
};

export default SideBarItem;
