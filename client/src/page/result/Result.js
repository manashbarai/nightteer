import axios from "axios";
import React, { useState, useEffect } from "react";
import * as XLSX from 'xlsx';
import { useGlobalSkills } from "../../context/skillContext";

const Result = () => {
    const { state } = useGlobalSkills(); // Assuming state provides input fields for 'resultList'

    const initialState = {
        year: "",
        month: "",
        day:"",
    };

    const createInitialStateDirectUpload = (dataArray) => {
        return dataArray.map(item => ({
            
            id: item.id,
            result_1: "",
            result_2: ""
        }));
    };

    const [post, setPost] = useState("");
    const [formData, setFormData] = useState(initialState);
    const [directUploadData, setDirectUploadData] = useState(createInitialStateDirectUpload(state));
    const [excelData, setExcelData] = useState(null);
    const [excelFileName, setExcelFileName] = useState("");
  
    
   
    const handleDirectUploadChange = (index, field, value) => {
        setDirectUploadData(prevData =>
            prevData.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        );
    };

    const handleFile = (e) => {
        const file = e.target.files[0];
        setExcelFileName(file.name);

        const fileTypes = [
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'text/csv'
        ];

        if (file && fileTypes.includes(file.type)) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const data = new Uint8Array(event.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const worksheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[worksheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);
                setExcelData(jsonData);
            };
            reader.readAsArrayBuffer(file);
        } else {
            alert('Please select only Excel file types');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const resultList = directUploadData.map((item) => ({
            result: {
                id: item.id,
                result_1: item.result_1,
                result_2: item.result_2,
            },
        }));
        
        // Use map instead of forEach to add the year, month, and day
        const finalData = directUploadData.map((item) => ({
            id: item.id,
            year: formData.year,
            month: Number(formData.month), // Ensure month is a Number
            resultList: {
                day: Number(formData.day),  // Ensure day is a Number
                result_1: item.result_1,
                result_2: item.result_2,
            },
        }));
        
        console.log('data', finalData);
        
        
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}api/result/single`,
                finalData
            );
            if (res.status === 200) {
                alert("Record updated successfully");
                setFormData(initialState); // Reset form data
                setDirectUploadData(createInitialStateDirectUpload(state)); // Reset direct input data
                setPost("");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        }
    };

    return (
        <>
            {post === "excelUpload" && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
                    <form onSubmit={handleSubmit} className="p-5 rounded-lg shadow-md w-1/2 bg-black">
                        <button
                            className="absolute top-2 right-2 text-red-500"
                            onClick={() => setPost("")}
                        >
                            X
                        </button>
                        <div className="mb-4">
                            <label htmlFor="year" className="block text-gray-700">Year</label>
                            <input
                                type="text"
                                id="year"
                                name="year"
                                value={formData.year}
                                // onChange={handleChange}
                                className="border rounded w-full py-2 px-3"
                                
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="month" className="block text-gray-700">Month</label>
                            <select
                                id="month"
                                name="month"
                                value={formData.month}
                                // onChange={handleChange}
                                className="border rounded w-full py-2 px-3"
                                
                            >
                                <option value="">Select Month</option>
                                {Array.from({ length: 12 }, (_, i) => (
                                    <option key={i} value={i + 1}>
                                        {new Date(0, i).toLocaleString('default', { month: 'long' })}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="file" className="block text-gray-700">Upload File</label>
                            <input
                                type="file"
                                id="file"
                                name="file"
                                onChange={handleFile}
                                className="border rounded w-full py-2 px-3"
                                
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            )}

            {post === "directUpload" && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
                    <form onSubmit={handleSubmit} className="bg-white p-5 rounded-lg shadow-md w-1/2 relative">
                        <button
                            className="absolute top-0 right-0 text-white bg-black rounded-tr px-3"
                            onClick={() => setPost("")}
                        >
                            X
                        </button>
                        <div className="flex gap-4 ">
                            <label htmlFor="date " >Select Date : </label>

                            <input id="date" type="date" className="border px-5 mb-2" onChange={(e)=>{
                               setFormData((prev) => ({
                                ...prev,
                                year: e.target.value.split("-")[0],
                                month: e.target.value.split("-")[1],
                                day: e.target.value.split("-")[2],
                            }));
                               
                                
                            }} />
                            </div>
                        <div className="flex flex-wrap gap-2">


                            {directUploadData.map((item, index) => (
                                <div key={index} className="flex flex-col border rounded p-4 w-56" >
                                    <label className="block text-gray-700">{state.find(s=>s.id===item.id) && state.find(s=>s.id===item.id).name }</label>
                                   <div className="flex gap-3 ">

                                   
                                    <input
                                        type="number"
                                        value={item.result_1}
                                        onChange={(e) =>
                                            handleDirectUploadChange(index, "result_1", e.target.value)
                                        }
                                        className="border flex-1 rounded w-full py-1 px-2 "
                                        placeholder="Result 1"
                                        
                                    />
                                    <input
                                        type="number"
                                        value={item.result_2}
                                        onChange={(e) =>
                                            handleDirectUploadChange(index, "result_2", e.target.value)
                                        }
                                        className="border flex-1 rounded w-full py-1 px-2"
                                        placeholder="Result 2"
                                        
                                    />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600 mt-4"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            )}

            <div className="flex gap-4">
                <button
                    className="border rounded px-4 py-2 text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
                    onClick={() => setPost("excelUpload")}
                >
                    Upload Excel
                </button>
                <button
                    className="border rounded px-4 py-2 text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
                    onClick={() => setPost("directUpload")}
                >
                    Direct Upload
                </button>
            </div>
        </>
    );
};

export default Result;
