import React from 'react'
import { MdAddCircle } from "react-icons/md";
import { FaThList } from "react-icons/fa";
import { FaFirstOrderAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate()
  return (
    <div className='w-[18%] min-h-[100vh] border-r-[1px] py-[60px] 
    fixed left-0 top-0 '>

        <div className='flex flex-col gap-4 pt-[40px] pl-[20%] text-[15px]'>

            <div className='flex items-center justify-center md:justify-start gap-3 border border-gray-200 
            border-r-0 px-3 py-2 cursor-pointer hover:bg-[#2c7b89]' onClick={()=>navigate('/add')}>

                <MdAddCircle className='w-[20px] h-[20px]' />
                <p>Add Items</p>

            </div>  

        </div>


        <div className='flex flex-col gap-4 pt-[40px] pl-[20%] text-[15px]'>

            <div className='flex items-center justify-center md:justify-start gap-3 border border-gray-200 
            border-r-0 px-3 py-2 cursor-pointer hover:bg-[#2c7b89]' onClick={()=>navigate('/list')}>

                <FaThList className='w-[20px] h-[20px]' />
                <p>List Items</p>

            </div>  

        </div>


        <div className='flex flex-col gap-4 pt-[40px] pl-[20%] text-[15px]'>

            <div className='flex items-center justify-center md:justify-start gap-3 border border-gray-200 
            border-r-0 px-3 py-2 cursor-pointer hover:bg-[#2c7b89]' onClick={()=>navigate('/order')}>

                <FaFirstOrderAlt className='w-[20px] h-[20px]' />
                <p>View Orders</p>

            </div>  

        </div>


    </div>
  )
}

export default Sidebar