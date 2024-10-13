import axios from "axios";
import React, { useState, useEffect } from "react";
import * as XLSX from 'xlsx';
import { useGlobalSkills } from "../../context/skillContext";

const Result = () => {
    const { state } = useGlobalSkills();
    const initialState = {
        year: "",
        month: "",
        file: null
    };

    // Dynamically create the initial state for direct upload based on the provided state array
    const createInitialStateDirectUpload = (dataArray) => {
        const directUploadState = { date: "" };
        dataArray.forEach(item => {
            // Use 'name' as the key for the state object
            directUploadState[item.name] = { result_1: "", result_2: "" };
        });
        return directUploadState;
    };

    const [post, setPost] = useState("");
    const [formData, setFormData] = useState(initialState);
    const [formDataDirect, setFormDataDirect] = useState(createInitialStateDirectUpload(state));
    const [excelData, setExcelData] = useState(null);
    const [excelFileName, setExcelFileName] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleChangeDirectUpload = (e) => {
        const { name, value } = e.target;
        const [stateKey, result] = name.split("_");
        setFormDataDirect((prev) => ({
            ...prev,
            [stateKey]: {
                ...prev[stateKey],
                [result]: value,
            },
        }));
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
            setFormData({ ...formData, file: file });
        } else {
            alert('Please select only Excel file types');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            year: formData.year,
            month: formData.month,
            resultList: excelData
        };

        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API}result`,
                data
            );
            if (res.status === 200) {
                alert("Record updated successfully");
                setFormData(initialState); // Reset form data to initial state
                setPost("");
            }
        } catch (error) {
            alert("Something went wrong");
        }
    };

    return (
        <>
            {post === "excelUpload" && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
                    <form onSubmit={handleSubmit} className=" p-5 rounded-lg shadow-md w-1/2 bg-black">
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
                                className="border rounded w-full py-2 px-3"
                                id="year"
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="month" className="block text-gray-700">Month</label>
                            <select
                                className="border rounded w-full py-2 px-3"
                                id="month"
                                name="month"
                                value={formData.month}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Month</option>
                                {Array.from({ length: 12 }, (_, i) => (
                                    <option key={i} value={i + 1}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="file" className="block text-gray-700">Upload File</label>
                            <input
                                type="file"
                                className="border rounded w-full py-2 px-3"
                                id="file"
                                name="file"
                                onChange={handleFile}
                                required
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
                    <form className="bg-white p-5 rounded-lg shadow-md w-1/2 relative" onSubmit={handleSubmit}>
                        <button
                            className="absolute top-0 right-0 text-white bg-black rounded-tr px-3"
                            onClick={() => setPost("")}
                        >
                            X
                        </button>
                        <div className="mb-4">
                            <label htmlFor="date" className="block text-gray-700">Select Date</label>
                            <input
                                type="date"
                                className="border rounded w-full py-2 px-3"
                                id="date"
                                name="date"
                                value={formDataDirect.date}
                                onChange={handleChangeDirectUpload}
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {Object.keys(formDataDirect).filter(key => key !== 'date').map((stateKey) => (
                                <div key={stateKey} className="flex flex-col border rounded p-4">
                                    <label className="block text-gray-700">{stateKey}</label>
                                    <div className="flex gap-4">
                                        <input
                                            type="number"
                                            name={`${stateKey}_result_1`}
                                            value={formDataDirect[stateKey].result_1}
                                            onChange={handleChangeDirectUpload}
                                            className="border rounded w-full py-1 px-2"
                                            placeholder="Result 1"
                                            required
                                        />
                                        <input
                                            type="number"
                                            name={`${stateKey}_result_2`}
                                            value={formDataDirect[stateKey].result_2}
                                            onChange={handleChangeDirectUpload}
                                            className="border rounded w-full py-1 px-2"
                                            placeholder="Result 2"
                                            required
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
                {post === "" && (
                    <button
                        className="border rounded px-4 py-2 text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
                        onClick={() => { setPost("excelUpload"); }}
                    >
                        Post
                    </button>
                )}
                <button
                    className="border rounded px-4 py-2 text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
                    onClick={() => { setPost("directUpload"); }}
                >
                    Post Single Day
                </button>
            </div>
        </>
    );
};

export default Result;
