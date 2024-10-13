import React from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";

const StateCard = ({ formData,onEdit,onDelete }) => {
    console.log(formData);
    
    return (
        <div>
            <div
                style={{
                    background: `linear-gradient(${formData.color.rotate}deg, ${formData.color.backgroundColor1}, ${formData.color.backgroundColor2})`,
                    color: formData.color.textColor,
                    border: `1px solid ${formData.color.borderColor}`,
                }}
                className="p-4 rounded w-[300px] h-[220px] flex flex-col"
            >
                <h2 className="text-2xl capitalize">{formData.name || "Name"}</h2>
                <div
                    style={{ border: `1px solid ${formData.color.borderColor}` }}
                    className="p-2 my-2 rounded"
                >
                    <p>
                        First Result Time:{" "}
                        <span className="font-bold">{formData.time.firstResult || "Time"}</span>
                    </p>
                    <p>
                        Second Result Time:{" "}
                        <span className="font-bold">{formData.time.secondResult || "Time"}</span>
                    </p>
                </div>

                {onEdit && onDelete && <div className='flex gap-3'>

                {onEdit && <button onClick={()=>onEdit(formData)} className='active:scale-110'  >   <FaEdit color='green' size={25} />
                </button>}
                {onDelete && <button onClick={()=>onDelete(formData._id)} className='active:scale-110' >  <MdDeleteSweep color='red' size={25}/>
                </button>}</div>}
            </div>
        </div>
    )
}

export default StateCard
