import { useState } from "react";
import StateCard from "./StateCard";
import axios from "axios";

const CreateNewState = ({ toggleOpenCreateState }) => {
    const [formData, setFormData] = useState({
        name: "",
        id: "",
        color: {
            rotate: 45, // Default rotation in degrees
            backgroundColor1: "#ffffff", // default color 1
            backgroundColor2: "#000000", // default color 2
            textColor: "#000000", // default to black
            borderColor: "#000000", // default to black
        },
        time: {
            firstResult: "",
            secondResult: "",
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith("color.")) {
            const colorField = name.split(".")[1]; // Get the specific color field
            setFormData((prevData) => ({
                ...prevData,
                color: {
                    ...prevData.color,
                    [colorField]: value, // Update the color field
                },
            }));
        } else if (name.startsWith("time.")) {
            const timeField = name.split(".")[1]; // Get the specific time field
            setFormData((prevData) => ({
                ...prevData,
                time: {
                    ...prevData.time,
                    [timeField]: value, // Update the time field
                },
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const submitForm = async () => {
        const { name, id, time, color } = formData;
    
        // Convert id and rotate to numbers
        const numericId = Number(id);
        const numericRotate = Number(color.rotate);
    
        // Check if the required fields are filled
        if (!name || !numericId || !time.firstResult || !time.secondResult) {
            alert("Please fill in all fields (Name, ID, First Result, and Second Result) before submitting.");
            return;
        }
    
        // Prepare the formData with the updated numeric values
        const formDataToSubmit = {
            ...formData,
            id: numericId, // Ensure id is a number
            color: {
                ...color,
                rotate: numericRotate, // Ensure rotate is a number
            },
        };
    
       
    
        try {
            // Submit the form data to your backend using Axios
            const response = await axios.post(`${process.env.REACT_APP_API_URL}api/state`, formDataToSubmit);
    
            // Check if the response status is within the 2xx range
            if (response.status===201) {
                alert("Form submitted successfully!");
                toggleOpenCreateState();
            } else {
                alert("Failed to submit the form.");
            }
        } catch (error) {
            console.error("Error submitting the form:", error);
            alert("An error occurred during form submission.");
        }
    };
    

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-7 rounded-lg shadow-lg w-[800px] flex gap-10 relative items-center">
                <button
                    className="absolute top-0 end-0 w-[27px] h-[27px] bg-black rounded-tr-md text-white"
                    onClick={toggleOpenCreateState}
                >
                    x
                </button>

                {/* Left Side Form */}
                <div className="w-1/2 mr-4">
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        <div className="mb-4 flex gap-2">
                            <div>
                                <label className="block text-gray-700 mb-2">ID</label>
                                <input
                                    type="number"
                                    name="id"
                                    value={formData.id}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">First Result</label>
                                <input
                                    type="text"
                                    name="time.firstResult"
                                    placeholder="Enter Time"
                                    value={formData.time.firstResult}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Second Result</label>
                                <input
                                    type="text"
                                    name="time.secondResult"
                                    placeholder="Enter Time"
                                    value={formData.time.secondResult}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                        </div>

                        {/* Gradient Background Color Inputs */}
                        <div className="flex gap-5">
                            <div className="mb-4 w-[100px]">
                                <label className="block text-gray-700 mb-2">BG 1</label>
                                <input
                                    type="color"
                                    name="color.backgroundColor1"
                                    value={formData.color.backgroundColor1}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                />
                                <input
                                    type="text"
                                    name="color.backgroundColor1"
                                    value={formData.color.backgroundColor1}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded mt-2"
                                    placeholder="Enter Color Code"
                                />
                            </div>

                            <div className="mb-4 w-[100px]">
                                <label className="block text-gray-700 mb-2">BG 2</label>
                                <input
                                    type="color"
                                    name="color.backgroundColor2"
                                    value={formData.color.backgroundColor2}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                />
                                <input
                                    type="text"
                                    name="color.backgroundColor2"
                                    value={formData.color.backgroundColor2}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded mt-2"
                                    placeholder="Enter Color Code"
                                />
                            </div>
                            <div className="mb-4 w-[200px]">
                                <label className="block text-gray-700 mb-2">Rotate (Degrees)</label>
                                <input
                                    type="range"
                                    name="color.rotate"
                                    min="0"
                                    max="360"
                                    value={formData.color.rotate}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                />
                                <input
                                    type="text"
                                    name="color.rotate"
                                    value={formData.color.rotate}
                                    onChange={handleChange}
                                    className="p-2 w-[50px] border-0 rounded mt-2 outline-none"
                                    placeholder="Enter Degrees"
                                />
                                deg
                            </div>
                        </div>

                        <div className="flex gap-5">
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Text Color</label>
                                <input
                                    type="color"
                                    name="color.textColor"
                                    value={formData.color.textColor}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                />
                                <input
                                    type="text"
                                    name="color.textColor"
                                    value={formData.color.textColor}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded mt-2"
                                    placeholder="Enter Color Code"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Border Color</label>
                                <input
                                    type="color"
                                    name="color.borderColor"
                                    value={formData.color.borderColor}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                />
                                <input
                                    type="text"
                                    name="color.borderColor"
                                    value={formData.color.borderColor}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded mt-2"
                                    placeholder="Enter Color Code"
                                />
                            </div>
                        </div>
                    </form>
                </div>

                {/* Right Side Output */}
                <div className="flex flex-col gap-4">
                   <StateCard formData={formData} />
                    <button
                        onClick={submitForm}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateNewState;
