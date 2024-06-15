import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const imgHostToken = import.meta.env.VITE_image_host_token;

const AddClass = () => {
    const {user} = useAuth();
    const [axiosSecure] = useAxiosSecure();

    const imgHostURL = `https://api.imgbb.com/1/upload?key=${imgHostToken}`
    const {register, handleSubmit, reset, formState: {errors}} = useForm();
    const onSubmit = data => {
    
        const formData = new FormData()
        formData.append('image', data.image[0])

        fetch(imgHostURL, {
            method: 'POST', 
            body: formData
        })
        .then (res => res.json())
        .then(imgRes => {
            if(imgRes.success){
                const imgURL = imgRes.data.display_url;
                const newClass = {course: data.className, instructorName: user?.displayName, instructorEmail: user?.email, seats: data.availableSeat, price: data.price, image: imgURL, status: 'Pending'}
                
                axiosSecure.post('/classes', newClass)
                .then(data => {
                    
                    if(data.data.insertedId){
                        reset();
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Class added successfully',
                            showConfirmButton: false,
                            timer: 1500
                          })                          
                    }
                    
                })

            }
        })

    }

    return (
        <div className='h-screen w-full'>
            <h1 className="text-xl text-gray-500 py-5 bg-gray-100 text-center ">Add a Class </h1>

            <form className='md:w-2/3 mx-auto md:pt-10 px-10' onSubmit={handleSubmit(onSubmit)}>
                
                <input className="bg-slate-200 py-2 w-full px-5 rounded-md my-2" {...register("className", { required: true })} placeholder="Class Name" />
                {errors.name && <span className="text-sm text-red-500">Name is required</span>}

                <div className='md:flex'>
                <input className="bg-slate-200 py-2 w-full px-5 rounded-md my-2 md:mr-2" {...register("availableSeat", { required: true })} placeholder="Total Available Seats" type="text" />
                {errors.password && <span className="text-sm text-red-500">Available Seat is required</span>}

                <input className="bg-slate-200 py-2 w-full px-5 rounded-md my-2 md:ml-2" {...register("price", { required: true })} placeholder="$ Price" type="number" />
                {errors.password && <span className="text-sm text-red-500">Price is required</span>}
                </div>

                <input className="file-input file-input-bordered file-input-sm w-full max-w-xs" {...register("image", {required: true})}type="file"/>
                {errors.image && <span className="text-sm text-red-500">Image is required</span>}

                <div className="text-center">
                <input className="bg-gray-600 text-white px-8 py-2 rounded-sm my-5 cursor-pointer" type="submit" value="Add Course" />
                </div>
            </form>

        </div>
    );
};

export default AddClass;