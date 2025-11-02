import React, { useContext, useState } from "react";
import Logo from "../../src/assets/images/Logo.png";
import { useNavigate } from "react-router-dom";
import Google from "../assets/images/Google.png";
import { LuEye } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu";
import { authDataContext } from "../context/authContext";
import axios from 'axios'
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/Firebase";
import { UserDataContext } from "../context/userContext";

const Registration = () => {
  let navigate = useNavigate();
  let [show, setShow] = useState(false);
  let {serverUrl} = useContext(authDataContext);

  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  let {getUser} = useContext(UserDataContext)

  const handleSignUp = async (e) => {
    try {
        e.preventDefault()
        const result = await axios.post(serverUrl+'/api/auth/reg',{
            name,email,password
        },{withCredentials:true})
        console.log(result);
        
    } catch (error) {
        console.log(error);
        
    }
  };

  const googleSignup = async ()=>{
      try {
        const response = await signInWithPopup(auth,provider)
        console.log(response);

        let user = response.user
        let name = user.displayName
        let email = user.email
         let password = user.uid 

        const res = await axios.post(serverUrl+'/api/auth/googleLogin',{name,email,password},{withCredentials:true})

        console.log(res.data);
        getUser()
        navigate('/')
        
        
      } catch (error) {
        console.log(error);
        
      }
  }

  return (
    <div className="w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] flex flex-col items-center justify-start">
      <div
        className="w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={Logo} alt="LOGO" className="w-[40px]" />
        <h1 className="text-[22px] font-sans">OneCart</h1>
      </div>

      <div className="w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px]">
        <span className="text-[25px] font-semibold">Registration Page</span>
        <span className="text-[16px]">Welcome To One Cart</span>
      </div>

      <div
        className="max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border-[1px] border-[#96969635] backdrop:blur-2xl
            rounded-lg shadow-lg flex items-center justify-center"
      >
        <form className="w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]" onSubmit={handleSignUp}>
          <div
            className="w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center 
                        justify-center gap-[10px] py-[25px] cursor-pointer"
         
            onClick={googleSignup}
         >
            <img src={Google} alt="Google" className="w-[20px]" /> Registration
            With Google
          </div>

          <div className="w-[100%] h-[20px] flex items-center justify-center gap-[10px]">
            <div className="w-[40%] h-[1px] bg-[#96969635]"></div>
            OR
            <div className="w-[40%] h-[1px] bg-[#96969635]"></div>
          </div>

          <div className="w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px] relative">
            <input
              type="text"
              className="w-[100%] h-[50px] border-[2px] border-[#96969635]
                            backdrop:blur-sm rounded-lg shadow-lg bg-transparent 
                            placeholder-[#ffffffc7] px-[20px] font-semibold"
              placeholder="UserName"
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
            />

            <input
              type="email"
              className="w-[100%] h-[50px] border-[2px] border-[#96969635]
                            backdrop:blur-sm rounded-lg shadow-lg bg-transparent 
                            placeholder-[#ffffffc7] px-[20px] font-semibold"
              placeholder="Email"
              required
               onChange={(e) => setEmail(e.target.value)}
               value={email}
            />

            <input
              type={show ? "text" : "password"}
              className="w-[100%] h-[50px] border-[2px] border-[#96969635]
                            backdrop:blur-sm rounded-lg shadow-lg bg-transparent 
                            placeholder-[#ffffffc7] px-[20px] font-semibold"
              placeholder="Password"
              required
               onChange={(e) => setPassword(e.target.value)}
               value={password}
            />

            {show && (
              <LuEye
                className="w-[25px] h-[25px] absolute right-[5%] cursor-pointer"
                onClick={() => setShow((prev) => !prev)}
              />
            )}

            {!show && (
              <LuEyeClosed
                className="w-[25px] h-[25px] absolute right-[5%] cursor-pointer"
                onClick={() => setShow((prev) => !prev)}
              />
            )}

            <button
              className="w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex
                            items-center justify-center mt-[20px] text-[17px] font-semibold cursor-pointer"
            >
              Register
            </button>

            <p className="flex gap-[10px]">
              If You Have An Account!
              <span
                className="text-[#5555f6cf] text-[17px] font-semibold cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Login Here
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
