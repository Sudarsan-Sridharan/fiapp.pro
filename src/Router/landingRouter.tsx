import {createBrowserRouter} from "react-router-dom";
import Home from "../Page/Home";
import {Login, Register} from "../Page/Auth";
import LandingLayout from "../Components/Layout/LandingLayout";
import {Error} from "@mui/icons-material";
import Log from "../Page/Log";
import Detail from "../Page/Detail";
import Chart from "../Page/Chart";

export const landingRouter = createBrowserRouter([
    {
        path: '/',
        element: <LandingLayout width={'90%'}/>,
        errorElement: <Error/>,
        children: [
            {
                path: "/",
                element: <Home/>,
            },
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/register",
                element: <Register/>
            },
            {
                path: 'sLog',
                element: <Log/>
            },
        ],
    },
    {
        path: '/',
        element: <LandingLayout toolbar={false} footer={false}/>,
        errorElement: <Error/>,
        children: [
            {
                path: "/d/:name",
                element: <Detail/>
            }
        ]
    },
    {
        path: '/chart',
        element: <Chart/>
    }
])