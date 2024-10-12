import React from 'react'
import { useGlobalSkills } from '../../../context/skillContext'

const State = () => {

    const {isLoading,state}=useGlobalSkills()

    const handleEdit = (id) => {
        // Implement logic to edit the item with the given id
        console.log(`Editing item with id: ${id}`);
        // You can redirect to an edit form or open a modal for editing
      };
      
      const handleDelete = (id) => {
        // Implement logic to delete the item with the given id
        console.log(`Deleting item with id: ${id}`);
        // You can add a confirmation modal or directly remove the item
      };
      
  return (

        <>
            <h3 className='text-3xl  my-3 ml-5'>Manage Your State</h3>
        <div className=' flex flex-col gap-5 ml-5 '   >
            
            {isLoading?<><h4>Loading ... </h4></>:<>
                {state && state.map((state,index)=>{
                    return <div 
                    style={{
                      background: state.color.backgroundColor,
                      border: `1px solid ${state.color.borderColor}`,
                      color: state.color.textColor
                    }} 
                    className="py-3 px-5 w-[300px] rounded"
                  >
                    <h2 className="text-2xl capitalize">{state.name}</h2>
                  
                    <div style={{ border: `1px solid ${state.color.borderColor}` }} className="p-2 my-2">
                      <p>
                        First Result Time: 
                        <span className="text-black font-semibold">{state.time.firstResult}</span>
                      </p>
                      <p>
                        Second Result Time: 
                        <span className="text-black font-semibold">{state.time.secondResult}</span>
                      </p>
                    </div>
                  
                    <div className="flex justify-between mt-4">
                      {/* Edit Button */}
                      <button 
                        onClick={() => handleEdit(state.id)} 
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                  
                      {/* Delete Button */}
                      <button 
                        onClick={() => handleDelete(state.id)} 
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  

                })}
            
            </>}



            

          

        </div>
        </>
      
    
  )
}

export default State
