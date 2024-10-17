



import React, { useState } from 'react'
import MyUser from './dashboard/user/MyUser'
import User from './dashboard/user/User'
import State from './dashboard/state/State'
import Result from './result/Result'
import ResultPage from './result/Result'
import { TbBuildingEstate } from "react-icons/tb";
import { VscOutput } from "react-icons/vsc";
import { FaUserCog } from "react-icons/fa";

const Dashboard = () => {

  const [option, setOption] = useState("state")
  const menuItems = [
    { label: "Manage State", value: "state",icon:<TbBuildingEstate />

    },
    { label: "Result", value: "result",icon:<VscOutput />
    },
    { label: "User", value: "user",icon:<FaUserCog />
    },
  ];

  return (
    <div>

    
    <div className='flex'>
      <div className='bg-gradient'>

     
      <div className="w-[300px] h-[100vh] dashBoard-bg flex flex-col justify-between">
      {/* Top Menu */}
      <ul className="p-5 flex flex-col gap-0">
        <li className="font-semibold rounded text-black text-xl  mb-3">
          <i>Dashboard</i>
        </li>
        <hr className="border mb-3" />

        {menuItems.map((item) => (
          <li
            key={item.value}
            className={`flex items-center pl-2  font-semibold rounded text-zinc-700 border border-transparent transition-all duration-300 delay-110 
              ${
                option === item.value
                  ? "bg-white border-sky-100"
                  : "hover:bg-sky-50 hover:border-sky-200"
              }`}
          >
            {item.icon}
            <button
              onClick={() => setOption(item.value)}
              className="py-1 px-2 w-full text-left flex items-center gap-3"
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>

      {/* Bottom Menu */}
      <ul className="p-5 flex flex-col gap-3">
        {["Settings", "Logout"].map((label) => (
          <li
            key={label}
            className="font-semibold rounded text-zinc-700 border border-transparent transition-all duration-300 delay-110 hover:bg-sky-50 hover:border-sky-100"
          >
            <button className="py-1 px-7 w-full text-left">{label}</button>
          </li>
        ))}
      </ul>
    </div>
      </div>
      <div className='flex-1'  >

        {
          option === 'user' && <User />
        }
        {
          option === 'state' && <State />
        }
        {
          option === 'result' && <Result />
        }


      </div>

    </div>
    </div>
  )
}

export default Dashboard
