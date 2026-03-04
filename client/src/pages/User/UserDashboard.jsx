import React, { useContext, useEffect,useState } from "react";
import useUserAuth from "../../hooks/useUserAuth";
import { userContext } from "../../context/useContext";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import { LuArrowRight } from "react-icons/lu";
import { addThousandSeparator } from "../../utils/helper";
import moment from "moment";
import InfoCard from "../../components/Cards/InfoCard";
import TaskListTable from "../../components/layouts/TaskListTable";
import CustomPieChart from "../../components/Charts/CustomPieChart";
import CustomBarChart from "../../components/Charts/CustomBarChart";
const COLORS=["#8D51FF","#00B8DB","#7BCE00"]
const UserDashboard = () => {
  useUserAuth();
  const{user}=useContext(userContext);
  const navigate=useNavigate();
  const[dashboardData,setDashboardData]=useState(null);
  const[pieChartData,setPieChartData]=useState([])
const[barChartData,setBarChartData]=useState([])

const getDashboardData=async()=>{
  try{
    const response=await axiosInstance.get(
      API_PATHS.TASKS.GET_USER_DASHBOARD_DATA
    );
    console.log(response)
    if(response.data){
      setDashboardData(response.data);
      prepareChartData(response.data||null);
    }
  }
  catch(error){
    console.error("Error fetching users:",error);
  }
}
const prepareChartData=(data)=>{
  const taskDistribution=data?.charts?.taskDistribution||null;
  const taskPriorityLevels=data?.charts?.taskPriorityLevels||null;
  const taskDistributionData=[
    {status:"Pending",count:taskDistribution?.Pending||0,fill:"#8D51FF"},
    {status:"In Progress",count:taskDistribution?.InProgress||0,fill:"#00B8DB"},
    {status:"Completed",count:taskDistribution?.Completed||0,fill:"#7BCE00"},
  ]

  setPieChartData(taskDistributionData);
  const PriorityLevelData=[
    {priority:"Low",count:taskPriorityLevels?.Low||0},
    {priority:"Medium",count:taskPriorityLevels?.Medium||0},
    {priority:"High",count:taskPriorityLevels?.High||0},
    
  ]
  setBarChartData(PriorityLevelData);
  console.log("Task Distribution:", taskDistribution);
}

useEffect(()=>{
  getDashboardData();
 
  return ()=>{};
},[])
 return (
  <DashboardLayout activeMenu="Dashboard">
    <div className="px-4 md:px-8 py-6 space-y-6">

      {/* Greeting Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
            Good Morning, <span className="text-primary">{user?.name}</span>
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {moment().format("dddd, Do MMMM YYYY")}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <InfoCard
          label="Total Tasks"
          value={addThousandSeparator(
            dashboardData?.charts?.taskDistribution?.All || 0
          )}
          color="bg-indigo-600"
        />
        <InfoCard
          label="Pending"
          value={addThousandSeparator(
            dashboardData?.charts?.taskDistribution?.Pending || 0
          )}
          color="bg-violet-500"
        />
        <InfoCard
          label="In Progress"
          value={addThousandSeparator(
            dashboardData?.charts?.taskDistribution?.InProgress || 0
          )}
          color="bg-cyan-500"
        />
        <InfoCard
          label="Completed"
          value={addThousandSeparator(
            dashboardData?.charts?.taskDistribution?.Completed || 0
          )}
          color="bg-lime-500"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h5 className="text-lg font-semibold text-gray-700 mb-4">
            Task Distribution
          </h5>
          <CustomPieChart data={pieChartData} />
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h5 className="text-lg font-semibold text-gray-700 mb-4">
            Task Priority Levels
          </h5>
          <CustomBarChart data={barChartData} />
        </div>

        {/* Recent Tasks */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-lg font-semibold text-gray-700">
              Recent Tasks
            </h5>

            <button
              onClick={() => navigate("/tasks")}
              className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              See All <LuArrowRight />
            </button>
          </div>

          <TaskListTable
            tableData={dashboardData?.recentTasks || []}
          />
        </div>

      </div>
    </div>
  </DashboardLayout>
);
};

export default UserDashboard;
