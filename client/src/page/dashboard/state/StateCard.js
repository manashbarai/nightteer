import React from 'react'

const StateCard = ({ formData }) => {
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
            </div>
        </div>
    )
}

export default StateCard
