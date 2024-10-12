import React from 'react'
import { useGlobalSkills } from '../../../context/skillContext'

const State = () => {

    const {isLoading,state}=useGlobalSkills()
  return (

        <>
            <h3 className='text-3xl  my-3 ml-5'>Manage Your State</h3>
        <div className=' flex flex-col gap-5 ml-5 '   >
            
            {isLoading?<><h4>Loading ... </h4></>:<>
                {state && state.map((state,index)=>{
                    return <div style={{background:state.color.backgroundColor,border:`1px solid ${state.color.borderColor}`,color:state.color.textColor}} className='py-3 px-5 w-[300px] rounded'  >
                        <h2 className='text-2xl capitalize' > {state.name}  </h2>
                            
                    </div>

                })}
            
            </>}



            

          

        </div>
        </>
      
    
  )
}

export default State
