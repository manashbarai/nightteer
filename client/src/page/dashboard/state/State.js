import React, { useState } from 'react'
import { useGlobalSkills } from '../../../context/skillContext'
import axios from 'axios';
import CreateNewState from './CreateNewState';
import StateCard from './StateCard';

const State = () => {

    const { isLoading, state } = useGlobalSkills()

    const [openCreateState,setOpenCreateState]=useState(false)

    const toggleOpenCreateState=()=>{
        setOpenCreateState(!openCreateState)
    }



    const handleEdit = (id) => {
        // Implement logic to edit the item with the given id
        console.log(`Editing item with id: ${id}`);
        // You can redirect to an edit form or open a modal for editing
    };

    const handleDelete = async (id) => {
        try {
            const deleteState = await axios.delete(`${process.env.REACT_APP_API_URL}api/state/${id}`)
            if (deleteState.status === 2000) {
                alert("de;leted")
            }
        } catch (error) {

        }
    };

    return (

        <>
            <h3 className='text-3xl  my-3 ml-5'>Manage Your State</h3>
            <div className=' flex  gap-5 ml-5 '   >

                {isLoading ? <><h4>Loading ... </h4></> : <>
                    {state && state.map((state, index) => {
                        return <StateCard formData={state} key={index} />


                    })}

                </>}

                <button className="border border-gray-600 rounded  shadow-2xl bg-slate-600 text-white w-[300px] h-[220px] " onClick={toggleOpenCreateState}>
                    +
                </button>

                
                   {openCreateState && <CreateNewState toggleOpenCreateState={toggleOpenCreateState}/>}

               







            </div>
        </>


    )
}

export default State
