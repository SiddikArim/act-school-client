import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { FaGoogle } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";



const SocialLogin = () => {
    const {googleLogin} = useAuth();
    const navigate = useNavigate();

    const handleGoogleLogin = () => {
        googleLogin()
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Login Success!',
                showConfirmButton: false,
                timer: 1500
              })
              navigate('/')
        })
    }

    return (
        <div className="text-center">
            <button onClick={handleGoogleLogin} className="text-3xl pb-10"> <FaGoogle /> </button>
        </div>
    );
};

export default SocialLogin;