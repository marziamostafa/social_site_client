import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import AddTask from "../pages/AddTask/AddTask";
import CompletedTask from "../pages/CompletedTask/CompletedTask";
import Home from "../pages/HomePage/Home/Home";
import MyTask from "../pages/MyTask/MyTask";
import EmailPasslogin from "../pages/shared/EmailPasslogin/EmailPasslogin";
import Login from "../pages/shared/Login/Login";
import Signup from "../pages/shared/Signup/Signup";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,

        children: [
            {
                path: '/',
                element: <Home></Home>,
                loader: async ({ params }) => {
                    return fetch(`http://localhost:5000/allmedia`)
                }
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/addtask',
                element: <AddTask></AddTask>
            },
            {
                path: '/mytask',
                element: <MyTask></MyTask>,

            },
            {
                path: '/completedtask',
                element: <CompletedTask></CompletedTask>
            },
            {
                path: '/emailpasslogin',
                element: <EmailPasslogin></EmailPasslogin>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            },

        ]
    }
])

export default router