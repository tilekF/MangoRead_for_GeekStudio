import React, { useContext, useState } from "react";
import { CustomContext } from "../../utils/context";

const SideBarItem = ({ text, value }) => {
  const { changeGenre } = useContext(CustomContext);
  return (
    <form>
      <label className="sidebarItem">
        <input className="check" onChange={() => changeGenre(value)} type="checkbox" />
        <span></span>
        <p>{text}</p>
      </label>
    </form>
  );
};

export default SideBarItem;
