import React, { useContext, useEffect,useState } from "react";
import { userContext } from "../../context/useContext";
import {useNavigate} from "react-router-dom";
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from "../../utils/data";
const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(userContext);
  const navigate = useNavigate();

  const sideMenuData =
    user?.role === "admin"
      ? SIDE_MENU_DATA
      : SIDE_MENU_USER_DATA;

  const handleClick = (route) => {
    if (route === "logout") {
      localStorage.clear();
      clearUser();
      navigate("/login");
      return;
    }
    navigate(route);
  };

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50">
      <div className="flex flex-col items-center justify-center mb-7 pt-5">
        <img
          src={user?.profileImageUrl || ""}
          alt="Profile"
          className="w-20 h-20 bg-slate-400 rounded-full"
        />

        {user?.role === "admin" && (
          <div className="text-[10px] font-medium text-white bg-primary px-3 py-0.5 rounded mt-1">
            Admin
          </div>
        )}

        <h5 className="text-gray-950 font-medium mt-3">
          {user?.name}
        </h5>
        <p className="text-[12px] text-gray-500">
          {user?.email}
        </p>
      </div>

      {sideMenuData.map((item) => (
        <button
          key={item.label}
         className={`w-full flex items-center gap-4 px-6 py-3 text-[15px] font-semibold
transition-all duration-200
hover:bg-blue-50 hover:text-primary
${
  activeMenu === item.label
    ? "text-primary bg-blue-100 border-r-4 border-primary"
    : "text-gray-700"
}`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-xl" />
          {item.label}
        </button>
      ))}
    </div>
  );
};
export default SideMenu;
