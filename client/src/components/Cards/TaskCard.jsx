import React from "react";
import AvatorGroup from "../layouts/AvatarGroup";
import Progress from "../layouts/Progress";
import { LuPaperclip } from "react-icons/lu";
import moment from "moment";

const TaskCard = ({
  title,
  description,
  priority,
  status,
  progress,
  createdAt,
  dueDate,
  assignedTo,
  attachmentCount,
  completedTodoCount,
  todoChecklist = [],
  onClick,
}) => {
  const getStatusTagColor = () => {
    switch (status) {
      case "In Progress":
        return "text-cyan-600 bg-cyan-50 border border-cyan-100";
      case "Completed":
        return "text-emerald-600 bg-emerald-50 border border-emerald-100";
      default:
        return "text-violet-600 bg-violet-50 border border-violet-100";
    }
  };

  const getPriorityTagColor = () => {
    switch (priority) {
      case "Low":
        return "text-emerald-600 bg-emerald-50 border border-emerald-100";
      case "Medium":
        return "text-amber-600 bg-amber-50 border border-amber-100";
      default:
        return "text-rose-600 bg-rose-50 border border-rose-100";
    }
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    >
      {/* Tags */}
      <div className="flex items-center gap-3">
        <span
          className={`text-[11px] font-semibold px-3 py-1 rounded-full ${getStatusTagColor()}`}
        >
          {status}
        </span>

        <span
          className={`text-[11px] font-semibold px-3 py-1 rounded-full ${getPriorityTagColor()}`}
        >
          {priority} Priority
        </span>
      </div>

      {/* Content */}
      <div className="mt-4">
        <h3 className="text-base font-semibold text-gray-800 line-clamp-2">
          {title}
        </h3>

        <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* Checklist Progress */}
        <div className="mt-3">
          <p className="text-xs font-medium text-gray-600 mb-1">
            Task Done:
            <span className="ml-1 font-semibold text-gray-800">
              {completedTodoCount}/{todoChecklist.length}
            </span>
          </p>

          <Progress progress={progress} status={status} />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between">
        {/* Dates */}
        <div>
          <p className="text-[11px] text-gray-400">Start Date</p>
          <p className="text-sm font-medium text-gray-800">
            {moment(createdAt).format("Do MMM YYYY")}
          </p>

          {dueDate && (
            <>
              <p className="text-[11px] text-gray-400 mt-1">Due Date</p>
              <p className="text-sm font-medium text-gray-800">
                {moment(dueDate).format("Do MMM YYYY")}
              </p>
            </>
          )}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <AvatorGroup avatars={assignedTo || []} />

          {attachmentCount > 0 && (
            <div className="flex items-center gap-1.5 bg-blue-50 text-primary px-3 py-1 rounded-full">
              <LuPaperclip className="text-sm" />
              <span className="text-xs font-medium">
                {attachmentCount}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;