



import React, { useState } from 'react'
import MyUser from './dashboard/user/MyUser'
import User from './dashboard/user/User'
import State from './dashboard/state/State'
import Result from './result/Result'
import ResultPage from './result/Result'

const Dashboard = () => {

  const [option, setOption] = useState("dashboard")


  return (
    <div className='flex'>
      <div className='w-[300px] h-[100vh] bg-slate-800 flex flex-col justify-between'  >

        <ul className='p-5 flex flex-col gap-3'>
          
          <li className=' bg-gray-700 border rounded text-white'>  <button onClick={() => setOption("state")} className='py-3 px-7'>Manage State</button>  </li>
          <li className=' bg-gray-700 border rounded text-white'>  <button onClick={() => setOption("result")} className='py-3 px-7'>Result</button>  </li>
          <li className=' bg-gray-700 border rounded text-white'>  <button onClick={() => setOption("user")} className='py-3 px-7'>User</button>  </li>

        </ul>

        <ul className='p-5 flex flex-col gap-3'>
          <li className=' bg-gray-700 border rounded text-white'> <button className='py-3 px-7'>Settings</button> </li>
          <li className=' bg-gray-700 border rounded text-white'> <button className='py-3 px-7'>Logout</button> </li>
        </ul>

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
  )
}

export default Dashboard
