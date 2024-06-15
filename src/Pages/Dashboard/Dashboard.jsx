import { Link, Outlet } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin";
import useInstructor from "../../Hooks/useInstructor";
import useSelectedClasses from "../../Hooks/useSelectedClasses";


const Dashboard = () => {
    const [isAdmin] = useAdmin()
    const [isInstructor] = useInstructor()
    const [selectedClasses, refetch] = useSelectedClasses();

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

            <div className="drawer-content flex flex-col items-center justify-center">
                <Outlet></Outlet>
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Menu</label>
            </div> 

            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
                <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                {/* Sidebar content here */}
                <li> <Link to='/dashboard'>Home</Link> </li>

                {
                    isAdmin || isInstructor ||
                    <>
                    <button disabled={!selectedClasses}><li> <Link to='/dashboard/selected-classes'>Selected Classes</Link> </li></button>
                    <li> <Link to='/dashboard/enrolled-class'>Enrolled Class</Link> </li>
                    <li> <Link to='/dashboard/payment-history'>Payment History</Link> </li>
                    </>
                }

                {
                    isAdmin &&
                    <>
                    <li> <Link to='/dashboard/manage-classes'>Manage Classes</Link> </li>
                    <li> <Link to='/dashboard/manage-users'>Manage Users</Link> </li>
                    </>
                }

                {
                    isInstructor &&
                    <>
                    <li> <Link to='/dashboard/add-class'>Add Class</Link> </li>
                    <li> <Link to='/dashboard/my-classes'>My Classes</Link> </li>
                    </>
                }

                </ul>            
            </div>

        </div>
    );
};

export default Dashboard;