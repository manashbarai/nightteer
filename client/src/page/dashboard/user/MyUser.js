import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useGlobalSkills } from '../../../context/skillContext';

const MyUser = () => {
  const { isLoading, createdUser, updatedArray } = useGlobalSkills()
  const [createUser, setCreateUser] = useState(false)


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

  // const toggleBlocked = (id) => {
  //   const updatedUsers = users.map((user) =>
  //     user.id === id ? { ...user, blocked: !user.blocked } : user
  //   );
  //   setUsers(updatedUsers);
  // };
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn(!isOn);
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Assuming formData contains fields like { name: '...', email: '...' }
      const createUser = await axios.post(`${process.env.REACT_APP_API_URL}api/user/createuser`, formData);
      console.log(createUser);
      
      if (createUser.status === 200) {
        alert("user created success fully")
        const updatedUsersArray = [...createdUser.users, createUser.data];
        
        
        updatedArray(updatedUsersArray,'UPDATE_USER')
        setCreateUser(false)

      }
    } catch (error) {
      console.error("Error creating user:", error);
    }

  };
  const handlePermission = async (id, useCase, value) => {

    try {
      const data = {
        useCase: value,

      }
      const updateUser = await axios.put(`${process.env.REACT_APP_API_URL}api/user/update/${id}`, { data })

    } catch (error) {

    }

  }

  return (
    <>
      {createUser && <div className="fixed z-20 inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <motion.div
          className="bg-white w-[500px] h-[400px] rounded-lg shadow-lg"
          initial={{ scale: 0 }} // Initial scale at 0
          animate={{ scale: 1 }} // Animate to scale 1
          transition={{ duration: 0.5 }} // Duration of the animation
        >
          <button className='float-end px-3 rounded-tr bg-slate-700  text-white font-semibold' onClick={() => setCreateUser(false)}> X </button>


          <form onSubmit={handleSubmit} className="space-y-4 p-7  ">
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
              <th className="border px-4 py-2">Change State <br /> Permission</th>
              <th className="border px-4 py-2"> Result Update <br /> Permission </th>
              <th className="border px-4 py-2">VIP Number Update <br /> Permission</th>
              <th className="border px-4 py-2">VIP Number Delete <br /> Permission</th>
              <th className="border px-4 py-2"> State Delete <br /> Permission</th>
              <th className="border px-4 py-2">Blocked</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? <>Loading...</> : createdUser && createdUser.users.map((user, index) => (
              <tr key={user.id} className="text-center">
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={async () => {
                      try {
                       
                        const updateUser = await axios.put(
                          `http://localhost:8000/api/user/update/${user._id}`,
                          { changeStateName: user.changeStateName ? false : true }
                        );

                        if (updateUser.status === 200) {
                          const userIndex = createdUser.users.findIndex((person) => person._id === user._id);

                          // If the user is found, update the value in the array
                          if (userIndex !== -1) {
                            createdUser.users[userIndex] = updateUser.data; 
                            updatedArray(createdUser.users,"UPDATE_USER");
                          }
                        }

                      } catch (error) {
                        console.error(error); // Handle error
                      }
                    }}
                  >

                    <button

                      className={`relative inline-flex items-center h-8 w-16 rounded-full transition-colors duration-300 focus:outline-none ${user.changeStateName ? 'bg-green-500' : 'bg-gray-400'
                        }`}
                    >
                      <span
                        className={`absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${user.changeStateName ? 'translate-x-8' : ''
                          }`}
                      />

                    </button>

                  </button>
                </td>
                <td className="border px-4 py-2">
                <button
                    onClick={async () => {
                      try {
                       
                        const updateUser = await axios.put(
                          `http://localhost:8000/api/user/update/${user._id}`,
                          { updateResult: user.updateResult ? false : true }
                        );

                        if (updateUser.status === 200) {
                          const userIndex = createdUser.users.findIndex((person) => person._id === user._id);

                          // If the user is found, update the value in the array
                          if (userIndex !== -1) {
                            createdUser.users[userIndex] = updateUser.data; 
                            updatedArray(createdUser.users,"UPDATE_USER");
                          }
                        }

                      } catch (error) {
                        console.error(error); // Handle error
                      }
                    }}
                  >

                    <button

                      className={`relative inline-flex items-center h-8 w-16 rounded-full transition-colors duration-300 focus:outline-none ${user.updateResult ? 'bg-purple-500' : 'bg-gray-400'
                        }`}
                    >
                      <span
                        className={`absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${user.updateResult ? 'translate-x-8' : ''
                          }`}
                      />

                    </button>

                  </button>
                </td>
                <td className="border px-4 py-2">
                <button
                    onClick={async () => {
                      try {
                       
                        const updateUser = await axios.put(
                          `http://localhost:8000/api/user/update/${user._id}`,
                          { updateVipNumber: user.updateVipNumber ? false : true }
                        );

                        if (updateUser.status === 200) {
                          const userIndex = createdUser.users.findIndex((person) => person._id === user._id);

                          // If the user is found, update the value in the array
                          if (userIndex !== -1) {
                            createdUser.users[userIndex] = updateUser.data; 
                            updatedArray(createdUser.users,"UPDATE_USER");
                          }
                        }

                      } catch (error) {
                        console.error(error); // Handle error
                      }
                    }}
                  >

                    <button

                      className={`relative inline-flex items-center h-8 w-16 rounded-full transition-colors duration-300 focus:outline-none ${user.updateVipNumber ? 'bg-orange-500' : 'bg-gray-400'
                        }`}
                    >
                      <span
                        className={`absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${user.updateVipNumber ? 'translate-x-8' : ''
                          }`}
                      />

                    </button>

                  </button>
                </td>
                <td className="border px-4 py-2">
                <button
                    onClick={async () => {
                      try {
                       
                        const updateUser = await axios.put(
                          `http://localhost:8000/api/user/update/${user._id}`,
                          { deleteVipNumber: user.deleteVipNumber ? false : true }
                        );

                        if (updateUser.status === 200) {
                          const userIndex = createdUser.users.findIndex((person) => person._id === user._id);

                          // If the user is found, update the value in the array
                          if (userIndex !== -1) {
                            createdUser.users[userIndex] = updateUser.data; 
                            updatedArray(createdUser.users,"UPDATE_USER");
                          }
                        }

                      } catch (error) {
                        console.error(error); // Handle error
                      }
                    }}
                  >

                    <button

                      className={`relative inline-flex items-center h-8 w-16 rounded-full transition-colors duration-300 focus:outline-none ${user.deleteVipNumber ? 'bg-red-500' : 'bg-gray-400'
                        }`}
                    >
                      <span
                        className={`absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${user.deleteVipNumber ? 'translate-x-8' : ''
                          }`}
                      />

                    </button>

                  </button>
                </td>
                <td className="border px-4 py-2">
                <button
                    onClick={async () => {
                      try {
                       
                        const updateUser = await axios.put(
                          `http://localhost:8000/api/user/update/${user._id}`,
                          { deleteState: user.deleteState ? false : true }
                        );

                        if (updateUser.status === 200) {
                          const userIndex = createdUser.users.findIndex((person) => person._id === user._id);

                          // If the user is found, update the value in the array
                          if (userIndex !== -1) {
                            createdUser.users[userIndex] = updateUser.data; 
                            updatedArray(createdUser.users,"UPDATE_USER");
                          }
                        }

                      } catch (error) {
                        console.error(error); // Handle error
                      }
                    }}
                  >

                    <button

                      className={`relative inline-flex items-center h-8 w-16 rounded-full transition-colors duration-300 focus:outline-none ${user.deleteState ? 'bg-red-800' : 'bg-gray-400'
                        }`}
                    >
                      <span
                        className={`absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${user.deleteState ? 'translate-x-8' : ''
                          }`}
                      />

                    </button>

                  </button>
                </td>
                <td className="border px-4 py-2">
                <button
                    onClick={async () => {
                      try {
                       
                        const updateUser = await axios.put(
                          `http://localhost:8000/api/user/update/${user._id}`,
                          { blocked: user.blocked ? false : true }
                        );

                        if (updateUser.status === 200) {
                          const userIndex = createdUser.users.findIndex((person) => person._id === user._id);

                          // If the user is found, update the value in the array
                          if (userIndex !== -1) {
                            createdUser.users[userIndex] = updateUser.data; 
                            updatedArray(createdUser.users,"UPDATE_USER");
                          }
                        }

                      } catch (error) {
                        console.error(error); // Handle error
                      }
                    }}
                  >

                    <button

                      className={`relative inline-flex items-center h-8 w-16 rounded-full transition-colors duration-300 focus:outline-none ${user.blocked ? 'bg-red-300' : 'bg-gray-400'
                        }`}
                    >
                      <span
                        className={`absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${user.blocked ? 'translate-x-8' : ''
                          }`}
                      />

                    </button>

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
