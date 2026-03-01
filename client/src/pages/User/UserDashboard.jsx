import React, { useContext } from "react";
import useUserAuth from "../../hooks/useUserAuth";
import { userContext } from "../../context/useContext";

const UserDashboard = () => {
  useUserAuth();
  const{user}=useContext(userContext);
  return (
    <div>
      {JSON.stringify(user)}
    </div>
  );
}

export default UserDashboard;
