import React from 'react';
import {useLocation} from "react-router-dom";

const Header = () => {
  const location = useLocation()
  return (
      <div className={"w-full flex items-end gap-sm px-md py-sm text-darkGrey"}>
        <img src={"/icons/logo.svg"} alt={"app-logo"} className={"w-[120px]"}/>
        <h1>/</h1>
      </div>
  );
};

export default Header;