import React, { useContext, useState } from "react";
import Logo from "../../src/assets/images/Logo.png";
import Google from "../assets/images/Google.png";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authDataContext } from "../context/authContext";
import { UserDataContext } from "../context/userContext";
import { auth, provider } from "../../utils/Firebase";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { serverUrl } = useContext(authDataContext);
  const { getCurrentUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${serverUrl}/api/auth/login`,
        { email, password },
        { withCredentials: true } // important for cookie
      );

      console.log(res.data);
      // save token in localStorage if needed
      localStorage.setItem("token", res.data.token);

      getCurrentUser(); // update context
      navigate("/"); 
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
    }
  };

  const googleLogin = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const user = response.user;
      const email = user.email;
      const password = user.uid; // unique ID from Firebase

      const res = await axios.post(
        `${serverUrl}/api/auth/googleLogin`,
        { email, password },
        { withCredentials: true }
      );

      console.log(res.data);
      localStorage.setItem("token", res.data.token);
      getCurrentUser();
      navigate("/");
    } catch (error) {
      console.error("Google Login Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-start bg-gradient-to-l from-[#141414] to-[#0c2025] text-white">
      <div className="w-full h-[80px] flex items-center px-6 cursor-pointer" onClick={() => navigate("/")}>
        <img src={Logo} alt="Logo" className="w-[40px]" />
        <h1 className="text-2xl font-semibold ml-2">OneCart</h1>
      </div>

      <form className="max-w-md w-full p-6 bg-[#00000025] rounded-lg mt-10 flex flex-col gap-4" onSubmit={handleLogin}>
        <button type="button" onClick={googleLogin} className="flex items-center justify-center gap-2 w-full py-2 bg-blue-600 rounded-lg">
          <img src={Google} alt="Google" className="w-5 h-5" /> Login with Google
        </button>

        <div className="text-center text-gray-300">OR</div>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-transparent border border-gray-500 text-white"
          required
        />
        <div className="relative w-full">
          <input
            type={show ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-transparent border border-gray-500 text-white"
            required
          />
          {show ? (
            <LuEye className="absolute right-2 top-2 cursor-pointer" onClick={() => setShow(!show)} />
          ) : (
            <LuEyeClosed className="absolute right-2 top-2 cursor-pointer" onClick={() => setShow(!show)} />
          )}
        </div>

        <button type="submit" className="w-full py-2 bg-green-600 rounded-lg text-white font-semibold">
          Login
        </button>

        <p className="text-center text-gray-300">
          Don't have an account?{" "}
          <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/signup")}>
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
