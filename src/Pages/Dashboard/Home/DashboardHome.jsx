import useAuth from "../../../Hooks/useAuth";


const DashboardHome = () => {
    const {user} = useAuth()
    return (
        <div className="h-screen w-full">
            <h1 className="text-xl text-gray-500 py-5 bg-gray-100 text-center ">Hello, <span className="text-gray-700">{user?.displayName}</span>, welcome to Dashboard</h1>
        </div>
    );
};

export default DashboardHome;