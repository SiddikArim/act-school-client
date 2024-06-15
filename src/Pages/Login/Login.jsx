import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";


const Login = () => {
    const {passwordLogin} = useAuth();
    const {register, handleSubmit, reset, formState: {errors}} = useForm();
    const navigate = useNavigate();

    const onSubmit = data => {
        passwordLogin(data.email, data.password)

        .then(() => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Social Login Success!',
                showConfirmButton: false,
                timer: 1500
              })
            reset()
            navigate('/')

        })
        .catch(error => {
            console.log(error.message);
        })
    };

    return (
        <div className="md:w-2/5 mx-auto px-10">
            <Helmet>
                <title>ACT SCHOOL | Login</title>
            </Helmet>

            <h1 className="font-semibold text-center text-3xl py-10">Please Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input className="bg-slate-200 py-2 w-full px-5 rounded-md my-2" {...register("email", { required: true })} placeholder="Email" />
                {errors.email && <span className="text-sm text-red-500">Email is required</span>}

                <input className="bg-slate-200 py-2 w-full px-5 rounded-md my-2" {...register("password", { required: true })} placeholder="Password" type="password" />
                {errors.password && <span className="text-sm text-red-500">Password is required</span>}

                <div className="text-center">
                <input className="bg-gray-600 text-white px-8 py-2 rounded-sm my-5 cursor-pointer" type="submit" value="Login" />
                </div>
            </form>
            <p className="text-center pb-5"><small>New to ACT SCHOOL? <Link to="/register" className="text-blue-500">Please Register</Link> </small></p>

            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Login;