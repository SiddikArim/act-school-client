
import { Navigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import { TailSpin } from 'react-loader-spinner';

const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth();

    if(loading) {
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
    
    if(user){
        return children;
    }

    return Navigate('/login')
};

export default PrivateRoute;