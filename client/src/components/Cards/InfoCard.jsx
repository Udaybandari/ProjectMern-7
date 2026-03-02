import React from "react";

const InfoCard = ({ icon, label, value, color = "bg-blue-500" }) => {
  return (
    <div className="flex items-center gap-4 p-3 md:p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
      
      {/* Colored Indicator */}
      <div className={`w-2 h-8 rounded-full ${color}`} />

      {/* Optional Icon */}
      {icon && (
        <div className="text-gray-600 text-lg md:text-xl">
          {icon}
        </div>
      )}

      {/* Text Section (No extra div) */}
      <p className="flex flex-col">
        <span className="text-lg md:text-xl font-semibold text-gray-800">
          {value}
        </span>
        <span className="text-xs md:text-sm text-gray-500">
          {label}
        </span>
      </p>

    </div>
  );
};

export default InfoCard;