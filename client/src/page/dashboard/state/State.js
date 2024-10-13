import React, { useState } from 'react';
import { useGlobalSkills } from '../../../context/skillContext';
import axios from 'axios';
import CreateNewState from './CreateNewState';
import StateCard from './StateCard';
import { FaPlus } from "react-icons/fa6";

const State = () => {
    const { isLoading, state,updatedArray } = useGlobalSkills();

    const [openCreateState, setOpenCreateState] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        id: "",
        color: {
            rotate: 45, 
            backgroundColor1: "#ffffff", 
            backgroundColor2: "#000000", 
            textColor: "#000000", 
            borderColor: "#000000", 
        },
        time: {
            firstResult: "",
            secondResult: "",
        },
    });

    const initialFormData = {
        name: "",
        id: "",
        color: {
            rotate: 45, 
            backgroundColor1: "#ffffff", 
            backgroundColor2: "#000000", 
            textColor: "#000000", 
            borderColor: "#000000", 
        },
        time: {
            firstResult: "",
            secondResult: "",
        },
    };

    const toggleOpenCreateState = (dataType) => {
        if (dataType === 'blank') {
            
            setFormData(initialFormData);
        } 
        setOpenCreateState(!openCreateState);
    };

    const handleEdit = (data) => {
        setFormData(data)
        toggleOpenCreateState('edit');

    };

    const handleDelete = async (id) => {
        try {
            const deleteState = await axios.delete(`${process.env.REACT_APP_API_URL}api/state/${id}`);
            if (deleteState.status === 200) {
                const deleteFromState=await state.filter(s=>s._id!==id)
                
                updatedArray(deleteFromState,'STATE')
            }
        } catch (error) {
            console.error("Error deleting state:", error);
        }
    };

    return (
        <>
            <h3 className='text-3xl my-3 ml-5'>Manage Your State</h3>
            <div className='flex gap-5 ml-5 flex-wrap'>
                {isLoading ? (
                    <h4>Loading ... </h4>
                ) : (
                    state && state.map((stateItem, index) => (
                        <StateCard 
                            formData={stateItem} 
                            key={index} 
                            onEdit={() => handleEdit(stateItem)} 
                            onDelete={() => handleDelete(stateItem._id)} 
                        />
                    ))
                )}

                <button 
                    className="border flex justify-center items-center border-gray-600 rounded shadow-2xl bg-slate-600 text-white w-[300px] h-[220px]" 
                    onClick={() => toggleOpenCreateState('blank')}
                >
                    <FaPlus size={100} />
                </button>

                {openCreateState && (
                    <CreateNewState 
                        toggleOpenCreateState={toggleOpenCreateState} 
                        data={formData} 
                    />
                )}
            </div>
        </>
    );
};

export default State;
