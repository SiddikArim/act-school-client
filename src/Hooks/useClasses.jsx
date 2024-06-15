import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from 'react-query';

const useClasses = () => {
    const {user, loading} = useAuth();
    const [axiosSecure] = useAxiosSecure();

    const {refetch, data: classes = []} = useQuery({
        queryKey: ['classes', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/myClass`)
            return res.data;
        }
    })
    return [classes, refetch]
};

export default useClasses;