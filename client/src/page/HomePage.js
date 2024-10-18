import React from 'react'
import { useGlobalSkills } from '../context/skillContext'
import StateCard from './dashboard/state/StateCard'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const HomePage = () => {

    const { state, result_day } = useGlobalSkills()

    return (
        <>
        <Navbar/>
        <div className=' px-28 grid grid-cols-1 gap-20 my-10 '>
            {result_day && state && result_day.map((r, i) => {
                const singleState=state.find(s=>s.id===r.id)
                const data = {
                    name: singleState.name,
                    id: singleState.id,
                    color: {
                        rotate: singleState.color.rotate,
                        backgroundColor1: singleState.color.backgroundColor1,
                        backgroundColor2: singleState.color.backgroundColor2,
                        textColor: singleState.color.textColor,
                        borderColor: singleState.color.borderColor,
                    },
                    time: {
                        firstResult: singleState.time.firstResult,
                        secondResult: singleState.time.secondResult,
                    },
                    description:singleState.description

                }
                const resultData={
                    day:r.day,
                    result_1:r.result_1,
                    result_2:r.result_2,
                    
                    month:r.month,
                    year:r.year
                }
                return <div className='w-3/4 mx-auto'>
                    <StateCard formData={data} key={resultData.day}  resultData={resultData} />
                </div>
            })}

        </div>
<Footer/>
        </>
    )
}

export default HomePage
