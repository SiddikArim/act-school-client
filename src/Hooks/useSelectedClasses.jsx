import React from 'react';
import { useQuery } from 'react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useSelectedClasses = () => {
    const {user, loading} = useAuth();
    const [axiosSecure] = useAxiosSecure();

    const {refetch, data: selectedClasses = [], loading: isSelectedClassLoading} = useQuery({
        queryKey: ['selectedClass', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/selectedClass`)
            // console.log('res Selected Class - ', res.data);
            return res.data;
        }
    })
    return [selectedClasses, refetch, isSelectedClassLoading]
};

export default useSelectedClasses;