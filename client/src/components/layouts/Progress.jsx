import React from "react";

const Progress = ({ progress = 0, status }) => {
  const getBarColor = () => {
    switch (status) {
      case "In Progress":
        return "bg-cyan-500";
      case "Completed":
        return "bg-emerald-500";
      default:
        return "bg-violet-500";
    }
  };

  return (
    <div className="w-full">
      {/* Progress Background */}
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        {/* Progress Fill */}
        <div
          className={`${getBarColor()} h-2 rounded-full transition-all duration-500 ease-in-out`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Optional Percentage Text */}
      <div className="flex justify-end mt-1">
        <span className="text-[11px] text-gray-500 font-medium">
          {progress}%
        </span>
      </div>
    </div>
  );
};

export default Progress;