import React, { useState } from 'react';

const MyUser = () => {
  // Sample users data
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

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">User List</h2>
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
                  className={`px-2 py-1 rounded ${
                    user.blocked ? 'bg-red-500 text-white' : 'bg-gray-500 text-white'
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
  );
};

export default MyUser;
