
import { useQuery } from "react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useState } from "react";
import Swal from "sweetalert2";
import useChangeRole from "../../../Hooks/useChangeRole";

const ManageUsers = () => {
    const [logUsers, setUsers] = useState([]);    
    const [axiosSecure] = useAxiosSecure();
    const {data: users = [], refetch} = useQuery(['users'], 
    async () => {
        const res = await axiosSecure.get('/users')
        // console.log(res.data);
        setUsers(res.data);
        return res.data;
    })

    const handleMakeAdmin = async user => {
        const serverResponse = await axiosSecure.put(`/users/${user._id}`, {
            role: 'admin',            
        })

        if(serverResponse.status === 200){
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `${user.name} is now Admin`,
                showConfirmButton: false,
                timer: 1500
              })
        }        
    }

    const handleMakeInstructor = async user => {
        const serverResponse = await axiosSecure.put(`/users/instructor/${user._id}`, {
            role: 'instructor',
        })

        if(serverResponse.status === 200){
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `${user.name} is now Instructor`,
                showConfirmButton: false,
                timer: 1500
              })
        } 
    }

    const handleDeleteUser = async user => {
        const serverResponse = await axiosSecure.delete(`/users/${user._id}`, )

        if(serverResponse.status === 200){
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
                }
              })
        } 
    }

    refetch()

    return (
        <div className="h-full w-full">
            <h1 className="text-xl text-gray-500 py-5 bg-gray-100 text-center ">Manage Users </h1>
            <div className="flex justify-between">
                <p><small>Total Users: {logUsers?.length}</small></p>
                <p><small>Total Admin: 0</small></p>
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                    <tr>
                        <th>
                        <label>
                            #
                        </label>
                        </th>
                        <th>Name</th>
                        <th>Email</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    
                    {
                        logUsers.map((user, index) => <tr
                            key={user._id}
                            >
                            <th>
                            <label>
                                {index + 1}
                            </label>
                            </th>
                            <td>
                            <div className="flex items-center space-x-3">
                                <div className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                    <img src={user ? user.image : null} />
                                </div>
                                </div>
                                <div>
                                <div className="font-bold">{user.name}</div>
                                <div><p className="text-gray-500">Power: <span className="border px-2 text-gray font-semibold rounded-lg">{user.role}</span></p></div>
                                </div>
                            </div>
                            </td>
                            <td>
                            {user.email}
                            </td>
                            <td><button onClick={() => handleMakeAdmin(user)} className="btn btn-ghost btn-xs">Make Admin</button>
                            
                            </td>
                            <td>
                            <button onClick={() => handleMakeInstructor(user)}  className="btn btn-ghost btn-xs">Make Instructor</button>
                            </td>
                            <td>
                            <button onClick={() => handleDeleteUser(user)} className="btn btn-ghost btn-xs bg-red-500 text-white">Delete</button>
                            </td>
                        </tr>)
                    }


                    </tbody>                    
                </table>
                </div>
        </div>
    );
};

export default ManageUsers;