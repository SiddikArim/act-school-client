import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useSelectedClasses from "../../../Hooks/useSelectedClasses";


const EnroledClass = () => {
    const [selectedClasses, refetch] = useSelectedClasses();
    const [axiosSecure] = useAxiosSecure();
    const [paidClasses, setPaidClasses] = useState();

    useEffect(() => {
        axiosSecure.get('/payments')
        .then(res => {            
            const response = res.data?.paymentsHistory.map(item => item.className)
            // console.log(response);
            setPaidClasses(response)
        })
    }, [axiosSecure])

    // const enrolledClass = paidClasses.map(cls => cls)
    // console.log(paidClasses);
    
    return (
        <div className="h-screen w-full">            
            <h1 className="text-xl text-gray-500 py-5 bg-gray-100 text-center ">Enrolled Class</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 p-10 gap-5">
            {/* {
                paidClasses.map(cls => <div 
                key={cls ? cls._id : ''}
                className="">
                <div className="bg-gray-300 p-5 rounded-lg">
                    <h1 className="font-bold">{cls ? cls[0] : ''}</h1>                   
                    <button className="bg-gray-700 px-5 py-1 mt-3 text-white rounded-lg">Lessons</button>
                </div>
            </div>)
            } */}
            
            <div className="bg-gray-300 p-5 rounded-lg">
            <h1 className="font-bold">{paidClasses?.length === 0 ? 'No Classes Purchased' : paidClasses}</h1>
            <button className="bg-gray-700 px-5 py-1 mt-3 text-white rounded-lg">Lessons</button>
            </div>
            </div>

            
        </div>
    );
};

export default EnroledClass;