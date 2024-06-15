import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "react-query";
import useClasses from "../../../Hooks/useClasses";


const ManageClasses = () => {
    const [classes, setClasses] = useState([])
    const [axiosSecure] = useAxiosSecure()
    const [feedback, setFeedback] = useState('');
    // console.log(classes);   
    // console.log(feedback);


    useEffect(() => {
        const loadClasses = async () => {
            const serverResponse = await axiosSecure.get('/classs')
            // console.log(serverResponse);
            setClasses(serverResponse.data)
            return serverResponse.data;
        }
        loadClasses();
    }, [axiosSecure])

    
    const handleDeny = async (cls) => {
        const serverResponse = await axiosSecure.put(`/classs-d/${cls._id}`,
        {status: 'Denied', feedback: feedback}        
        )        
        if(serverResponse.status === 200){
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Denied!',
                showConfirmButton: false,
                timer: 1500
              }) 
              // TODO: have to submit feedback
              window.FeedbackModal.showModal()
        }        
    }

    const handleApprove = async (cls) => {    
        const serverResponse = await axiosSecure.put(`/classs/${cls._id}`,
        {status: 'Approved', feedback: feedback}
        )
        if(serverResponse.status === 200){
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Approved!',
                showConfirmButton: false,
                timer: 1500
              }) 
              // TODO: have to submit feedback
              window.FeedbackModal.showModal()
        }
    }    

    // TODO: have to fix the feedback section
    const handleSubmitFeedback = async (event, cls) => {
        event.preventDefault();
        console.log(event.target.feedback.value);
        
    }
    
    
    return (
        <div className='h-full w-full'>
            <h1 className="text-xl text-gray-500 py-5 bg-gray-100 text-center ">Manage Classes</h1>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>
                        <label>
                            #
                        </label>
                        </th>
                        <th>Class</th>
                        <th>Instructor</th>
                        <th>Actions</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    
                    {
                        classes.map((cls,index) => <tr
                        key={cls._id}
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
                                    <img src={cls?.image} />
                                </div>
                                </div>
                                <div>
                                <div className="font-bold">{cls?.course}</div>
                                <div className="text-sm opacity-50">Price: $ {cls?.price}</div>
                                </div>
                            </div>
                            </td>
                            <td>
                            {cls?.instructorName}
                            <br/>
                            <span className={cls.status === "Approved" ? 'badge badge-ghost badge-sm bg-blue-700 px-4 py-2 text-white' : 'badge badge-ghost badge-sm bg-red-700 px-4 py-2 text-white'}>{cls.status}</span>
                            </td>
                            <td>
                                {/* TODO: add event handler and get data to a new field of existing table */}
                            <button onClick={() => handleApprove(cls)} className="btn btn-ghost btn-xs text-green-700" disabled={cls.status === "Approved"}>Approve</button>
                            <button onClick={() => handleDeny(cls)} className="btn btn-ghost btn-xs text-red-600">Deny</button>
                            </td>
                        </tr>)
                    }

                    </tbody>                    
                </table>

                {/* Open the modal using ID.showModal() method */}
                <dialog id="FeedbackModal" className="modal">
                    <form onSubmit={handleSubmitFeedback} method="dialog" className="modal-box">
                        <p className="py-2"><small>Press ESC to close the box!</small></p>
                        <h3 className="font-bold text-lg">Send a Feedback to Instructor!</h3>

                        <textarea className="w-full bg-gray-200 p-5 rounded-lg" name="feedback"  cols="30" rows="10"></textarea>
                        <div className="modal-action">
                        {/* if there is a button in form, it will close the modal */}
                        <input type="submit" name="" id="" />
                        </div>
                    </form>
                </dialog>
                
                </div>
        </div>
    );
};

export default ManageClasses;