import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import {Link, useNavigate} from "react-router-dom";
import Input from "../../components/inputs/Input";
import { validateEmail } from "../../utils/helper";
import { API_PATHS } from "../../utils/apiPath";
import axiosInstance from "../../utils/axiosInstance"
import { userContext } from "../../context/useContext";
const Login = () => {
  const[email,setEmail]=useState("");
  const[name,setName]=useState("");
  const[error,setError]=useState(null);
  const[password,setPassword]=useState("");
  const{updateUser}=useContext(userContext)
  const navigate=useNavigate();
  const handleLogin=async (e)=>{
    e.preventDefault();
    if(!validateEmail(email))
    {
      setError("Please enter a valid email address");
      return;
    }
    if(!password)
    {
      setError("Please enter the password");
      return;
    }
    setError("");
    //Login API CALL
    try{
      const response=await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
        email,
        password,
      })
      console.log(response.data);
      const {token,role}=response.data;
      updateUser(response.data);
      if(token)
      {
        localStorage.setItem("token",token);
        if(role==="admin")
        {
          navigate("/admin/dashboard");
        }
        else{
          navigate("/user/dashboard");
        }
      }
    }
    catch(error){
      if(error.response&&error.response.data.message){
        setError(error.response.data.message);
      }
      else{
          console.log("Full Error:", error);
  console.log("Response:", error.response);
  console.log("Data:", error.response?.data);

        setError("Something went wrong.Please try again.");
      }
    }
  
  }

  return (
    <AuthLayout>
     <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center gap-1">
       <div>
        <h3 className="text-3xl font-bold text-black">Welcome Back</h3>
       <p className="text-sm text-slate-700  ">Please enter your details to log in</p>
       </div>
       <Input
       value={email}
       onChange={({target})=>setEmail(target.value)}
       label="Email Address"
       placeholder="john@example.com"
       type="text"
       />
        <Input
       value={password}
       onChange={({ target }) => setPassword(target.value)}
       label="Password"
       placeholder="Min 8 Characters"
       type="password"
       />
       {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
       <button type="submit" className="btn-primary" onClick={handleLogin}>LOGIN</button>
       <p>Dont't have an account?
        <Link className="font-medium text-primary underline" to="/signup">
        SignUp
        </Link>
       </p>
      
     </div>
  </AuthLayout>
  )
};

export default Login;
