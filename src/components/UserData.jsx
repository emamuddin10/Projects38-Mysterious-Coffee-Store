import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const UserData = () => {
  const loadedUsers = useLoaderData();
  const [users, setUsers] = useState(loadedUsers);

  const handleDeleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // fetch and send the data to sever api
        fetch(`https://projects38-mysterious-coffee-server-h86vjspxt.vercel.app/users/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount>0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              const remainig = users.filter(user => user._id !== id)
              setUsers(remainig)
            }
          });
      }
    });
    console.log("user delete clicked", id);
  };

  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Si No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Creation Time</th>
            <th>Last Loged in At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {users.map((user) => (
            <tr>
              <th>1</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.creationTime}</td>
              <td>{user.lastSignInTime}</td>
              <td className="flex gap-5">
                <button className="btn">Update</button>
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className="btn"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserData;
