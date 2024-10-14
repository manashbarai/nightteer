import React from 'react'
import { useGlobalSkills } from '../context/skillContext'

const HomePage = () => {

    const {state,result_day}=useGlobalSkills()

  return (
    <div>
        {result_day && result_day.map((r,i)=>{
            const data={
                
            }
            return <div>

            </div>
        })}
      
    </div>
  )
}

export default HomePage
