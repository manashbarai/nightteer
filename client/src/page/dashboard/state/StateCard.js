import React from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import { getOrdinalSuffix, monthNames } from '../../result/MonthArray';

const StateCard = ({ formData, onEdit, onDelete, resultData }) => {
   
    return (
        <div className="">
            <h2 className="text-3xl capitalize text-center font-semibold  mb-2">{formData.name || "Name"}</h2>
            <div
                style={{
                    background: `linear-gradient(${formData.color.rotate}deg, ${formData.color.backgroundColor1}, ${formData.color.backgroundColor2})`,
                    color: formData.color.textColor,
                    border: `1px solid ${formData.color.borderColor}`,
                }}
                className="  m-0 rounded    flex flex-col"
            >
                <h2 style={{ background: `${formData.color.borderColor}` }} className='m-0 text-2xl text-center p-0 py-2'>{resultData ? `${getOrdinalSuffix(Number(resultData.day))}  ${monthNames[resultData.month]} ${resultData.year}`: "17th Octobar 2024"}</h2>
                <div className='p-5'>


                    <table
                        style={{ border: `1px solid ${formData.color.borderColor}` }}
                        className="w-full border border-gray-300 rounded-md my-2"
                    >
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 p-4 font-semibold">
                                    F/R: ({formData.time.firstResult || "Time"})
                                </td>
                                <td className="border border-gray-300 p-4 font-semibold">
                                    S/R: ({formData.time.secondResult || "Time"})
                                </td>

                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-4 font-semibold">
                                    {resultData?.result_1 ? resultData.result_1 : "Wait ..."}
                                </td>
                                <td className="border border-gray-300 p-4 font-semibold">
                                    {resultData?.result_2 ? resultData.result_2 : "Wait ..."}
                                </td>

                            </tr>
                        </tbody>
                    </table>



                    {onEdit && onDelete && <div className='flex gap-3'>

                        {onEdit && <button onClick={() => onEdit(formData)} className='active:scale-110'  >   <FaEdit color='green' size={25} />
                        </button>}
                        {onDelete && <button onClick={() => onDelete(formData._id)} className='active:scale-110' >  <MdDeleteSweep color='red' size={25} />
                        </button>}</div>}

                </div>
            </div>
                <p>
                    {formData.description}
                </p>
        </div>
    )
}

export default StateCard
