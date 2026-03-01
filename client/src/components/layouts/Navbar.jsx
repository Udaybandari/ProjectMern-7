import React, { useState } from "react";
import SideMenu from "./SideMenu";
import {HiOutlineMenu,HiOutlineX} from "react-icons/hi"

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div className="flex gap-5 bg-white border-b border-gray-200/50 py-4 px-7 sticky top-0 z-30">
      <button
        onClick={() => setOpenSideMenu(!openSideMenu)}
        className="block lg:hidden text-black"
      >
        {openSideMenu ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>

      <h2 className="text-xl font-serif font-bold text-black">
       Task Manager
      </h2>

      {openSideMenu && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-40 lg:hidden"
            onClick={() => setOpenSideMenu(false)}
          />

          <div className="fixed top-[64px] left-0 w-64 h-[calc(100vh-64px)] bg-white shadow-lg z-50 lg:hidden">
            <SideMenu activeMenu={activeMenu} />
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
