import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import UserCard from "../../components/Cards/UserCard";
import toast from "react-hot-toast";
const ManageUsers = () => {
  
const [allUsers, setAllUsers] = useState([]);
const getAllUsers = async () => {
try {
const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS); 
if (response.data?.length > 0) {
  setAllUsers (response.data);
}

} catch (error) {
console.error("Error fetching users:", error);
}
};
const handleDownloadReport =async ()=>{
try{
  const response=await axiosInstance.get(API_PATHS.REPORTS.EXPORT_USERS,{
    responseType:"blob",
  });

const url=window.URL.createObjectURL(new Blob([response.data]));
const link=document.createElement("a");
link.href=url;
link.setAttribute("download","user_details.xlsx");
document.body.appendChild(link);
link.click();
link.parentNode.removeChild(link);
window.URL.revokeObjectURL(url);
}
catch(error){
  console.error("Error downloading expese details:",error);
  toast.error("Failed to download expense details.Please try again.");
}
}
useEffect(()=>{
  getAllUsers();
  return ()=>{};
},[]);
return (
  
  <DashboardLayout activeMenu="Team Members">
    <div className="mt-8 mb-12 px-4 md:px-8">
  
  {/* Header Section */}
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
    
    <h2 className="text-2xl font-semibold text-gray-800">
      Team Members
    </h2>

    <button
      onClick={handleDownloadReport}
      className="inline-flex items-center justify-center px-5 py-2.5 
                 bg-blue-600 text-white text-sm font-medium 
                 rounded-lg shadow-md 
                 hover:bg-blue-700 hover:shadow-lg 
                 transition-all duration-200 ease-in-out"
    >
      Download Report
    </button>
  </div>

  {/* Users Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {allUsers?.map((user) => (
      <UserCard key={user._id} userInfo={user} />
    ))}
  </div>

</div>
    </DashboardLayout>
);

};

export default ManageUsers;
