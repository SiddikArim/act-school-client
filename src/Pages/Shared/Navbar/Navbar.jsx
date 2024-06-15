import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

const Navbar = () => {
    const {user, logOut} = useAuth();

    const navigate = useNavigate();

    const handleLogout = () => {
        logOut()
        .then(() => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Logout Success!',
                showConfirmButton: false,
                timer: 1500
              })
        })
        navigate('/login')


    }

    const navigationOptions =   <>
                                <li><Link to='/'>Home</Link></li>
                                <li><Link to='/instructors'>Instructors</Link></li>
                                <li><Link to='/classes'>Classes</Link></li>

                                { user ? 
                                    <>
                                    <li><Link to='/dashboard'>Dashboard</Link></li>
                                    <li><button className="text-red-500" onClick={handleLogout}>Logout</button></li>
                                    </>                                     
                                    :
                                    <li><Link to='/login'>Login</Link></li>
                                }

                                {   user &&
                                    <img className="w-10 rounded-full hidden md:block" src={user?.photoURL} alt={user?.displayName} />
                                }
                                </>
                                
    return (
        <div className="navbar bg-base-100">
        <div className="w-full">
            <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                {navigationOptions}
            </ul>
            </div>
            <a className="btn btn-ghost uppercase text-xl">Act School</a>
        </div>
        <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
            {navigationOptions}
            </ul>
        </div>
        </div>
    );
};

export default Navbar;