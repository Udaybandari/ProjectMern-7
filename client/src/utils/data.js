import{ 
    LuLayoutDashboard,
    LuUsers,
    LuLogOut,
} from "react-icons/lu"
import { FaClipboardCheck } from "react-icons/fa";
import { FaSquarePlus } from "react-icons/fa6";

export const SIDE_MENU_DATA=[
    {
        id:"01",
        label: "Dashboard",
        icon:LuLayoutDashboard,
        path:"/admin/dashboard"
    },
    {
        id:"02",
        label: "Manage Tasks",
        icon:FaClipboardCheck,
        path:"/admin/tasks"
    },
    {
        id:"03",
        label: "Create Task",
        icon:FaSquarePlus,
        path:"/admin/create-task"
    },
    {
        id:"04",
        label: "Team Members",
        icon:LuUsers,
        path:"/admin/users"
    },
    {
        id:"05",
        label: "Logout",
        icon:LuLogOut,
        path:"logout"
    }
]
export const SIDE_MENU_USER_DATA=[
    {
        id:"01",
        label: "Dashboard",
        icon:LuLayoutDashboard,
        path:"/user/dashboard"
    },
    {
        id:"02",
        label: "My Tasks",
        icon:FaClipboardCheck,
        path:"/user/tasks"
    },
   
    {
        id:"03",
        label: "Logout",
        icon:LuLogOut,
        path:"logout"
    }
]
export const PRIORIY_DATA=[
    {label:"Low",value:"Low"},
    {label:"Medium",value:"Medium"},
    {label:"Completed",value:"Completed"},
]
export const STATUS_DATA=[
    {label:"Pending",value:"Pending"},
    {label:"In Progress",value:"In Progress"},
    {label:"Completed",value:"Completed"},
]