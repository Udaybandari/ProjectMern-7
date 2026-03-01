import React, { useContext, useEffect,useState } from "react";
import useUserAuth from "../../hooks/useUserAuth";
import { userContext } from "../../context/useContext";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import {moment} from moment;
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
    }
  }
  catch(error){
    console.error("Error fetching users:",error);
  }
}
useEffect(()=>{
  getDashboardData();
  return ()=>{};
},[])
  return (
    <DashboardLayout activeMenu="Dashboard">
     {JSON.stringify(dashboardData)}
    </DashboardLayout>
  )
};

export default Dashboard;
