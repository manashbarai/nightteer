import React from 'react'
import { useGlobalSkills } from '../context/skillContext'
import StateCard from './dashboard/state/StateCard'

const HomePage = () => {

    const { state, result_day } = useGlobalSkills()

    return (
        <div className=' my-5  px-28 flex gap-3 flex-wrap'>
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
                    }

                }
                const resultData={
                    day:r.day,
                    result_1:r.result_1,
                    result_2:r.result_2
                }
                return <StateCard formData={data} key={resultData.day}  resultData={resultData} />
            })}

        </div>
    )
}

export default HomePage
