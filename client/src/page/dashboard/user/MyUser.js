import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const MyUser = () => {
  // Sample users data
  const [createUser, setCreateUser] = useState(false)
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', state: 'Active', vipNumber: 'VIP123', blocked: false },
    { id: 2, name: 'Jane Smith', state: 'Pending', vipNumber: 'VIP456', blocked: true },
    { id: 3, name: 'Mike Johnson', state: 'Inactive', vipNumber: 'VIP789', blocked: false },
  ]);

  // Placeholder functions for actions
  const changeStateName = (id) => {
    alert(`Change state for user with ID: ${id}`);
  };

  const updateResult = (id) => {
    alert(`Update result for user with ID: ${id}`);
  };

  const updateVipNumber = (id) => {
    alert(`Update VIP number for user with ID: ${id}`);
  };

  const deleteVipNumber = (id) => {
    alert(`Delete VIP number for user with ID: ${id}`);
  };

  const deleteState = (id) => {
    alert(`Delete state for user with ID: ${id}`);
  };

  const toggleBlocked = (id) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, blocked: !user.blocked } : user
    );
    setUsers(updatedUsers);
  };


  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      const createUser=await axios.post("http://localhost:8000/user/createuser",{
        name:formData.name,
        email:formData.email
      })
      if(createUser.status===200){
        alert("sucess")
      }
      
    } catch (error) {
      
    }
    
  };

  return (
    <>
      {createUser && <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <motion.div
          className="bg-white w-[500px] h-[400px] rounded-lg shadow-lg"
          initial={{ scale: 0 }} // Initial scale at 0
          animate={{ scale: 1 }} // Animate to scale 1
          transition={{ duration: 0.5 }} // Duration of the animation
        >
          <button className='float-end px-3 rounded-tr bg-red-500  text-white font-semibold' onClick={() => setCreateUser(false)}> X </button>


        <form onSubmit={handleSubmit} className="space-y-4 p-7 ">
          <h1 className='mt-5 text-center text-2xl'> Create New user </h1>

            <div>
              <label className="block font-medium">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border rounded-md p-2 w-full"
                required
              />
            </div>

            <div>
              <label className="block font-medium">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border rounded-md p-2 w-full"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </motion.div>
      </div>}

      <div className="p-6">
        <div className='flex gap-3'>

          <h2 className="text-xl font-bold mb-4">User List</h2>
          <button className="text-xl  border-l pl-3 font-bold mb-4" onClick={() => setCreateUser(true)}  > Create User  </button>
        </div>

        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Change State Name</th>
              <th className="border px-4 py-2">Update Result</th>
              <th className="border px-4 py-2">Update VIP Number</th>
              <th className="border px-4 py-2">Delete VIP Number</th>
              <th className="border px-4 py-2">Delete State</th>
              <th className="border px-4 py-2">Blocked</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="text-center">
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => changeStateName(user.id)}
                  >
                    Change State
                  </button>
                </td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={() => updateResult(user.id)}
                  >
                    Update Result
                  </button>
                </td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                    onClick={() => updateVipNumber(user.id)}
                  >
                    Update VIP
                  </button>
                </td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => deleteVipNumber(user.id)}
                  >
                    Delete VIP
                  </button>
                </td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => deleteState(user.id)}
                  >
                    Delete State
                  </button>
                </td>
                <td className="border px-4 py-2">
                  <button
                    className={`px-2 py-1 rounded ${user.blocked ? 'bg-red-500 text-white' : 'bg-gray-500 text-white'
                      }`}
                    onClick={() => toggleBlocked(user.id)}
                  >
                    {user.blocked ? 'Unblock' : 'Block'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyUser;
