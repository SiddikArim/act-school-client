import { useState } from "react"
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "react-query";

const useInstructor = () => {
    // TODO: Get real instructor data
    const {user, loading} = useAuth()
    const [axiosSecure] = useAxiosSecure();

    const {data: isInstructor, isLoading: isInstructorLoading} = useQuery({
        queryKey: ['isInstructor', user?.email],
        enabled: !loading,

        queryFn: async () => {
            const res = await axiosSecure.get(`/users/instructor/${user?.email}`);
            return res.data.instructor;
        }
    })

    return [isInstructor, isInstructorLoading]
}

export default useInstructor;