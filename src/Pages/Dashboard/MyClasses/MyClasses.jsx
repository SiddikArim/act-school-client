import React from 'react';
import useClasses from '../../../Hooks/useClasses';

const MyClasses = () => {
    const classes = useClasses();
    console.log(classes);
    
    return (
        <div className='h-screen w-full'>
            <h1 className="text-xl text-gray-500 py-5 bg-gray-100 text-center ">My Classes</h1>
            <div className="flex justify-between">
                <p><small>Total Class: {classes[0]?.length}</small></p>
                <p><small>Approved: 0</small></p>
            </div>

            <section className='grid grid-cols-1 md:grid-cols-3 gap-6 px-10 pt-10'>
                {
                    classes[0].map(cls => <div 
                    key={cls._id}
                    className="card w-96 glass">
                    <p className='absolute text-white bg-green-600 px-2 rounded-sm right-2 top-2'><small>{cls?.status}</small></p>
                    <figure><img className='h-[200px] w-[400px] mx-auto  rounded-t-2xl' src={cls?.image} alt="car!"/></figure>
                    <div className="card-body">
                        
                        {/* TODO: add total enrolled and feedback */}
                        <h2 className="card-title text-2xl uppercase">{cls?.course}</h2>
                        <p className='bg-gray-300 py-1 px-2 text-gray-500'>Total Enrolled: Coming</p>
                        <p className='bg-gray-300 py-1 px-2 text-gray-500'>Admin Feedback: {cls?.feedback}</p>
                    </div>
                    </div>)
                }
                
            </section>
        </div>
    );
};

export default MyClasses;