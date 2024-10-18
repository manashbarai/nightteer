import { useState } from "react";
import StateCard from "./StateCard";
import axios from "axios";
import { useGlobalSkills } from "../../../context/skillContext";

const CreateNewState = ({ toggleOpenCreateState, data }) => {
    const { updatedArray, state } = useGlobalSkills()
    const [formData, setFormData] = useState(data);

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
        const edit = state.find(s => s._id === data._id)


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




        // Submit the form data to your backend using Axios
        if (edit !== undefined) {







            try {
                const response = await axios.put(`${process.env.REACT_APP_API_URL}api/state/${edit._id}`, formDataToSubmit);

                // Check if the response status is within the 2xx range
                if (response.status === 200) {


                    // Clone the original array to avoid direct mutation
                    const newState = [...state];

                    // Find the index and update the item using splice
                    const index = newState.findIndex((s) => s._id === edit._id);
                    newState.splice(index, 1, response.data);

                    // Update the state with the new array
                    updatedArray(newState, 'STATE');
                    toggleOpenCreateState();
                } else {
                    alert("Failed to submit the form.");
                }
            } catch (error) {
                alert("Failed to submit the form.");
            }
        } else {

            const idFind = state.find(s => s.id === parseInt(formData.id))

            const nameFind = state.find(s => s.name === formData.name)

            if (idFind) {
                alert("choose unique id")
                return;
            }
            if (nameFind) {
                alert("change unique name ")
                return;
            }

            try {
                const response = await axios.post(`${process.env.REACT_APP_API_URL}api/state`, formDataToSubmit);

                // Check if the response status is within the 2xx range
                if (response.status === 201) {
                    const insertIntoState = [...state, response.data]


                    updatedArray(insertIntoState, 'STATE')
                    toggleOpenCreateState();
                } else {
                    alert("Failed to submit the form.");
                }
            } catch (error) {
                alert("Failed to submit the form.");
            }
        }
    }



    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-7 rounded-lg shadow-lg w-3/4 flex gap-10 relative items-center">
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
                        <div>
                                <label className="block text-gray-700 mb-2">Description</label>
                                <textarea
                                    type="text"
                                    name="description"
                                    placeholder="Write About This State"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                    </form>
                </div>

                {/* Right Side Output */}
                <div className="flex w-1/2 flex-col gap-4">
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
