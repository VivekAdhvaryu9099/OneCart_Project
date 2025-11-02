import React, { useContext, useState } from "react";
import Logo from "../assets/images/Logo.png";
import { FaSearch } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { BiCartAlt } from "react-icons/bi";
import { UserDataContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authDataContext } from "../context/authContext";
import { shopDataContext } from "../context/ShopContext";

const Nav = () => {
  let {getCurrentUser, userData } = useContext(UserDataContext);
  let {showSearch, setShowSearch,search,setSearch,getCartCount} = useContext(shopDataContext);

  let [showProfile, setShowProfile] = useState(false);

  let navigate = useNavigate()

  let {serverUrl} = useContext(authDataContext)

  console.log(userData);

  const handleLogout = async()=>{
    try {
        const result = await axios.get(serverUrl+'/api/auth/logout',{withCredentials:true})
        console.log(result.data);
        getCurrentUser()
        
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <div
      className="w-[100vw] h-[70px] bg-[#ecfafaec] z-10 fixed top-0 flex items-center justify-between px-[30px]
    shadow-md shadow-black "
    >
      <div className="w-[30%] flex items-center justify-start gap-[10px]">
        <img src={Logo} alt="LOGO" className="w-[30px]" />
        <h1 className="text-[25px] text-[black] font-semibold">One Cart</h1>
      </div>

      <div className="w-[40%]">
        <ul className="flex items-center justify-center gap-[19px] text-[white]">
          <li className="text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl"
          onClick={()=>navigate('/')}>
            HOME
          </li>
          <li className="text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl"
          onClick={()=>navigate('/collection')}>
            COLLECTION
          </li>
          <li className="text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl"
          onClick={()=>navigate('/about')}>
            ABOUT
          </li>
          <li className="text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl"
          onClick={()=>navigate('/contact')}>
            CONTACT
          </li>
        </ul>
      </div>

      <div className="w-[30%] flex items-center justify-end gap-[20px] ">
        <FaSearch
          className="w-[30px] h-[38px] text=[#000000] cursor-pointer"
          onClick={() => {setShowSearch((prev) => !prev);navigate('/collection')}}
        />

        {!userData && (
          <ImProfile className="w-[30px] h-[38px] text=[#000000] cursor-pointer" onClick={()=>setShowProfile(prev=>!prev)}  />
        )}

        {userData && (
          <div className="w-[30px] h-[30px] bg-[#080808] text-white rounded-full flex items-center justify-center"
          onClick={()=>setShowProfile(prev=>!prev)}>
            {userData?.name.slice(0, 1)}
          </div>
        )}

        <BiCartAlt className="w-[30px] h-[38px] text=[#000000] cursor-pointer " onClick={()=>navigate('/cart')} />

        <p
          className="absolute w-[20px] h-[18px] items-center justify-center
              bg-orange-600 px-[5px] py-[3px] text-white rounded-full text-[10px] top-[15px] right-[20px]"
        >
          {getCartCount()}
        </p>
      </div>

      {showSearch && (
        <div
          className="w-[100%] h-[80px] bg-[#d8f6f9dd] absolute top-[100%] left-0 right-0 flex
          items-center justify-center"
        >
          <input
            type="text"
            className="w-[50%] h-[60%] bg-[#233533] rounded-[30px] px-[50px]
                placeholder:text-white text-white text-[18px]"
            placeholder="Search Here"
            onChange={(e)=>{setSearch(e.target.value)}}
            value={search}
          />
        </div>
      )}

      {showProfile && <div className="absolute w-[220px] h-[150px] bg-[#000000d7] top-[110%] right-[4%]
       border-[1px] border-[#aaa9a9]
        rounded-[10px] z-10 cursor-pointer">

            <ul className="w-[100%] h-[100%] flex items-start justify-around
            flex-col text-[17px] py-[10px] text-white">
            
           { !userData &&   <li className="w-[100%] hoever:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer" onClick={()=>{
            navigate('/login')
             setShowProfile(false)
          }
           }>Login</li>}


            { userData &&  <li className="w-[100%] hoever:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer"
            onClick={()=>{handleLogout(); setShowProfile(false)}}>Logout</li>}



              <li className="w-[100%] hoever:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer" onClick={()=>navigate('/order')}>Orders</li>
              <li className="w-[100%] hoever:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer"
              onClick={()=>{setShowProfile(false),navigate('/about')}}>About</li>
            </ul>

        </div>}
   
    </div>
  );
};

export default Nav;
