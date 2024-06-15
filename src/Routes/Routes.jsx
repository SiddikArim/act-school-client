import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home/Home";
import Instructors from "../Pages/Instructors/Instructors";
import Classes from "../Pages/Classes/Classes";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardHome from "../Pages/Dashboard/Home/DashboardHome";
import ManageUsers from "../Pages/Dashboard/ManageUser/ManageUsers";
import ManageClasses from "../Pages/Dashboard/ManageClasses/ManageClasses";
import AdminRoute from "./AdminRoute";
import AddClass from "../Pages/Dashboard/AddClass/AddClass";
import MyClasses from "../Pages/Dashboard/MyClasses/MyClasses";
import SelectedClass from "../Pages/Dashboard/SelectedClass/SelectedClass";
import Payment from "../Pages/Dashboard/Payment/Payment";
import EnroledClass from "../Pages/Dashboard/EnrolledClass/EnroledClass";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";

export const router = createBrowserRouter ([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/instructors',
                element: <Instructors></Instructors>
            },
            {
                path: '/classes',
                element: <Classes></Classes>
            },

            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '*',
                element: <div>Error 404</div>
            },

                {
                    path: '/dashboard',
                    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
                    children: [
                        {
                            path: '/dashboard/',
                            element: <DashboardHome></DashboardHome>
                        },
                        {
                            path: '/dashboard/manage-users',
                            element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
                        }, 
                        {
                            path: '/dashboard/manage-classes',
                            element: <AdminRoute><ManageClasses></ManageClasses></AdminRoute>
                        },
                        {
                            path: '/dashboard/add-class',
                            element: <AddClass></AddClass>
                        },
                        {
                            path: '/dashboard/my-classes', 
                            element: <MyClasses></MyClasses>
                        }, 
                        {
                            path: '/dashboard/selected-classes', 
                            element: <SelectedClass></SelectedClass>
                        },
                        {
                            path: '/dashboard/payment',
                            element: <Payment></Payment>
                        },
                        {
                            path: '/dashboard/enrolled-class',
                            element: <EnroledClass></EnroledClass>
                        },
                        {
                            path: '/dashboard/payment-history',
                            element: <PaymentHistory></PaymentHistory>
                        }
                    ]
                }
        ]
    },

    
])