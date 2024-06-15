import useAdmin from '../Hooks/useAdmin';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';

const AdminRoute = ({children}) => {
    const [isAdmin, isAdminLoading] = useAdmin()
    const {user, loading} = useAuth()
    const location = useLocation();
    
    if(loading || isAdminLoading){
        return <div className='h-screen flex justify-center items-center'>
        <TailSpin
        height="80"
        width="80"
        color="gray"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        />

    </div>
    }

    if(isAdmin && user){
        return children;
    }

    return 
};

export default AdminRoute;