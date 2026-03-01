import React, { useContext, useState } from "react";
import AuthLayout from '../../components/layouts/AuthLayout'
import ProfilePhotoSelector from "../../components/inputs/ProfilePhotoSelector";
import Input from "../../components/inputs/Input";
import { Link,useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { userContext } from "../../context/useContext";
import uploadImage from "../../utils/uploadImage";
import { API_PATHS } from "../../utils/apiPath";
const Signup = () => {

  const[profilePic,setProfilePic]=useState(null);
  const[fullName,setFullName]=useState("");
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
    const[error,setError]=useState(null);
  const[adminInviteToken,setAdminInviteToken]=useState("");
    const{updateUser}=useContext(userContext)
    const navigate=useNavigate();
 const handleSignUp=async (e)=>{
      
     e.preventDefault();
     let profileImageUrl='';
     if(!fullName)
     {
       setError("Please enter full name");
       return;
     }
     if(!password)
     {
       setError("Please enter the password");
       return;
     }
     setError("");

     try{
      if(profilePic){
        const imgUploadRes=await uploadImage(profilePic);
        profileImageUrl=imgUploadRes.imageUrl||"";
      }
     if (!profileImageUrl) {
  setError("Profile image upload failed. Please try again.");
  return;
}
      const response=await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
        name:fullName, 
        email,
        password,
        adminInviteToken,
        profileImageUrl
      })
      console.log(response.data);
      const {token,role}=response.data;
  
      if(token)
      {
        localStorage.setItem("token",token);
        updateUser(response.data); 
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
       <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">Join us today by entering your details below</p>
        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic}/>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
       value={fullName}
       onChange={({ target }) => setFullName(target.value)}
       label="FullName"
       placeholder="UdayPaul"
       type="text"
       />
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
       <Input
       value={adminInviteToken}
       onChange={({ target }) => setAdminInviteToken(target.value)}
       label="Admin Invite Token"
       placeholder="6 Digit Token"
       type="text"
       />
        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
       <button type="submit" className="btn-primary" onClick={handleSignUp}>SignUp</button>
       <p>Already have an account?
        <Link className="font-medium text-primary underline" to="/login">
        Login
        </Link>
       </p>
          </div>
        </form>
       </div>
    </AuthLayout>
  ) 
};

export default Signup;
