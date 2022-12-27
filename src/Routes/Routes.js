import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import AddTask from "../pages/AddTask/AddTask";
import CompletedTask from "../pages/CompletedTask/CompletedTask";
import Home from "../pages/HomePage/Home/Home";
import MyTask from "../pages/MyTask/MyTask";
import EmailPasslogin from "../pages/shared/EmailPasslogin/EmailPasslogin";
import Login from "../pages/shared/Login/Login";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,

        children: [
            {
                path: '/',
                element: <Home></Home>
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
                element: <MyTask></MyTask>
            },
            {
                path: '/completedtask',
                element: <CompletedTask></CompletedTask>
            },
            {
                path: '/emailpasslogin',
                element: <EmailPasslogin></EmailPasslogin>
            },

        ]
    }
])

export default router