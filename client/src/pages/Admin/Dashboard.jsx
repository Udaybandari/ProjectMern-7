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
const Dashboard = () => {
  useUserAuth();
  const{user}=useContext(userContext);
  const navigate=useNavigate();
  const[dashboardData,setDashboardData]=useState(null);
  const[pieChartData,setPieChartData]=useState([])
const[barChartData,setBarChartData]=useState([])

const getDashboardData=async()=>{
  try{
    const response=await axiosInstance.get(
      API_PATHS.TASKS.GET_DASHBOARD_DATA
    );
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
}
console.log(dashboardData)
useEffect(()=>{
  getDashboardData();
 
  return ()=>{};
},[])
  return (
    <DashboardLayout activeMenu="Dashboard">
    <div className="card my-5">
      <div>
        <div className="col-span-3">
          <h2 className="text-xl md:text-2xl">Good Morning!{user?.name}</h2>
          <p className="text-xs md:text-[13px] text-gray-400 mt-1.5">{moment().format("dddd Do MMM YYYY")}</p>
        </div>
      </div>
       <div className="grid grid-cols-2  sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-5">
        <InfoCard
        // icon={<IoMdCard/>}
        label="Total Tasks"
        value={addThousandSeparator(
          dashboardData?.charts?.taskDistribution?.All||0
        )}
        color="bg-primary"
        />
         <InfoCard
        // icon={<IoMdCard/>}
        label="Pending Tasks"
        value={addThousandSeparator(
          dashboardData?.charts?.taskDistribution?.Pending||0
        )}
        color="bg-violet-500"
        />
           <InfoCard
        // icon={<IoMdCard/>}
        label="In Progress Tasks"
        value={addThousandSeparator(
          dashboardData?.charts?.taskDistribution?.InProgress||0
        )}
        color="bg-cyan-500"
        />
         
           <InfoCard
        // icon={<IoMdCard/>}
        label="Completed Tasks"
        value={addThousandSeparator(
          dashboardData?.charts?.taskDistribution?.Completed||0
        )}
        color="bg-lime-500"
        />
    </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4 md:my-6">
        <div>
          <div className="card">
            <div className="flex items-center justify-between">
          <h5>TaskDistribution</h5>
            </div>
             <CustomPieChart
            data={pieChartData}
            />
          </div>
        </div>
        <div>
          <div className="card">
            <div className="flex items-center justify-between">
          <h5>Task Priority Levels</h5>
            </div>
            
             <CustomBarChart
            data={barChartData}
            />
          </div>
        </div>
        
        <div className="md:col-span-2">
          <div className="card">
            <div className="flex items-center justify-between">
              <h5 className="text-lg">Recent Tasks</h5>
               <button>See All <LuArrowRight /></button>   
            </div>
            <TaskListTable tableData={dashboardData?.recentTasks||[]}/>
            
          </div>
        </div>
      </div>
    </div>
   
    </DashboardLayout>
  )
};

export default Dashboard;
